//图片资源
var carouselImg = [
"images/01.jpg",
"images/02.jpg",
"images/03.jpg",
"images/04.jpg"
]
//切换图片延时
var delayed = 3000;
//动画执行时间
var executionTime = 0.5;
//存储setInterval
var timer;

//初始化
window.onload = function () {

    //加载图片
    loadvarCarousel();
    //初始自适应设置
    //resizeCarouse();
    //自适应屏幕
//    window.onresize = function () {
        //        resizeCarouse();
        //    }
    //轮播动画
    //carouselAnimation();
}
/**
 *   功能：加载轮播图片和导航原点
 *   参数：无
 **/
function loadvarCarousel() {
    var carousel = document.getElementsByTagName("carousel")[0],
        carouselImgString = "",
        carouselIdotString = "",
        carouselImg_length = carouselImg.length;
    carousel.innerHTML = '<ul id="carousel-box" class="carousel-box"></ul>' +
        '<ul id="carousel-nav" class="carousel-nav"></ul>';
    var carousel_box = document.getElementById("carousel-box"),
        carousel_nav = document.getElementById("carousel-nav");
    for (var i = 0; i <= carouselImg_length; i++) {
        if (i === carouselImg_length) {
            carouselImgString += '<li><img src="' + carouselImg[0] + '" alt=""></li>';
            break;
        }
        carouselImgString += '<li><img src="' + carouselImg[i] + '" alt=""></li>';
        carouselIdotString += '<li></li>';
    }
    carousel_box.innerHTML = carouselImgString;
    carousel_nav.innerHTML = carouselIdotString;
}
/**
 *   功能：设置轮播图自适应
 *   参数：无
 **/
function resizeCarouse() {
    var carousel_box = document.getElementById("carousel-box"),
        carousel_item = carousel_box.getElementsByTagName("li"),
        carousel_item_length = carousel_item.length;
    carousel_box.style.width = innerWidth * (carouselImg.length + 1) + "px";
    if (innerWidth > 1280) {
        carousel_box.style.height = innerWidth / 2.5 + "px";
        for (var i = 0; i < carousel_item_length; i++) {
            carousel_item[i].style.width = innerWidth + "px";
        }
    } else {
        carousel_box.style.height = innerWidth / 2.5 + "px";
        for (var i = 0; i < carousel_item_length; i++) {
            carousel_item[i].style.width = innerWidth + "px";
        }
    }
}
/**
 *   功能：设置轮播图自适应
 *   参数：无
 **/
function carouselAnimation() {
    var carousel_box = document.getElementById("carousel-box"),
        carousel_nav = document.getElementById("carousel-nav"),
        carousel_nav_idot = carousel_nav.children,
        imgWidth = innerWidth,
        carouselImg_length = carouselImg.length,
        count = 0,
        carousel_box_cssText = carousel_box.style.cssText;
    //记录上一次点
    //初始化图片位置
    carousel_box.style.left = "0";
    timer = setInterval(function () {
        carousel_box.style.cssText += "transition: left " + executionTime + "s;";
        carousel_box.style.left = "-" + imgWidth * count + "px";
        carousel_nav_idot[count].className = "selected";
        count++;
        if (count === (carouselImg_length + 1)) {
            count = 0;
            carousel_box.style.cssText = carousel_box_cssText;
            carousel_box.style.left = "0";
        }
    }, delayed);
}
