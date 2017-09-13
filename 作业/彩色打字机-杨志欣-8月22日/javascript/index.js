//获取相关组件
var textContent = document.getElementById("textContent"),
    startPrint = document.getElementById("startPrint"),
    textPrint = document.getElementById("textPrint");



/**
 * 打印按钮点击事件
 **/
startPrint.onclick = function () {
    //初始化
    textPrint.innerHTML = ""
    //获取输入框数据
    var textContentString = textContent.value,
        count = 0;
    //输入值不合法 
    if (textContentString === "") {
        return;
    }
    //遍历输入的数据
    var printLetter = setInterval(function () {


        textPrint.innerHTML += '<span class="fz-' + Math.floor(Math.random() * 20 + 12) + '">' + textContentString.charAt(count) + '</span>';
        count++;
        if (count === textContentString.length) {
            clearInterval(printLetter);
        }
    }, Math.floor(Math.random() * 150));


}
