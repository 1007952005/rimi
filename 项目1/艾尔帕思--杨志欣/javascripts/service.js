/*****************************************
 *
 *  功能：“服务与支持”逻辑处理
 *  开发者：杨志欣
 *  最后修改日期：2017-09-08
 *
 *****************************************/



//初始化
window.onload = function () {

    //加载头部尾部
    loadHeaderOrFooter();
    var navItem = document.getElementsByClassName("navItem"),
        serviceNavItem = document.getElementsByClassName("serviceNavItem"),
        serviceNavItem_length = serviceNavItem.length,
        //获取主页中设置的下标
        serviceIndex = Number(sessionStorage.getItem("serviceIndex")),
        serviceBanner = document.getElementsByClassName("serviceBanner"),
        serviceDescribe = document.getElementsByClassName("serviceDescribe"),
        serviceSliding = document.getElementById("serviceSliding");
    //记录上一个选择的服务项
    var servicePrev = serviceIndex;
    //header设置选中
    navItem[1].classList.add("selected");
    //调用服务选项事件绑定
    serviceNavEventBind();
    sessionStorage.setItem("solutionIndex", 0);
    navItem[1].onclick = function () {
        //加载时设置默认的标记用于要转服务页面使用
        sessionStorage.setItem("serviceIndex", 0);
    }

    //设置初始选择项
    serviceBanner[servicePrev];
    serviceNavItem[servicePrev];
    serviceDescribe[servicePrev];
    serviceBanner[servicePrev].style.opacity = "1";
    serviceNavItem[servicePrev].classList.add("selected");
    serviceDescribe[servicePrev].style.display = "block";
    serviceDescribe[servicePrev].style.opacity = "1";
    serviceSliding.style.left = serviceNavItem[servicePrev].offsetLeft + "px";
    //当窗口改变时滑块位置大小改变
    window.onresize = function () {
        serviceSliding.style.left = serviceNavItem[servicePrev].offsetLeft + "px";
    }


    /**
     *  功能：服务选项事件绑定
     *  参数：无
     **/
    function serviceNavEventBind() {
        for (var i = 0; i < serviceNavItem_length; i++) {
            serviceNavItem[i].index = i;
            serviceNavItem[i].onclick = function () {
                if (this === servicePrev.Nav) {
                    return;
                }
                var serviceItemIndex = this.index;
                //把上个选择的项重置
                serviceBanner[servicePrev].style.opacity = "0";
                serviceNavItem[servicePrev].classList.remove("selected");
                serviceDescribe[servicePrev].style.opacity = "0";
                serviceDescribe[servicePrev].style.display = "none";
                //设置选中
                serviceBanner[serviceItemIndex].style.opacity = "1";
                this.classList.add("selected");
                serviceDescribe[serviceItemIndex].style.display = "block";
                setTimeout(function () {
                    serviceDescribe[serviceItemIndex].style.opacity = "1";
                }, 200);
                //保存成上次选中的状态
                servicePrev = serviceItemIndex;
                //存储当前下标
                sessionStorage.setItem("serviceIndex", serviceItemIndex);
                //设置滑块位置
                serviceSliding.style.left = this.offsetLeft + "px";

            }
        }

    }
}
