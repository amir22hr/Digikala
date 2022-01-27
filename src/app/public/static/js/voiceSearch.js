window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

$('#voice-search').click(function () {

    $(this).addClass("is-loading");
    const recognition = new SpeechRecognition();
    recognition.lang = "fa-IR";
    recognition.interimResults = false;
    recognition.addEventListener("end", () => {
        $(this).removeClass("is-loading");
    });

    recognition.start();

    recognition.addEventListener("result", async e => {
        let transcript = Array.from(e.results)
            .map(result => {
                return result[0];
            })
            .map(result => {
                return result.transcript;
            })
            .join(" ");

        if (transcript.includes("برو به داشبورد")) {
            transcript = "";
            return location.href = '/user/dashboard';
        }

        // else if (transcript.includes("علامت سوال")) {
        //     transcript = transcript.replace("علامت سوال", "؟");
        // }

        else if (transcript.includes("اضافه به سبد")) {
            let url = window.location.href;
            let spiltUrl = url.split('/');
            await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({product: spiltUrl[4]})
            });
            window.location.reload();
        }

        else {
            return location.href = `/search?search=${transcript}`
        }

        $(this).removeClass("is-loading");
        $('#search').val(transcript)

    });

})
