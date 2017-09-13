/*****************************************
 *
 *  功能：主页逻辑处理
 *  开发者：杨志欣
 *  最后修改日期：2017-09-07
 *
 *****************************************/



//初始化
window.onload = function () {

    //加载地图组件API
    loadScript();
    //加载头部尾部
    loadHeaderOrFooter();
    //加载时设置默认的标记用于跳转对应页面内容使用
    sessionStorage.setItem("serviceIndex", 0);
    sessionStorage.setItem("solutionIndex", 0);
    var logo = document.getElementsByClassName("logo")[0];
    logo.src = "images/common/logo.png"
    var navItem = document.getElementsByClassName("navItem"),
        navItem_length = navItem.length,
        navAddressArr = ["index.html", "pages/service.html", "pages/solution.html", "pages/about.html"]
    for (var k = 0; k < navItem_length; k++) {
        navItem[k].href = navAddressArr[k];
    }
    //添加导航列表选中状态
    navItem[0].classList.add("selected");
    //调用轮播图动画
    bannerAnimation();
    //“更多方案”鼠标过度效果
    var moreSolution = document.getElementById("moreSolution");
    moreSolution.onmouseenter = function () {
        moreSolutionAnimation(this);

    }
    moreSolution.onmouseleave = function () {
        moreSolutionAnimation(this);
    }
    //调用“产品体系”鼠标移入事件
    productMouseEventBind();

    //调用“联系我们”鼠标和地图开关事件绑定
    contactAndMapSwitchClickEventBind();

    //调用“我们的服务”事件绑定
    myServiceEventBind();

    //调用“方案案例”事件绑定
    solutionEventBind();
    /**
     *  功能：“联系我们”鼠标和地图开关事件绑定
     *  参数：无
     **/
    function contactAndMapSwitchClickEventBind() {
        var mainAddress = document.getElementsByClassName("mainAddress"),
            mainAddress_length = mainAddress.length,
            mapSwitchTextArr = [{
                openText: "展开艾尔帕思成都公司地图",
                closeText: "收起艾尔帕思成都公司地图"
        }, {
                openText: "展开艾尔帕思重庆分公司地图",
                closeText: "收起艾尔帕思重庆分公司地图"
        }, {
                openText: "展开艾尔帕思山东分公司地图",
                closeText: "收起艾艾尔帕思山东分公司地图"
        }],
            mapSwitchText = document.getElementsByClassName("mapSwitchText")[0],
            mapBox = document.getElementsByClassName("mapBox")[0],
            //地图开关状态
            openStatus = false,
            //当前选择的地址下标
            clickAddressIndex = 0;
        //初始文字
        mapSwitchText.textContent = mapSwitchTextArr[0].openText;
        //绑定事件
        for (var i = 0; i < mainAddress_length; i++) {
            mainAddress[i].index = i;
            mainAddress[i].onclick = function () {
                var addressIndex = this.index;
                //设置选中状态
                for (var j = 0; j < mainAddress_length; j++) {
                    if (this === mainAddress[j]) {
                        this.classList.add("selected");
                    } else {
                        mainAddress[j].classList.remove("selected");
                    }
                }
                //设置开关文字
                if (openStatus) {
                    mapSwitchText.textContent = mapSwitchTextArr[addressIndex].closeText;
                } else {
                    mapSwitchText.textContent = mapSwitchTextArr[addressIndex].openText;
                }
            }
        }
        var mapMaskTop = document.getElementsByClassName("mapMaskTop")[0];
        //点击开关
        mapMaskTop.onclick = function () {
            if (openStatus) {
                mapSwitchText.nextElementSibling.style.display = "none";
                mapSwitchText.previousElementSibling.style.display = "block";
                mapSwitchText.textContent = mapSwitchTextArr[clickAddressIndex].openText;
                mapBox.style.height = "150px";
                openStatus = false;
            } else {
                mapSwitchText.previousElementSibling.style.display = "none";
                mapSwitchText.nextElementSibling.style.display = "block";
                mapSwitchText.textContent = mapSwitchTextArr[clickAddressIndex].closeText;
                mapBox.style.height = "400px";
                openStatus = true;
            }
        }

    }
}
/**
 *  功能：轮播图动画
 *  参数：无
 **/
function bannerAnimation() {


    var slider = document.getElementsByClassName("slider"),
        sliderTextBox = document.getElementsByClassName("sliderTextBox"),
        count = 0;

    //加载第一张动画
    setTimeout(function () {
        sliderTextBox[count].classList.add("move");
    }, 0);
    //切换轮播图
    setInterval(function () {
        var sliderLastIndex = slider.length - 1;
        if (count == -1) {
            slider[sliderLastIndex].style.opacity = "0";
            sliderTextBox[sliderLastIndex].classList.remove("move");
        } else {
            slider[count].style.opacity = "0";
            sliderTextBox[count].classList.remove("move");
        }
        count++;
        slider[count].style.opacity = "1";
        sliderTextBox[count].classList.add("move");
        if (count == slider.length - 1) {
            count = -1;
        }
    }, 4000);


}

/**
 *  功能：“更多方案”实现过度特效
 *  参数：(ele)实现特效的元素
 **/
function moreSolutionAnimation(ele) {
    setTimeout(function () {
        ele.style.backgroundColor = "#76b4e2"
    }, 0)
    setTimeout(function () {
        ele.style.backgroundColor = "#3c9de5"
    }, 300)
}


/**
 *  功能：“产品体系”鼠标移入事件
 *  参数：无
 **/
function productMouseEventBind() {
    var productBox = document.getElementsByClassName("productBox")[0],
        productItem = document.getElementsByClassName("productItem"),
        productItem_length = productItem.length;
    for (var i = 0; i < productItem_length; i++) {
        productItem[i].index = i;
        //鼠标移入
        productItem[i].onmouseenter = function () {
            var width = productBox.scrollWidth,
                proWidth = proWidth = this.scrollWidth + 60;
            //将移入元素扩大，其余元素剩余部分平分
            for (var j = 0; j < productItem_length; j++) {
                if (this.index == j) {
                    this.style.width = proWidth + "px"
                } else {
                    productItem[j].style.width = ((width - proWidth) / 4).toFixed(2) + "px";
                }
            }


        }
        //移出时平分所有元素
        productItem[i].onmouseleave = function () {
            for (var j = 0; j < productItem_length; j++) {

                productItem[j].style.width = "20%";
            }
        }
    }
}

/**
 *  功能：“我们的服务”事件绑定
 *  参数：无
 **/
function myServiceEventBind() {
    var serviceItem = document.getElementsByClassName("serviceItem"),
        serviceItem_length = serviceItem.length;
    for (var i = 0; i < serviceItem_length; i++) {
        serviceItem[i].index = i;
        serviceItem[i].onclick = function () {
            sessionStorage.setItem("serviceIndex", this.index);
        }
    }
}
/**
 *  功能： “方案案例”事件绑定
 *  参数：无
 **/
function solutionEventBind() {
    var solutionItem = document.getElementsByClassName("solutionItem"),
        solutionItem_length = solutionItem.length,
        //对应案例页面下标
        solutionIndex = [1, 2, 3, 8, 9, 0];
    for (var i = 0; i < solutionItem_length; i++) {
        solutionItem[i].index = i;
        solutionItem[i].onclick = function () {
            sessionStorage.setItem("solutionIndex", solutionIndex[this.index]);
        }
    }
}


/**
 *  功能：百度地图异步加载回调函数
 *  参数：无
 **/
function initialize() {
    var map = new BMap.Map('map'),
        //构造坐标
        addressObjArr = [new BMap.Point(104.07289, 30.552178), new BMap.Point(106.516608, 29.527213), new BMap.Point(117.080716, 36.678314)],
        mainAddress = document.getElementsByClassName("mainAddress"),
        mainAddress_length = mainAddress.length,
        //设置弹出框信息
        opts_title = ["艾尔帕思成都公司", "艾尔帕思重庆分公司", "艾尔帕思山东分公司"],
        infoWindow_text = ["新希望国际B座2505", "谢家湾文化7村51号8栋15-9室", "东环国际广场D座701室"];
    map.centerAndZoom(addressObjArr[0], 18);
    //创建标记点
    var markerArr = [new BMap.Marker(addressObjArr[0]), new BMap.Marker(addressObjArr[1]), new BMap.Marker(addressObjArr[2])];
    map.addOverlay(markerArr[0]);
    markerArr[0].setAnimation(BMAP_ANIMATION_BOUNCE);
    var opts = {
        width: 250, // 信息窗口宽度    
        height: 40, // 信息窗口高度    
        title: opts_title[0] // 信息窗口标题   
    }
    var infoWindow = new BMap.InfoWindow(infoWindow_text[0], opts); // 创建信息窗口对象    
    map.openInfoWindow(infoWindow, addressObjArr[0]);
    //绑定事件
    for (var i = 0; i < mainAddress_length; i++) {

        mainAddress[i].addEventListener("click", function () {
            var addressIndex = this.index;
            var opts = {
                width: 250, // 信息窗口宽度    
                height: 40, // 信息窗口高度    
                title: opts_title[addressIndex] // 信息窗口标题   
            }
            var infoWindow = new BMap.InfoWindow(infoWindow_text[addressIndex], opts); // 创建信息窗口对象    

            //设置位置和标记点
            map.centerAndZoom(addressObjArr[addressIndex], 18);
            map.addOverlay(markerArr[addressIndex]);
            //添加跳跃动画
            markerArr[addressIndex].setAnimation(BMAP_ANIMATION_BOUNCE);
            map.openInfoWindow(infoWindow, addressObjArr[addressIndex]);
        });
    }
}
/**
 *  功能：加载百度地图API
 *  参数：无
 **/
function loadScript() {
    var script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=ueCLviyqwjsZsg5Bi25itPV2I3V7dXXv&callback=initialize";
    document.body.appendChild(script);
}
