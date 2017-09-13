/****
 **  功能：索引页功能
 **  日期：2017-8-21
 ****/


/*****************************/
/* 全局变量定义 */
/*****************************/

var payObj = {
    name: "",
    money: 0
}

/*****************************/
/* 页面加载完成后执行功能 */
/*****************************/

window.onload = function () {
    //调用“生成列表”函数(2)
    createList(friendData);
    //调用“为列表项绑定点击页面跳转事件”
    toPayPage();
    //返回按钮事件绑定
    prevPage();
    //密码控件
    passwordComponet();
    //点击支付按钮事件
    //密码输入事件

}

/*****************************/
/*函数定义部分（函数内容）*/
/*****************************/


/**
 *功能：生成列表(1)
 *参数：需要数据（Array-Object）
 **/
function createList(data) {
    //获取列表容器
    var friendList = document.getElementById("friend-list");
    //获取数据长度
    var data_length = data.length;
    //遍历数据
    for (var i = 0; i < data_length; i++) {
        friendList.innerHTML += '<li>' +
            '<img src="' + data[i].photoURL + '">' +
            '<span>' + data[i].name + '</span>' +
            '<i data-arrow="right">&gt;</i>' +
            '</li>';
    }
}


/**
 * 功能：页面跳转
 * 参数：需要跳转的页面（Number）
 **/

function nextPage(pageNum) {
    var page = document.getElementsByTagName("page")[pageNum];
    page.style.left = "0";
    page.style.boxShadow="0 "
}

/**
 * 功能：页面返回
 * 参数：需要返回的页面索引（Number）
 **/

function prevPage() {
    /*var page = document.getElementsByTagName("page")[pageNum];
    page.style.left = "100%";*/
    var backBtn = document.getElementsByTagName("back"),
        backBtn_length = backBtn.length;
    for (var i = 0; i < backBtn_length; i++) {
        backBtn[i].onclick = function () {
            //找到当前返回按钮的page
            var currentPage = this.parentElement.parentElement;
            //设置当前page
            currentPage.style.left = "100%";
        }
    }
}


/**
 * 功能：为列表项绑定点击页面跳转事件
 * 参数：需要跳转的页面（Number）
 **/
function toPayPage() {
    var friendItems = document.getElementsByTagName("li"),
        friendItems_length = friendItems.length;
    for (var i = 0; i < friendItems_length; i++) {
        friendItems[i].index = i;
        friendItems[i].onclick = function () {
            payObj.name = "";
            payObj.money = 0;

            var input = document.getElementsByTagName("input"),
                input_length = input.length;
            for (var j = 0; j < input_length; j++) {
                input[j].value = "";
            }
            //跳转页面
            nextPage(1);
            //获取当前用户的名称
            //设置支付信息页面数据
            payObj.name = friendData[this.index].name;
            //收款人显示元素
            var payee_1 = document.getElementById("payee_1");
            payee_1.textContent = payObj.name;
        }
    }

}

/**
 * 功能：密码组件相关功能
 **/

function passwordComponet() {
    //获取支付按钮
    var payMoney = document.getElementById("payMoney");
    payMoney.onclick = function () {
        //获取输入金额

        var numPayMoney = document.getElementById("numPayMoney"),
            numPayMoney_val = Number(numPayMoney.value);
        if (numPayMoney_val > 5000) {
            alert("单日交易不能超过5000");
            return;
        } else if (numPayMoney_val < 0.01) {
            alert("交易金额不能低于0.01");
            return;
        }
        //存储转账金额
        payObj.money = numPayMoney_val;


        //显示密码控件
        var showComponet = document.getElementsByTagName("componet")[0];
        showComponet.innerHTML = '<div class="pawComponet">' +
            '<!--遮罩层-->' +
            '<div class="masklaer"></div>' +
            '<!--支付信息区域-->' +
            '<div class="payInfo">' +
            '<!--支付信息面板-->' +
            '<div class="payInfo-panel">' +
            '<h3>' +
            '<i class="closePwdComponet">×</i>' +
            '<span>请输入支付密码</span>' +
            '</h3>' +
            '<div class="mt-5">' +
            '<p>向<span class="payee">' + payObj.name + '</span>转账</p>' +
            '<p class="fz-34 mt-10">￥<span>' + payObj.money.toFixed(2) + '</span></p>' +
            '</div>' +
            '<div id="pwdInput">' +
            '<div class="erroMesg"></div>' +
            '<div class="pwdInput-item">' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="numKeyboard">' +
            '<div class="numKey">7</div>' +
            '<div class="numKey">8</div>' +
            '<div class="numKey">9</div>' +
            '<div class="numKey">4</div>' +
            '<div class="numKey">5</div>' +
            '<div class="numKey">6</div>' +
            '<div class="numKey">1</div>' +
            '<div class="numKey">2</div>' +
            '<div class="numKey">3</div>' +
            '<div></div>' +
            '<div class="numKey">0</div>' +
            '<div class="deleteKey">←</div>' +
            '</div>' +
            '</div>';
        // 调整组件层级
        showComponet.style.zIndex = "10";
        var numKeyArr = document.getElementsByClassName("numKeyboard")[0].getElementsByClassName("numKey"),
            numKeyArr_length = numKeyArr.length;
        var pwdValDiv = document.getElementsByClassName("pwdInput-item")[0].children;
        var numkeyCount = 0;
        //当前密码
        var currentPwd = [];
        for (var i = 0; i < numKeyArr_length; i++) {
            numKeyArr[i].onclick = function () {
                pwdValDiv[numkeyCount].innerHTML = "<i></i>";
                //获取数字
                var keyText = this.textContent;
                //获取到的值存入数组
                currentPwd.push(keyText);
                if (currentPwd.length === 6) {
                    if (originPassword === currentPwd.join("")) {
                        //调用“移除密码组件”
                        removePasswordComponet();
                        nextPage(2);
                        //设置支付结果页面数据
                        var payee_2 = document.getElementById("payee_2");
                        payee_2.textContent = payObj.name;
                        document.getElementById("payMoneyTotal").textContent = payObj.money;
                    } else {
                        var erroMesg = document.getElementsByClassName("erroMesg")[0];
                        erroMesg.textContent = "您的密码输入错误";
                        return;
                    }

                }
                numkeyCount++;
            }
        }
        //删除密码点击事件
        var deleteKey = document.getElementsByClassName("deleteKey")[0];
        deleteKey.onclick = function () {
            if (numkeyCount === 0) {
                return;
            }
            numkeyCount--;
            currentPwd.pop();
            pwdValDiv[currentPwd.length].innerHTML = "";
            var erroMesg = document.getElementsByClassName("erroMesg")[0];
            erroMesg.textContent = "";
        }

        //关闭按钮
        var closePwdComponet = document.getElementsByClassName("closePwdComponet")[0];
        closePwdComponet.onclick = function () {
            removePasswordComponet();
        }


    }
}


/**
 * 功能：移除密码组件（必须在密码框出现后调用）
 **/
function removePasswordComponet() {
    var componet = document.getElementsByTagName("componet")[0];
    componet.style.zIndex = "-1";
    componet.innerHTML = "";
}
