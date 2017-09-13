var shop1 = {
        orderNumber: "taobao-001",
        commodityName: "单反",
        sendTime: "2016-11-11",
        receiveTime: "2016-11-16",
        consignee: "皮卡丘",
        details: "查看"
    },
    shop2 = {
        orderNumber: "taobao-002",
        commodityName: "手机",
        sendTime: "2016-11-11",
        receiveTime: "2016-11-18",
        consignee: "柯南",
        details: "查看"
    },
    shop3 = {
        orderNumber: "taobao-003",
        commodityName: "书籍",
        sendTime: "2016-11-11",
        receiveTime: "2016-11-18",
        consignee: "鸣人",
        details: "查看"
    },
    shop4 = {
        orderNumber: "taobao-004",
        commodityName: "茶杯",
        sendTime: "2016-11-11",
        receiveTime: "2016-11-19",
        consignee: "路飞",
        details: "查看"
    },
    shop5 = {
        orderNumber: "taobao-005",
        commodityName: "电脑",
        sendTime: "2016-11-11",
        receiveTime: "2016-11-21",
        consignee: "悟空",
        details: "查看"
    },
    shop6 = {
        orderNumber: "taobao-006",
        commodityName: "衣服",
        sendTime: "2016-11-11",
        receiveTime: "2016-11-23",
        consignee: "黑崎一护",
        details: "查看"
    };
var shopData = [shop1, shop2, shop3, shop4, shop5, shop6];

var exclude = document.getElementById("exclude"),
    excludeCondition = document.getElementById("excludeCondition"),
    search = document.getElementById("search"),
    searchCondition = document.getElementById("searchCondition"),
    tbody = document.getElementsByTagName("tbody")[0],
    showState = false;
exclude.onmousedown = function () {
    this.style.backgroundColor = "#fda33b";
}
search.onmousedown = function () {
    this.style.backgroundColor = "#fda33b";
}
exclude.onmouseup = function () {
    this.style.backgroundColor = "#ff8900";
}
search.onmouseup = function () {
    this.style.backgroundColor = "#ff8900";
}
exclude.onclick = function () {
    tbody.innerHTML = "";
    var eVal = excludeCondition.value;
    var show_Data = [];
    var showState = false;
    //没有输入东西时输错所有
    if (eVal === "") {
        showData(shopData);
    } else {
        showData(select(eVal, false));
    }
}
search.onclick = function () {
    tbody.innerHTML = "";
    var show_Data = [];
    var sVal = searchCondition.value;
    if (sVal === "") {
        showData(shopData);
    } else {

        showData(select(sVal, true));
    }
}
//渲染表格
function showData(shopData) {
    for (var i in shopData) {
        tbody.innerHTML += "<tr></tr>";
        var tbody_tr = tbody.getElementsByTagName("tr");
        var newTr = tbody_tr[tbody_tr.length - 1];
        if (typeof (shopData[i]) === "object") {
            var str = "";
            for (var j in shopData[i]) {
                str += "<td>" + shopData[i][j] + "</td>"
            }
            newTr.innerHTML = str;
        }
    }

}
//
//true为查询false为排除
function select(val, control) {
    var show_Data = []
    for (var i in shopData) {
        if (typeof (shopData[i]) === "object") {
            showState = false;
            for (var j in shopData[i]) {
                if (shopData[i][j] === val) {
                    showState = true;
                    break;
                }
            }
        }
        if (showState == control) {
            show_Data.push(shopData[i]);
        }
    }
    return show_Data;
}
