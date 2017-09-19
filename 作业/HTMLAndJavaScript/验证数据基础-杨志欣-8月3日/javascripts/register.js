/**
 * 功能：数据验证基础
 * 日期：2017-8-3
 **/
var signUpBtn = document.getElementById("signUp");

signUpBtn.onclick = function signUp() {
    //获取所有必填项并且清空错误信息
    var required = document.getElementsByClassName("Required");
    clearErroMesg(required);
    var isNullArr = [];
    var k = 0;
    var repeat = true;
    for (var i = 0; i < required.length; i++) {
        if (required[i].value === "" || required[i].value === "未选择") {
            isNullArr[k] = required[i];
            k++;
        }
        //密码不为空时对比两次的密码
        if (required[2] !== "") {
            if (required[2].value !== required[3].value) {
                required[2].previousElementSibling.previousElementSibling.textContent = "两次密码不一致";
                repeat = false;
            }
        }
    }
    var j = 0
    //检查值为空的项
    for (; j < isNullArr.length; j++) {
        var requireTtype = isNullArr[j].getAttribute("id");
        var type = isNullArr[j];
        switch (requireTtype) {
            case "email":
                console.log(type);
                erroMesg(type, "邮箱不能为空！");
                break;
            case "nicename":
                erroMesg(type, "昵称不能为空！");
                break;
            case "pwd":
                erroMesg(type, "密码不能为空！");
                break;
            case "tel":
                erroMesg(type, "电话号码不能为空！");
                break;
            case "birthday":
                erroMesg(type, "生日不能为空！");
                break;
            default:
                erroMesg(type, "请选择职业！");
        }
    }
    //全部的值都不为空时
    if (j === 0 && repeat === true) {
        location.href = "https://www.baidu.com/";
    }

}

function clearErroMesg(obj) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].previousElementSibling.previousElementSibling.textContent = "";
    }
}

function erroMesg(obj, text) {
    var msg = obj.previousElementSibling.previousElementSibling;
    msg.textContent = text;
}
