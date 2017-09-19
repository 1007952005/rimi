//好友列表

var friendsData = [{
    name: "咿",
    portrait: "images/1.jpg"
}, {
    name: "呀",
    portrait: "images/2.jpg"
}, {
    name: "呦",
    portrait: "images/3.jpg"
}];

//当前支付对象
var payObj = {
    name: "",
    portrait: "",
    money: 0
}

window.onload = function () {


    loadFrendsList();

    var frend = frendsList.getElementsByTagName("li");
    for (var j = 0; j < frend.length; j++) {
        frend[j].index = j;
        frend[j].onclick = function () {
            goPage(page2);
            loadPayPage(this.index, payObj);
        }
    }
}


//加载好友列表
function loadFrendsList() {
    var frendsList = document.getElementById("frendsList"),
        str = "";
    for (var i = 0; i < friendsData.length; i++) {
        str += "<li><img src=" + friendsData[i].portrait + "><span>" + friendsData[i].name + "</span></li>";
    }
    frendsList.innerHTML = str;

}


//跳转页面
function goPage(page) {

    page.className = "toLeft";
}

function backPage(page) {
    page.className = "";
}

//初始化付款页面
function loadPayPage(friendsIndex, obj) {
    payObj.name = friendsData[friendsIndex].name;
    payObj.portrait = friendsData[friendsIndex].portrait;

    var portrait = document.getElementById("portrait"),
        backPage1 = document.getElementById("backPage1"),
        page2 = document.getElementById("page2"),
        page3 = document.getElementById("page3"),
        alertPayComp = document.getElementById("alertPayComp"),
        payObjName = document.getElementById("payObjName"),
        pay = document.getElementById("pay"),
        inputMoney = document.getElementById("inputMoney"),
        password = [],
        rightPWD = "123456";
    portrait.src = obj.portrait;
    payObjName.textContent = obj.name;
    //    返回按钮
    backPage1.onclick = function () {
        backPage(page2);
        payObj.name = "";
        payObj.portrait = "";
        payObj.money = 0;
    }

    //支付按钮
    alertPayComp.onclick = function () {
        var inpVal = Number(inputMoney.value);
        if (inpVal < 0.01) {
            alert('请至少支付"0.01"元')
        } else {
            pay.innerHTML += '<div class="payInfo"><div class="payInfoBox"><div class="payInfoBox-main"><div class="payInfoHead"><div id="closeBox">×</div>请输入支付密码</div><div class="objN">向<span class="objName">' + payObj.name + '</span>转账</div><div class="money"></div><div class="erro"></div><div class="payPWD"><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div><div id="payInfoKeyboard"><div class="numKey">7</div><div class="numKey">8</div><div class="numKey">9</div><div class="numKey">4</div><div class="numKey">5</div><div class="numKey">6</div><div class="numKey">1</div><div class="numKey">2</div><div class="numKey">3</div><div></div><div class="numKey">0</div><div class="delKey">←</div></div></div>';
            var money = document.getElementsByClassName("money")[0];
            money.innerHTML = "￥" + inpVal.toFixed(2);
            //money.innerHTML = "￥" + parseFloat(inpVal.toFixed(2)).toLocaleString();

        }
    }

    //支付密码弹窗逻辑
    pay.onclick = function (e) {
        var item = e.target;
        if (item.id == "closeBox") {
            var payInfo = document.getElementsByClassName("payInfo")[0];
            payInfo.remove();
            password = [];
        } else if (item.className == "numKey") {
            console.log(password);
            var erro = document.getElementsByClassName("erro")[0];
            erro.textContent = "";
            if (password.length <= 6) {
                var payPWD = document.getElementsByClassName("payPWD")[0];
                var divPWD = payPWD.getElementsByTagName("div");
                password.push(item.textContent);
                divPWD[password.length - 1].innerHTML = "<i></i>";
                if (password.length == 6) {
                    if (password.join("") == rightPWD) {
                        var payInfo = document.getElementsByClassName("payInfo")[0];
                        password = [];
                        payInfo.remove();
                        payObj.money = Number(inputMoney.value);
                        inputMoney.value = "";
                        goPage(page3);
                        loadPaySuccess(page3, payObj);
                    } else {
                        password = [];
                        var payPWD = document.getElementsByClassName("payPWD")[0];
                        var divPWD = payPWD.getElementsByTagName("div");
                        for (var i = 0; i < divPWD.length; i++) {
                            divPWD[i].innerHTML = "";
                        }
                        erro.textContent = "密码输入错误";
                    }
                }
            }
        } else if (item.className == "delKey") {
            if (password.length >= 1) {
                var payPWD = document.getElementsByClassName("payPWD")[0];
                var divPWD = payPWD.getElementsByTagName("div");
                divPWD[password.length - 1].innerHTML = "";
                password.pop();

            }
        }
    }
}

//加载支付成功界面
function loadPaySuccess(page, obj) {
    var backPage2 = document.getElementById("backPage2"),
        sucMoney = document.getElementById("sucMoney"),
        oName = document.getElementById("oName");

    oName.textContent = payObj.name;
    sucMoney.textContent = payObj.money.toFixed(2);
    backPage2.onclick = function () {
        backPage(page);
    }
}
