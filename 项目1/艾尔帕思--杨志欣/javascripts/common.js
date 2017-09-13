/*****************************************
 *
 *  功能：用户登录注册以及网站header、 footer加载
 *  开发者：杨志欣
 *  最后修改日期：2017-09-10
 *
 *****************************************/



/**
 *  功能：网站header、footer加载
 *  参数：无
 **/
function loadHeaderOrFooter() {
    //获取header、footer标签
    var header = document.getElementsByTagName("header")[0],
        footer = document.getElementsByTagName("footer")[0];
    //渲染header
    header.innerHTML = '<img class="logo" src="../images/common/logo.png" title="艾尔帕思" alt="艾尔帕思">' +
        '<nav>' +
        '<ul>' +
        '<li>' +
        '<a class="navItem" href="../index.html">首页</a>' +
        '</li>' +
        '<li>' +
        '<a class="navItem" href="../pages/service.html">服务与支持</a>' +
        '</li>' +
        '<li>' +
        '<a class="navItem" href="../pages/solution.html">解决方案</a>' +
        '</li>' +
        '<li>' +
        '<a class="navItem" href="../pages/about.html">关于我们</a>' +
        '</li>' +
        '<li>' +
        '<div class="signBox">' +
        '<a id="signIn">登录</a>' +
        '<a id="signUp">注册</a>' +
        '</div>' +
        '<div class="signBox">' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '</nav>';
    //是否登录过
    var signBox = document.getElementsByClassName("signBox");
    if (sessionStorage.getItem("SignIn")) {
        var signObj = JSON.parse(sessionStorage.getItem("SignIn"));
        signBox[1].style.display = "block";
        signBox[0].style.display = "none";
        signBox[1].innerHTML = "您好，" + signObj.nickName;
    } else {
        signBox[0].style.display = "block";
        signBox[1].style.display = "none";
    }

    //渲染footer
    footer.innerHTML = '<div class="footerContent">' +
        '<ul>' +
        '<li class="footerTitle">服务</li>' +
        '<li>' +
        '<a href="#">软件制定</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">软件系统集成</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">信息化建设咨询</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">网络运营</a>' +
        '</li>' +
        '</ul>' +
        '<ul>' +
        '<li class="footerTitle">运营</li>' +
        '<li>' +
        '<a href="#">微信运营</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">APP运营</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">SEM</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">SEO</a>' +
        '</li>' +
        '</ul>' +
        '<ul>' +
        '<li class="footerTitle">产品</li>' +
        '<li>' +
        '<a href="#">电子商务平台</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">数字校园平台</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">物联网平台</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">数据采集监控平台</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">IT技术服务</a>' +
        '</li>' +
        '</ul>' +
        '<ul>' +
        '<li class="footerTitle">公司</li>' +
        '<li>' +
        '<a href="#">团队</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">职位</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">联系</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">魏蜀吴</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div class="copyright">' +
        '<p>Copy right 2015 成都艾尔帕思科技有限公司 All Rights Reserved 蜀ICP备 15031645号-1</p>' +
        '</div>';
    //添加注册登录事件
    var signIn = document.getElementById("signIn"),
        signUp = document.getElementById("signUp");
    signIn.onclick = function () {
        dialog({
            type: "signIn",
            signInCallback: function () {
                var signObj = JSON.parse(sessionStorage.getItem("SignIn"));
                signBox[1].style.display = "block";
                signBox[0].style.display = "none";
                signBox[1].innerHTML = "您好，" + signObj.nickName;
            }
        });
    }
    signUp.onclick = function () {
        dialog({
            type: "signUp",
            signUpCallback: function () {
                var signObj = JSON.parse(sessionStorage.getItem("SignIn"));
                signBox[1].style.display = "block";
                signBox[0].style.display = "none";
                signBox[1].textContent = "您好，" + signObj.nickName;
                console.log(signObj);
            }
        });
    }
}
/**
 *  功能：登录注册弹出框插件
 *  参数：无
 **/
function dialog(param) {
    var body = document.body;
    var userDialog = document.createElement("user-dialog");
    userDialog.innerHTML = '<div class="dialog-main">' +
        '<div class="dialog-type">' +
        '<div class="dialog-title">登录</div>' +
        '<div class="dialog-box">' +
        '<span id="dialog-smoothSI"></span>' +
        '<div class="dialog-input-box">' +
        '<form name="formSI" action="">' +
        '<p>' +
        '<label for="userNameSI">账&nbsp;&nbsp;&nbsp;&nbsp;号</label>' +
        '<input id="userNameSI" type="text" name="userNameSI" placeholder="手机号/邮箱">' +
        '<span class="errorMsgSI"></span>' +
        '</p>' +
        '<p>' +
        '<label for="userPWDSI">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>' +
        '<input id="userPWDSI" type="password" name="userPWDSI" placeholder="密码">' +
        '<span class="errorMsgSI"></span>' +
        '</p>' +
        '<p id="verificationCodeBoxSI">' +
        '<label for="verificationCodeSI">验证码</label>' +
        '<input id="verificationCodeSI" type="text" name="verificationCodeSI" placeholder="验证码">' +
        '<span class="v-codeSI">' +
        '<span class="codeBox"></span>' +
        '<span class="codeMask" title="换一张">' +
        '</span>' +
        '</span>' +
        '<span class="errorMsgSI"></span>' +
        '</p>' +
        '<p><input class="confirmSI" type="button" value="确定" name="confirmSI"></p>' +
        '<p><span class="nowSignUp">立即注册</span></p>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '<i class="dialog-closeSI">×</i>' +
        '</div>' +
        '<div class="dialog-type">' +
        '<div class="dialog-title">注册</div>' +
        '<div class="dialog-box">' +
        '<span id="dialog-smoothSU"></span>' +
        '<div class="dialog-input-box">' +
        '<form name="formSU" action="">' +
        '<p>' +
        '<label for="userNameSU">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>' +
        '<input id="userNameSU" type="text" name="userNameSU" placeholder="请输入手机号/邮箱">' +
        '<span class="errorMsgSU"></span>' +
        '<span class="isRight"></span>' +
        '</p>' +
        '<p>' +
        '<label for="userPWDSU">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>' +
        '<input id="userPWDSU" type="password" name="userPWDSU" placeholder="请设置密码">' +
        '<span class="errorMsgSU"></span>' +
        '<span class="isRight"></span>' +
        '</p>' +
        '<p>' +
        '<label for="userPWDSU">确认密码</label>' +
        '<input id="userPWDConfirm" type="password" name="userPWDConfirm" placeholder="请确认密码">' +
        '<span class="errorMsgSU"></span>' +
        '<span class="isRight"></span>' +
        '</p>' +
        '<p id="verificationCodeBoxSU">' +
        '<label for="verificationCodeSU">验&nbsp;&nbsp;证&nbsp;&nbsp;码</label>' +
        '<input id="verificationCodeSU" type="text" name="verificationCodeSU" placeholder="请输入验证码">' +
        '<span class="v-codeSU">' +
        '<span class="codeBox">' +
        '</span>' +
        '<span class="codeMask" title="换一张">' +
        '</span>' +
        '</span>' +
        '<span class="errorMsgSU"></span>' +
        '<span class="isRight"></span>' +
        '</p>' +
        '<p><input class="confirmSU" type="button" value="确定" name="confirmSU"></p>' +
        '<p><span class="nowSignIn">立即登录</span></p>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '<i class="dialog-closeSU">×</i>' +
        '</div>' +
        '<div class="dialog-type">' +
        '<div class="dialog-box">' +
        '<span id="dialog-smoothSUNick"></span>' +
        '<p>' +
        '<label for="nickname">请输入昵称</label>' +
        '<input id="nicknameSU" type="text" name="nicknameSU" placeholder="请输入16位以内的字符">' +
        '<span class="errorMsgSU"></span>' +
        '<span class="isRight"></span>' +
        '</p>' +
        '<p><input class="confirmSU" type="button" value="确定" name="confirmSUName"></p>' +
        '</div>' +
        '<i class="dialog-closeSUName">×</i>' +
        '</div>' +
        '</div>';
    body.append(userDialog);
    //设置对应的界面显示
    var dialog_type = document.getElementsByClassName("dialog-type"),
        codeMask = document.getElementsByClassName("codeMask"),
        dialog_main = document.getElementsByClassName("dialog-main")[0];
    dialog_type[2].style.display = "none";
    if (param.type == "signIn") {
        createSignIn();
    } else {
        createSignUp();
    }

    //窗口抖动效果
    userDialog.onclick = function (e) {
        if (e.target === userDialog) {
            dialog_main.classList.add("shock");
            setTimeout(function () {
                dialog_main.classList.remove("shock");
            }, 400);
        }
    }
    /**
     *  功能：创建登录窗口
     *  参数：无
     **/
    function createSignIn() {

        dialog_type[0].style.display = "block";
        dialog_type[1].style.display = "none";
        setTimeout(function () {
            userDialog.style.opacity = "1";
        }, 300);
        var dialog_close = document.getElementsByClassName("dialog-closeSI")[0],
            dialog_smoothSI = document.getElementById("dialog-smoothSI"),
            errorMsgSI = document.getElementsByClassName("errorMsgSI"),
            formSIObj = formSI,
            userNameMailReg = /^[\w_\-]+@[\w_\-]+\.[A-Za-z]+$/,
            userNameNumReg = /^1[345789]\d{9}$/,
            nowSignUp = document.getElementsByClassName("nowSignUp")[0],
            //错误数组
            errorArr = [],
            v_codeSI = document.getElementsByClassName("v-codeSI")[0],
            codeBox = document.getElementsByClassName("codeBox")[0],
            //验证码
            codeArr = [];
        //立即注册事件
        nowSignUp.onclick = function () {
            createSignUp();
        };
        //生成验证码
        codeMask[0].onclick = function () {
            //生成五位随机数
            codeArr = createVerificationCode(5);
            var codeArr_length = codeArr.length,
                rX = Math.round(Math.random() * 690),
                rY = Math.round(Math.random() * 426),
                str = "";
            for (var i = 0; i < codeArr_length; i++) {
                var rMargin = Math.round(Math.random() * 8 - 4),
                    rDeg = Math.round(Math.random() * 60 - 30);
                str += '<span style="color:' + randomColor() + ';transform: rotateZ(' + rDeg + 'deg);margin-top:' + rMargin + 'px;">' + codeArr[i] + '</span>';
            }
            v_codeSI.style.backgroundPosition = rX + "px " + rY + "px";
            codeBox.innerHTML = str;
        };
        codeMask[0].onclick();
        //关闭按钮事件
        dialog_close.onclick = function () {
            var that = this;
            that.parentElement.parentElement.parentElement.style.opacity = "0";
            setTimeout(function () {
                that.parentElement.parentElement.parentElement.remove();
            }, 400);

        };
        //账号验证
        formSIObj.userNameSI.onfocus = function () {
            //设置选中时的样式
            dialog_smoothSI.style.top = this.parentElement.offsetTop + 25 + "px";
            this.style.borderColor = "#3c9ce6";
        };
        formSIObj.userNameSI.onblur = function () {
            var val = this.value;
            if (userNameMailReg.test(val) || userNameNumReg.test(val)) {
                errorMsgSI[0].textContent = ""
                this.style.borderColor = "#ccc";
                //如果错误修改了删除在错误列表里的这个错误
                var errorArr_length = errorArr.length;
                for (var i = 0; i < errorArr_length; i++) {
                    if (errorArr[i] == 0) {
                        errorArr.splice(i, 1);
                    }
                }
                //如果填写没错滑块变回蓝色
                if (errorArr.length == 0) {
                    dialog_smoothSI.style.backgroundColor = "#3c9ce6";
                }

            } else if (val == "") {
                errorMsgSI[0].textContent = "账号不能为空";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSI.style.backgroundColor = "#dd3e3e";
                //如果这是个新错误则加入错误数组
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 0;
                });
                if (!isRepeat) {
                    errorArr.push(0);
                }

            } else {
                errorMsgSI[0].textContent = "请输入正确的手机号或邮箱"
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSI.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 0;
                });
                if (!isRepeat) {
                    errorArr.push(0);
                }
            }


        };
        //密码验证
        formSIObj.userPWDSI.onfocus = function () {
            //设置选中时的样式
            dialog_smoothSI.style.top = this.parentElement.offsetTop + 25 + "px";
            this.style.borderColor = "#3c9ce6";
        };
        formSIObj.userPWDSI.onblur = function () {
            var val = this.value;
            if (val == "") {
                errorMsgSI[1].textContent = "密码不能为空";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSI.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 1;
                });
                if (!isRepeat) {
                    errorArr.push(1);
                }
            } else {
                errorMsgSI[1].textContent = ""
                this.style.borderColor = "#ccc";
                var errorArr_length = errorArr.length;
                for (var i = 0; i < errorArr_length; i++) {
                    if (errorArr[i] == 1) {
                        errorArr.splice(i, 1);
                    }
                }
                if (errorArr.length == 0) {
                    dialog_smoothSI.style.backgroundColor = "#3c9ce6";
                }
            }


        };
        //验证码验证
        formSIObj.verificationCodeSI.onfocus = function () {
            //设置选中时的样式
            dialog_smoothSI.style.top = this.parentElement.offsetTop + 25 + "px";
            this.style.borderColor = "#3c9ce6";
        };
        formSIObj.verificationCodeSI.onblur = function () {
            var val = this.value.toLowerCase(),
                codeStr = codeArr.join("").toLowerCase();
            if (val == "") {
                errorMsgSI[2].textContent = "验证码不能为空";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSI.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 2;
                });
                if (!isRepeat) {
                    errorArr.push(2);
                }
            } else if (val !== codeStr) {
                errorMsgSI[2].textContent = "验证码输入错误";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSI.style.backgroundColor = "#dd3e3e";
                //更换验证码
                codeMask[0].onclick();
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 2;
                });
                if (!isRepeat) {
                    errorArr.push(2);
                }
            } else {
                errorMsgSI[2].textContent = ""
                this.style.borderColor = "#ccc";
                var errorArr_length = errorArr.length;
                for (var i = 0; i < errorArr_length; i++) {
                    if (errorArr[i] == 2) {
                        errorArr.splice(i, 1);
                    }
                }
                if (errorArr.length == 0) {
                    dialog_smoothSI.style.backgroundColor = "#3c9ce6";
                }
            }

        };
        //登录事件
        formSIObj.confirmSI.onclick = function () {
            //检测是否有误或者用户没有填写
            formSIObj.userNameSI.onblur();
            formSIObj.userPWDSI.onblur();
            formSIObj.verificationCodeSI.onblur();

            var passName = 0,
                passPWD = 0,
                passNameStatus = false,
                passPWDStatus = false;
            var localObj = localStorage.getItem("login") ? JSON.parse(localStorage.getItem("login")) : null;
            //没有输入错误
            if (errorArr.length == 0) {
                formSIObj.confirmSI.classList.remove("successActive");
                formSIObj.confirmSI.classList.remove("errorActive");
                //设置动画
                formSIObj.confirmSI.classList.add("loadActive");
                formSIObj.confirmSI.value = "";
                setTimeout(function () {
                    formSIObj.confirmSI.classList.add("loadingActive");
                }, 600);
                //有本地存储时
                if (localObj !== null) {

                    if (formSIObj.userNameSI.value == localObj.userName) {
                        passNameStatus = true;
                    } else {
                        passName = 1;
                    }
                    if (formSIObj.userPWDSI.value == localObj.userPWD) {
                        passPWDStatus = true;
                    } else {
                        passPWD = 1;
                    }

                    //登录成功
                    if (passNameStatus && passPWDStatus) {
                        formSIObj.confirmSI.value = "";
                        setTimeout(function () {
                            formSIObj.confirmSI.classList.remove("loadingActive");
                        }, 3200);
                        setTimeout(function () {
                            formSIObj.confirmSI.classList.remove("loadActive");
                            formSIObj.confirmSI.value = "✔";
                            formSIObj.confirmSI.classList.add("successActive");

                        }, 3800);
                        setTimeout(function () {
                            var signObj = JSON.stringify(localObj);
                            sessionStorage.setItem("SignIn", signObj);
                            param.signInCallback();
                            dialog_close.onclick();
                        }, 4400);

                    } else if (passName == 1) { //设置相应的错误提示
                        setTimeout(function () {
                            formSIObj.confirmSI.classList.remove("loadingActive");
                        }, 3200);
                        setTimeout(function () {
                            formSIObj.confirmSI.classList.remove("errorActive");
                            formSIObj.confirmSI.value = "✘";
                            formSIObj.confirmSI.classList.add("errorActive");
                            errorMsgSI[0].textContent = "账号不存在";
                            errorArr.push(0);
                            formSIObj.userNameSI.style.borderColor = "#dd3e3e";
                            dialog_smoothSI.style.backgroundColor = "#dd3e3e";
                            codeMask[0].onclick();
                        }, 3800);
                    } else if (passName == 0 && passPWD == 1) {
                        setTimeout(function () {
                            formSIObj.confirmSI.classList.remove("loadingActive");
                        }, 3200);
                        setTimeout(function () {
                            formSIObj.confirmSI.classList.remove("errorActive");
                            formSIObj.confirmSI.value = "✘";
                            formSIObj.confirmSI.classList.add("errorActive");
                            errorMsgSI[1].textContent = "密码错误";
                            errorArr.push(1);
                            formSIObj.userNameSI.style.borderColor = "#dd3e3e";
                            dialog_smoothSI.style.backgroundColor = "#dd3e3e";
                            codeMask[0].onclick();
                        }, 3800);

                    }
                }
                //没有本地存储
                else {
                    setTimeout(function () {
                        formSIObj.confirmSI.classList.remove("loadingActive");
                    }, 3200);
                    setTimeout(function () {
                        formSIObj.confirmSI.classList.remove("errorActive");
                        formSIObj.confirmSI.value = "✘";
                        formSIObj.confirmSI.classList.add("errorActive");
                        errorMsgSI[0].textContent = "用户名不存在";
                        errorArr.push(0);
                        formSIObj.userNameSI.style.borderColor = "#dd3e3e";
                        dialog_smoothSI.style.backgroundColor = "#dd3e3e";
                        codeMask[0].onclick();
                    }, 3800);
                }



            } else {
                //输入出错时动画
                formSIObj.confirmSI.classList.add("errorInputActive");
                setTimeout(function () {
                    formSIObj.confirmSI.classList.remove("errorInputActive");
                    //重新添加验证码
                    codeMask[0].onclick();
                }, 300);
            }

        };
    }
    /**
     *  功能：创建注册窗口
     *  参数：无
     **/
    function createSignUp() {

        dialog_type[0].style.display = "none";
        dialog_type[1].style.display = "block";
        setTimeout(function () {
            userDialog.style.opacity = "1";
        }, 300);
        var dialog_close = document.getElementsByClassName("dialog-closeSU")[0],
            dialog_smoothSU = document.getElementById("dialog-smoothSU"),
            errorMsgSU = document.getElementsByClassName("errorMsgSU"),
            formSUObj = formSU,
            nowSignIn = document.getElementsByClassName("nowSignIn")[0],
            userNameMailReg = /^[\w_\-]+@[\w_\-]+\.[A-Za-z]+$/,
            userNameNumReg = /^1[345789]\d{9}$/,
            userPWDReg = /^\S{6,16}/,
            //错误数组

            errorArr = [],
            v_codeSU = document.getElementsByClassName("v-codeSU")[0],
            codeBox = document.getElementsByClassName("codeBox")[1],
            isRight = document.getElementsByClassName("isRight"),
            //验证码
            codeArr = [];

        //立即登录事件
        nowSignIn.onclick = function () {
            createSignIn();
        };
        //生成验证码
        codeMask[1].onclick = function () {
            //生成五位随机数
            codeArr = createVerificationCode(5);
            var codeArr_length = codeArr.length,
                rX = Math.round(Math.random() * 690),
                rY = Math.round(Math.random() * 426),
                str = "";
            for (var i = 0; i < codeArr_length; i++) {
                var rMargin = Math.round(Math.random() * 8 - 4),
                    rDeg = Math.round(Math.random() * 60 - 30);
                str += '<span style="color:' + randomColor() + ';transform: rotateZ(' + rDeg + 'deg);margin-top:' + rMargin + 'px;">' + codeArr[i] + '</span>';
            }
            v_codeSU.style.backgroundPosition = rX + "px " + rY + "px";
            codeBox.innerHTML = str;
        };
        codeMask[1].onclick();
        //关闭按钮事件
        dialog_close.onclick = function () {
            var that = this;
            that.parentElement.parentElement.parentElement.style.opacity = "0";
            setTimeout(function () {
                that.parentElement.parentElement.parentElement.remove();
            }, 400);

        };
        //账号验证
        formSUObj.userNameSU.onfocus = function () {
            //设置选中时的样式
            dialog_smoothSU.style.top = this.parentElement.offsetTop + 25 + "px";
            this.style.borderColor = "#3c9ce6";
        };
        formSUObj.userNameSU.onblur = function () {
            var val = this.value;
            if (userNameMailReg.test(val) || userNameNumReg.test(val)) {
                errorMsgSU[0].textContent = ""
                this.style.borderColor = "#ccc";
                //如果错误修改了删除在错误列表里的这个错误
                var errorArr_length = errorArr.length;
                for (var i = 0; i < errorArr_length; i++) {
                    if (errorArr[i] == 0) {
                        errorArr.splice(i, 1);
                    }
                }
                //如果填写没错滑块变回蓝色
                if (errorArr.length == 0) {
                    dialog_smoothSU.style.backgroundColor = "#3c9ce6";
                }
                //打上对号
                isRight[0].style.color = "#38ce83";
                isRight[0].textContent = "✔";

            } else if (val == "") {
                errorMsgSU[0].textContent = "账号不能为空";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                //如果这是个新错误则加入错误数组
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 0;
                });
                if (!isRepeat) {
                    errorArr.push(0);
                }
                isRight[0].style.color = "#dd3e3e";
                isRight[0].textContent = "✘";
            } else {
                errorMsgSU[0].textContent = "请输入正确的手机号或邮箱"
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 0;
                });
                if (!isRepeat) {
                    errorArr.push(0);
                }
                isRight[0].style.color = "#dd3e3e";
                isRight[0].textContent = "✘";
            }

        };
        //密码验证
        formSUObj.userPWDSU.onfocus = function () {
            //设置选中时的样式
            dialog_smoothSU.style.top = this.parentElement.offsetTop + 25 + "px";
            this.style.borderColor = "#3c9ce6";
        };
        formSUObj.userPWDSU.onblur = function () {
            var val = this.value,
                confirmPWDVal = formSUObj.userPWDConfirm.value;
            //密码为空时
            if (val == "") {
                errorMsgSU[1].textContent = "密码不能为空";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 1;
                });
                if (!isRepeat) {
                    errorArr.push(1);
                }
                isRight[1].style.color = "#dd3e3e";
                isRight[1].textContent = "✘";
            }
            //密码格式错误时
            else if (!userPWDReg.test(val)) {
                errorMsgSU[1].textContent = "请输入非空格的6到16位密码";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 1;
                });
                if (!isRepeat) {
                    errorArr.push(1);
                }
                isRight[1].style.color = "#dd3e3e";
                isRight[1].textContent = "✘";
            }
            //密码格式正确
            else {
                errorMsgSU[1].textContent = ""
                this.style.borderColor = "#ccc";
                var errorArr_length = errorArr.length;
                for (var i = 0; i < errorArr_length; i++) {
                    if (errorArr[i] == 1) {
                        errorArr.splice(i, 1);
                    }
                }
                if (errorArr.length == 0) {
                    dialog_smoothSU.style.backgroundColor = "#3c9ce6";
                }
                isRight[1].style.color = "#38ce83";
                isRight[1].textContent = "✔";
                //当密码输入格式正确确认密码不为空
                if (confirmPWDVal !== "") {
                    //对比两个密码
                    if (confirmPWDVal == val) {
                        errorMsgSU[2].textContent = "";
                        for (var i = 0; i < errorArr_length; i++) {
                            if (errorArr[i] == 2) {
                                errorArr.splice(i, 1);
                            }
                        }
                        isRight[2].style.color = "#38ce83";
                        isRight[2].textContent = "✔";
                        formSUObj.userPWDConfirm.style.borderColor = "#ccc";
                    } else {
                        errorMsgSU[2].textContent = "两次密码不一致";
                        var isRepeat = errorArr.some(function (ele) {
                            return ele == 2;
                        });
                        if (!isRepeat) {
                            errorArr.push(2);
                        }
                        isRight[2].style.color = "#dd3e3e";
                        isRight[2].textContent = "✘";
                    }
                }
            }


        };
        //确认密码
        formSUObj.userPWDConfirm.onfocus = function () {
            //设置选中时的样式
            dialog_smoothSU.style.top = this.parentElement.offsetTop + 25 + "px";
            this.style.borderColor = "#3c9ce6";
        };
        formSUObj.userPWDConfirm.onblur = function () {
            var val = this.value,
                pwdVal = formSUObj.userPWDSU.value;
            if (val == "") {
                //当密码不为空确认密码为空时
                if (pwdVal !== "") {
                    errorMsgSU[2].textContent = "请确认密码";
                    this.style.borderColor = "#dd3e3e";
                    dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                    var isRepeat = errorArr.some(function (ele) {
                        return ele == 2;
                    });
                    if (!isRepeat) {
                        errorArr.push(2);
                    }
                    isRight[2].style.color = "#dd3e3e";
                    isRight[2].textContent = "✘";
                    //当密码不为空确认密码为空但是密码格式不正确时
                    if (!userPWDReg.test(pwdVal)) {
                        errorMsgSU[2].textContent = "请在上方填写正确格式的密码";
                    }
                } else {
                    isRight[2].textContent = "";
                    this.style.borderColor = "#ccc";
                }


            }
            //当确认密码不为空密码格式不正确时
            else if (!userPWDReg.test(pwdVal)) {
                errorMsgSU[2].textContent = "请在上方输入格式正确的密码";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 2;
                });
                if (!isRepeat) {
                    errorArr.push(2);
                }
                isRight[2].style.color = "#dd3e3e";
                isRight[2].textContent = "✘";
                //当确认密码不为空密码为空时确时
                if (pwdVal == "") {
                    errorMsgSU[2].textContent = "请在上方输入密码";
                }
            }
            //两个密码不一致时
            else if (val !== pwdVal) {
                errorMsgSU[2].textContent = "两次密码不一致";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 2;
                });
                if (!isRepeat) {
                    errorArr.push(2);
                }
                isRight[2].style.color = "#dd3e3e";
                isRight[2].textContent = "✘";
            } else {
                errorMsgSU[2].textContent = ""
                this.style.borderColor = "#ccc";
                var errorArr_length = errorArr.length;
                for (var i = 0; i < errorArr_length; i++) {
                    if (errorArr[i] == 2) {
                        errorArr.splice(i, 1);
                    }
                }
                if (errorArr.length == 0) {
                    dialog_smoothSU.style.backgroundColor = "#3c9ce6";
                }
                isRight[2].style.color = "#38ce83";
                isRight[2].textContent = "✔";
            }


        };
        //验证码验证
        formSUObj.verificationCodeSU.onfocus = function () {
            //设置选中时的样式
            dialog_smoothSU.style.top = this.parentElement.offsetTop + 25 + "px";
            this.style.borderColor = "#3c9ce6";
        };
        formSUObj.verificationCodeSU.onblur = function () {
            var val = this.value.toLowerCase(),
                codeStr = codeArr.join("").toLowerCase();
            if (val == "") {
                errorMsgSU[3].textContent = "验证码不能为空";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 3;
                });
                if (!isRepeat) {
                    errorArr.push(3);
                }
            } else if (val !== codeStr) {
                errorMsgSU[3].textContent = "验证码输入错误";
                this.style.borderColor = "#dd3e3e";
                dialog_smoothSU.style.backgroundColor = "#dd3e3e";
                //更换验证码
                codeMask[1].onclick();
                var isRepeat = errorArr.some(function (ele) {
                    return ele == 3;
                });
                if (!isRepeat) {
                    errorArr.push(3);
                }
            } else {
                errorMsgSU[3].textContent = "";
                this.style.borderColor = "#ccc";
                var errorArr_length = errorArr.length;
                for (var i = 0; i < errorArr_length; i++) {
                    if (errorArr[i] == 3) {
                        errorArr.splice(i, 1);
                    }
                }
                if (errorArr.length == 0) {
                    dialog_smoothSU.style.backgroundColor = "#3c9ce6";
                }
            }

        };
        //注册事件
        formSUObj.confirmSU.onclick = function () {
            //检测是否有误或者用户没有填写
            formSUObj.userNameSU.onblur();
            formSUObj.userPWDSU.onblur();
            formSUObj.userPWDConfirm.onblur();
            formSUObj.verificationCodeSU.onblur();

            //没有输入错误
            if (errorArr.length == 0) {
                var uName = formSUObj.userNameSU.value,
                    uPWD = formSUObj.userPWDSU.value;
                createNickName(uName, uPWD);
            } else {
                //输入出错时动画
                formSUObj.confirmSU.classList.add("errorInputActive");
                setTimeout(function () {
                    formSUObj.confirmSU.classList.remove("errorInputActive");
                    //重新添加验证码
                    codeMask[1].onclick();
                }, 300);
            }

        };

        /**
         *  功能：创建昵称窗口
         *  参数：用户名、密码
         **/
        function createNickName(uName, uPWD) {
            dialog_type[1].style.display = "none";
            dialog_type[2].style.display = "block";
            var nickNameReg = /^[\u4e00-\u9fa5\w\-\._]{1,16}$/;
            var nicknameSU = document.getElementById("nicknameSU"),
                confirmSUName = document.getElementsByName("confirmSUName")[0],
                dialog_smoothSUNick = document.getElementById("dialog-smoothSUNick"),
                errorMsgSU = document.getElementsByClassName("errorMsgSU")[4],
                isRight = document.getElementsByClassName("isRight")[4],
                dialog_closeSUName = document.getElementsByClassName("dialog-closeSUName")[0],
                error = 0;
            dialog_smoothSUNick.style.top = nicknameSU.parentElement.offsetTop + 25 + "px";
            dialog_closeSUName.onclick = function () {
                var that = this;
                that.parentElement.parentElement.parentElement.style.opacity = "0";
                setTimeout(function () {
                    that.parentElement.parentElement.parentElement.remove();
                }, 400);
            }
            nicknameSU.onblur = function () {
                var val = this.value;
                if (val == "") {
                    errorMsgSU.textContent = "昵称不能为空";
                    this.style.borderColor = "#dd3e3e";
                    dialog_smoothSUNick.style.backgroundColor = "#dd3e3e";
                    error = 1;
                    isRight.style.color = "#dd3e3e";
                    isRight.textContent = "✘";
                } else if (!nickNameReg.test(val)) {
                    errorMsgSU.textContent = "昵称有非法字符";
                    this.style.borderColor = "#dd3e3e";
                    dialog_smoothSUNick.style.backgroundColor = "#dd3e3e";
                    error = 1;
                    isRight.style.color = "#dd3e3e";
                    isRight.textContent = "✘";
                } else {
                    error = 0;
                    errorMsgSU.textContent = "";
                    dialog_smoothSUNick.style.backgroundColor = "#3c9ce6";
                    this.style.borderColor = "#ccc";
                    isRight.style.color = "#38ce83";
                    isRight.textContent = "✔";
                }
            }
            //注册事件
            confirmSUName.onclick = function () {
                nicknameSU.blur();
                var obj = {};
                var backFunction = param.signUpCallback;
                if (error == 0) {
                    obj = {
                        userName: uName,
                        nickName: nicknameSU.value,
                        userPWD: uPWD
                    }
                    var str = JSON.stringify(obj);
                    confirmSUName.classList.remove("successActive");
                    confirmSUName.classList.remove("errorActive");
                    confirmSUName.classList.add("loadActive");
                    confirmSUName.value = "";
                    setTimeout(function () {
                        confirmSUName.classList.add("loadingActive");
                    }, 600);

                    setTimeout(function () {
                        confirmSUName.classList.remove("loadingActive");
                    }, 3200);
                    setTimeout(function () {
                        confirmSUName.classList.remove("loadActive");
                        confirmSUName.value = "✔";
                        confirmSUName.classList.add("successActive");

                    }, 3800);
                    setTimeout(function () {
                        localStorage.setItem("login", str);
                        sessionStorage.setItem("SignIn", str);
                        backFunction();
                        dialog_closeSUName.onclick();
                    }, 4400);
                } else {
                    //输入出错时动画
                    confirmSUName.classList.add("errorInputActive");
                    setTimeout(function () {
                        confirmSUName.classList.remove("errorInputActive");
                    }, 300);
                }
            }


        }
    }

    /**
     *  功能：生成验证码
     *  参数：无
     *  返回值：验证码数组
     **/
    function createVerificationCode(length) {
        var randomArr = [],
            randomSource = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            rs_length = randomSource.length;
        while (length) {
            randomArr.push(randomSource.charAt(Math.floor(Math.random() * rs_length)));
            length--;
        }
        return randomArr
    }
    /**
     *  功能：生成随机颜色
     *  参数：无
     *  返回值：Hex的颜色
     **/
    function randomColor() {
        var color = "0123456789abcdef",
            colorStr = '#',
            length = 6;
        while (length) {
            colorStr += color.charAt(Math.floor(Math.random() * 16));
            length--;
        }

        return colorStr;
    }

}
