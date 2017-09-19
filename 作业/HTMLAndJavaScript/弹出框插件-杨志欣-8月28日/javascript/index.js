//初始化
window.onload = function () {
    var body = document.getElementsByTagName("body")[0];
    //设置图片切换
    var img = "01";
    //获取按钮
    var tipBtn = document.getElementById("tipBtn"),
        ctrlBtn = document.getElementById("ctrlBtn"),
        imgBtn = document.getElementById("imgBtn"),
        formBtn = document.getElementById("formBtn");
    //构建插件参数
    var tipBtnParam = {
            type: "text",
            content: "你在执行非法操作！"
        },
        ctrlBtnParam = {
            type: "ctrl",
            content: "确定要更换背景图片吗？",
            callBack: function () {
                if (img === "01") {
                    img = "02"
                } else {
                    img = "01"
                }
                body.style.backgroundImage = "url('images/" + img + ".jpg')";
            }
        },
        imgBtnParam = {
            type: "img",
            imgURL: "images/img.jpg",
            imgTitle: "狗狗"
        },
        formBtnParam = {
            type: "form"
        };
    //调用“注册按钮事件”
    eventBind(tipBtn, tipBtnParam);
    eventBind(ctrlBtn, ctrlBtnParam);
    eventBind(imgBtn, imgBtnParam);
    eventBind(formBtn, formBtnParam);
}
/**
 *  功能：注册按钮事件
 *  参数：绑定事件对象、插件对象参数
 **/
function eventBind(obj, param) {
    obj.onclick = function () {
        createPopup(param);
    }
}
/**
 *  功能：构建对话框
 *  参数：插件对象参数
 *  参数属性：type对话框类型（text、ctrl、img、form）、content显示文本内容、callBack点击确定自定义回*  调方法
 **/
function createPopup(param) {
    var popup = document.getElementsByTagName("popup")[0];
    popup.style.zIndex = "10";
    //提示对话框
    if (param.type === "text") {
        popup.innerHTML = '<popup-content>' +
            '<popup-close id="popup-close">×</popup-close>' +
            '<popup-body id="popup-body">' + param.content + '</popup-body>' +
            '</popup-content>';
        var popup_close = document.getElementById("popup-close");
        popup_close.onclick = function () {
            this.parentElement.remove();
            popup.style.zIndex = "-1";
        }

    }
    //控制对话框
    else if (param.type === "ctrl") {
        popup.innerHTML = '<popup-content>' +
            '<popup-body id="popup-body">' + param.content + '</popup-body>' +
            '<popup-ctrl id="popup-ctrl">' +
            '<button id="confirm" class="popupBtn">确定</button>' +
            '<button id="cancel" class="popupBtn">取消</button></popup-ctrl>' +
            '</popup-content>';
        var confirm = document.getElementById("confirm"),
            cancel = document.getElementById("cancel");
        confirm.onclick = function () {
            param.callBack();
            this.parentElement.parentElement.remove();
            popup.style.zIndex = "-1";
        }
        cancel.onclick = function () {
            this.parentElement.parentElement.remove();
            popup.style.zIndex = "-1";
        }

    }
    //图片对话框
    else if (param.type === "img") {
        popup.innerHTML = '<popup-content>' +
            '<popup-close id="popup-close">×</popup-close>' +
            '<popup-body id="popup-body"><img src=' + param.imgURL + ' title=' + param.imgTitle + '></popup-body>' +
            '</popup-content>';
        var popup_close = document.getElementById("popup-close");
        popup_close.onclick = function () {
            this.parentElement.remove();
            popup.style.zIndex = "-1";
        }
    }
    //表单对话框
    else if (param.type === "form") {
        popup.innerHTML = '<popup-content>' +
            '<popup-body id="popup-body">' +
            '<div class="row">' +
            '<p id="userNameError" class="errorMsg"></p>' +
            '<p class="inputBox">' +
            '<label for="userName">用户名：</label>' +
            '<input id="userName" type="text" placeholder="请输入用户名"></p>' +
            '</div>' +
            '<div class="row">' +
            '<p id="userPWDError" class="errorMsg"></p>' +
            '<p class="inputBox">' +
            '<label for="userPWD">密&nbsp;&nbsp;&nbsp;码：</label>' +
            '<input id="userPWD" type="text" placeholder="请输入密码"></p>' +
            '</div>' +
            '</popup-body>' +
            '<popup-ctrl id="popup-ctrl">' +
            '<button id="confirm" class="popupBtn">登录</button>' +
            '<button id="cancel" class="popupBtn">取消</button></popup-ctrl>' +
            '</popup-content>';
        var confirm = document.getElementById("confirm"),
            cancel = document.getElementById("cancel"),
            userName = document.getElementById("userName"),
            userPWD = document.getElementById("userPWD"),
            userNameError = document.getElementById("userNameError"),
            userPWDError = document.getElementById("userPWDError");
        var userNameStatus = false,
            userPWDStatus = false;
        userName.onblur = function () {
            userNameError.textContent = "";
            var userNameVal = userName.value,
                userPWDVal = userPWD.value;
            if (userNameVal === "") {
                userNameError.textContent = "用户名不能为空！";
            } else {
                userNameStatus = true;
            }
        }
        userPWD.onblur = function () {
            userPWDError.textContent = "";
            var userNameVal = userName.value,
                userPWDVal = userPWD.value;
            if (userPWDVal === "") {
                userPWDError.textContent = "密码不能为空！";
            } else {
                userPWDStatus = true;
            }
        }
        confirm.onclick = function () {
                userName.onblur();
                userPWD.onblur();
                var userNameVal = userName.value,
                    userPWDVal = userPWD.value;
                if (userNameStatus && userPWDStatus) {
                    if (userNameVal === "y" && userPWDVal === "123") {
                        this.parentElement.parentElement.remove();
                        popup.style.zIndex = "-1";
                    }
                }

        }
        cancel.onclick = function () {
            this.parentElement.parentElement.remove();
            popup.style.zIndex = "-1";
        }
    }
}
