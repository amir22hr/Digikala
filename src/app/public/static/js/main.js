//jquery

//-show/hide dropdown by click
$('#dropdown-cart').click(function () {
  $(this).toggleClass('is-active');
});

var slideIndex = 0;
showSlides();
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

//show popup voice commend
function popup() {
  var content = document.getElementById('popup').innerHTML

  alertify.alert('راهنمای صوتی', content,
    function () {

    }).set('label', 'باشه');
}

//show cart popup box
function cartBox() {
  var content = document.getElementById('cartContent').innerHTML
  var btnOk = document.getElementById('btnOk').textContent
  var linkOk = document.getElementById('linkOk').textContent

  alertify.confirm('سبد خرید', content,
    function () {
      location.href = linkOk
    }, function () {

    }).set('labels', { ok: btnOk, cancel: 'بستن' });
}

