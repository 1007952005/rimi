var setCSS = document.getElementById("setCSS");
var isMobile = /mobile/i.test(navigator.userAgent);
var currentWidth = innerWidth;
if (innerWidth >= 1366 && !isMobile) {
    setCSS.href = "./css/style-large.css";
} else if (innerWidth < 1366 && !isMobile) {
    setCSS.href = "./css/style-small.css";
} else if (isMobile) {
    setCSS.href = "./css/style-mobile.css";
}
setTimeout(function () {
    document.body.style.opacity = "1";
}, 1000);
