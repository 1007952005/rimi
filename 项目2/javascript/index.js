/**************************************************
 *
 *  功能：今日头条逻辑功能
 *  开发者：杨志欣
 *  最后修改时间：2017-09-17
 *
 **************************************************/
//请求回来的数据
var dataObj = {};

//初始化
window.onload = function () {
    getObj("./data/data.json", function (data) {
        dataObj = data;
        //加载小视频资源
        loadMovie();
    });
    var mainNav = document.getElementsByTagName("nav")[0],
        mainNavItem = mainNav.getElementsByTagName("li"),
        mainNavItem_length = mainNavItem.length,
        mainNavIcon = mainNav.getElementsByTagName("i"),
        page = document.getElementsByTagName("page"),
        previousIndex = 0;
    //绑定导航栏事件
    for (let i = 0; i < mainNavItem_length; i++) {
        mainNavItem[i].onclick = function () {
            //把上次点击的选项还原
            mainNavItem[previousIndex].classList.remove("action");
            mainNavIcon[previousIndex].style.backgroundImage = "url('./images/" + previousIndex + ".svg')";
            page[previousIndex].style.zIndex = "1";
            //设置选中的状态
            this.classList.add("action");
            mainNavIcon[i].style.backgroundImage = "url('./images/" + i + "-active.svg')";
            page[i].style.zIndex = "10";
            previousIndex = i;
        }
    }

}
/**
 *  功能：请求数据
 *  参数1：请求的url
 *  参数2：请求成功时的回调
 **/
function getObj(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send("null");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var str = xhr.responseText;
            var data = JSON.parse(str);
            callback(data);
        }
    }
}
/**
 *  功能：请求数据
 *  参数: 无
 **/
function loadMovie() {
    var movie = document.getElementsByClassName("movie")[0];
    var movieData = dataObj.data[2].resources,
        movieData_length = movieData.length,
        movieStr = "";
    for (var i = 0; i < movieData_length; i++) {
        var playStr = "",
            ticketStr = "",
            resP = Number(movieData[i].playCount),
            resT = Number(movieData[i].ticketCount);
        //使数据格式化
        if (resP > 10000) {
            playStr = (resP / 10000).toFixed(1) + "万";
        } else {
            playStr = resP;
        }
        if (resT > 10000) {
            ticketStr = (resT / 10000).toFixed(1) + "万";
        } else {
            ticketStr = resT;
        }
        movieStr += '<div class="moveItem">' +
            '<a href="' + movieData[i].movieURL + '">' +
            '<img src="' + movieData[i].imgURL + '">' +
            '<div>' +
            '    <h3>' + movieData[i].title + '</h3><span>' + playStr + '播放量</span><span>' + ticketStr + '赞</span>' +
            '</div>' +
            '<span class="movieClose">×</span>' +
            '</a>' +
            '</div>';
    }
    movie.innerHTML = movieStr;
}
