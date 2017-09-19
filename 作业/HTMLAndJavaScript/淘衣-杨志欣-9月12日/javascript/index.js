//存放数据
var data;

window.addEventListener("DOMContentLoaded", function () {


    var main = document.getElementsByTagName("main")[0],
        dot = document.getElementsByClassName("dot")
    msg = document.querySelector(".msg");

    main.onclick = function (e) {
        var target = e.target;
        if (target.className == "dot") {
            msg.style.display = "inline-block";
            setTimeout(function () {
                msg.style.opacity = "1";
            }, 400)
            if (typeof (data) == "undefined") {
                msg.innerHTML = "糟糕数据加载失败请刷新！"
            } else {
                if (target == dot[0]) {
                    msg.innerHTML = '<li>名称：' + data.goods[0].name + '</li>' +
                        '<li>简述：' + data.goods[0].des +
                        '</li>' +
                        '<li>价格：' + data.goods[0].price +
                        '</li>';
                } else {
                    msg.innerHTML = '<li>名称：' + data.goods[1].name + '</li>' +
                        '<li>简述：' + data.goods[1].des +
                        '</li>' +
                        '<li>价格：' + data.goods[1].price +
                        '</li>';
                }

            }
            var top = target.offsetTop - msg.offsetHeight - 20,
                left = target.offsetLeft + 12 - msg.offsetWidth / 2;
            msg.style.cssText = "top:" + top + "px;left:" + left + "px;opacity:1;";
        } else {
            msg.style.opacity = "0";
            setTimeout(function () {
                msg.style.display = "none";
            }, 400);
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./data/data.json", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
        }
    }

})
