/*****************************************
 *
 *  功能：“关于我们”逻辑处理
 *  开发者：杨志欣
 *  最后修改日期：2017-09-09
 *
 *****************************************/

//初始化
window.onload = function () {
    //加载时设置默认的标记用于跳转对应页面内容使用
    sessionStorage.setItem("serviceIndex", 0);
    sessionStorage.setItem("solutionIndex", 0);
    //加载头部和尾部
    loadHeaderOrFooter();
    var navItem = document.getElementsByClassName("navItem")[3];
    //设置选中项
    navItem.classList.add("selected");
}
