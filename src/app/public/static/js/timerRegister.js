window.onload = function () {
    var minute = 1;
    var sec = 60;
    const timer = setInterval(function () {
        sec--;
        document.getElementById("countdown-timer").textContent = `۰${minute.toLocaleString('fa-ir')} : ${sec.toLocaleString('fa-ir')}`;
        if (sec == 0) {
            if (minute == 0 && sec == 0) {
                clearInterval(timer)
                $("#sendAgain").removeAttr("disabled");
                document.getElementById("clear-timer").textContent = ``;
            }
            minute--;
            sec = 59;
        }
    }, 1000);
}