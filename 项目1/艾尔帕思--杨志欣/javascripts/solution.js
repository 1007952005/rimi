/*****************************************
 *
 *  功能：“解决方案”逻辑处理
 *  开发者：杨志欣
 *  最后修改日期：2017-09-09
 *
 *****************************************/

//图片数据
var imgData = [{
    type: "电子政务",
    imgIndex: ["01", "02", "03", "04"]
}, {
    type: "电子商务",
    imgIndex: ["05", "08", "10", "11"]
}, {
    type: "智慧教育",
    imgIndex: ["14", "15", "16", "26"]
}, {
    type: "智慧医疗",
    imgIndex: ["23", "28", "22", "27"]
}, {
    type: "智慧农业",
    imgIndex: ["08", "29", "30", "19"]
}, {
    type: "智慧交通",
    imgIndex: ["07", "31", "32", "33"]
}, {
    type: "智慧旅游",
    imgIndex: ["06", "34", "35", "36"]
}, {
    type: "物联网",
    imgIndex: ["17", "18", "38", "37"]
}, {
    type: "企业级应用",
    imgIndex: ["20", "21", "24", "25"]
}];

//初始化
window.onload = function () {
    //设置服务页面的下标
    sessionStorage.setItem("serviceIndex", 0);
    //加载头部和尾部
    loadHeaderOrFooter();
    var navItem = document.getElementsByClassName("navItem");
    navItem[2].onclick = function () {
        //加载时设置默认的标记用于要转服务页面使用
        sessionStorage.setItem("solutionIndex", 0);
    }
    //header设置选中
    navItem[2].classList.add("selected");
    var solutionNavItem = document.getElementsByClassName("solutionNav")[0].children,
        solutionNavItem_length = solutionNavItem.length,
        solutionImgBox = document.getElementsByClassName("solutionImgBox")[0],
        imgData_length = imgData.length,
        oldIndex = Number(sessionStorage.getItem("solutionIndex")),
        oldType = solutionNavItem[oldIndex].textContent;

    //图片加载
    var str = "";
    for (var j = 0; j < imgData_length; j++) {
        var imgIndex_length = imgData[j].imgIndex.length;
        for (var k = 0; k < imgIndex_length; k++) {
            str += '<div name="' + imgData[j].type + '"><img src="../images/solution/case-page-' + imgData[j].imgIndex[k] + '.png"></div>'
        }
        solutionImgBox.innerHTML = str;
    }
    //全部全部显示的事件
    solutionNavItem[0].index = 0;
    solutionNavItem[0].onclick = function () {
        solutionNavItem[oldIndex].classList.remove("selected");
        var allEle = solutionImgBox.children,
            allEle_length = allEle.length;
        this.classList.add("selected");
        oldIndex = this.index;
        for (var j = 0; j < allEle_length; j++) {
            allEle[j].style.display = "inline-block";
        }
        oldType = "全部";
        sessionStorage.setItem("solutionIndex", oldIndex);
    }
    //案例分类显示的事件
    for (var i = 1; i < solutionNavItem_length; i++) {
        solutionNavItem[i].index = i;
        solutionNavItem[i].onclick = function () {
            var name = this.textContent;
            var showEle = document.getElementsByName(name),
                showEle_length = showEle.length;

            solutionNavItem[oldIndex].classList.remove("selected");
            this.classList.add("selected");
            if (oldType == "全部") {
                var allEle = solutionImgBox.children,
                    allEle_length = allEle.length;
                for (var j = 0; j < allEle_length; j++) {
                    allEle[j].style.display = "none";
                }
            } else {
                var oldEle = document.getElementsByName(oldType),
                    oldEle_length = oldEle.length;
                //把上一次点击类型元素隐藏
                for (var j = 0; j < showEle_length; j++) {
                    oldEle[j].style.display = "none";
                }
            }

            //把所点击的类型显示出来其他元素隐藏

            for (var k = 0; k < showEle_length; k++) {
                showEle[k].style.display = "inline-block";
            }
            oldType = name;
            oldIndex = this.index;
            sessionStorage.setItem("solutionIndex", oldIndex);
        }
    }
    //初始化时显示的对应图片内容
    solutionNavItem[oldIndex].onclick();
}
