/**
* 功能：筛选数据功能
**/
/**** 全局变量对象命名法 ****/
var logisEle = {
    // 排除按钮
    filterBtn: document.getElementById("filterData"),
    // 搜索按钮
    searchBtn: document.getElementById("searchData"),
    // 排除数据输入框的值
    filterVal: document.getElementById("filterVal"),
    // 搜索数据输入框的值
    searchVal: document.getElementById("searchVal")
}
/* 定义一个数据对象 */
var loginsInfo = {
    orderNum: ["tabao-001","tabao-002","tabao-003","tabao-004","tabao-005","tabao-006"],
    goodsName: ["单反","手机","书籍","茶杯","电脑","衣服"],
    beginDete: ["2016-11-11","2016-11-11","2016-11-11","2016-11-11","2016-11-11","2016-11-11"],
    endDete: ["2016-11-16","2016-11-18","2016-11-18","2016-11-19","2016-11-21","2016-11-23"],
    consignee: ["皮卡丘","柯南","鸣人","路飞","悟空","黑崎一护"],
    describe: ["查看","查看","查看","查看","查看","查看"]
}
/**** 函数事件触发 ****/
/* 筛选排除数据 */
logisEle.filterBtn.onclick = function() {
    // 点击触发函数
    filterData();
}
/* 搜索指定数据 */
logisEle.searchBtn.onclick = function() {
    // 点击触发函数
    searchData();
}

// 置空搜索框内的内容
logisEle.filterVal.onfocus = function() {
    logisEle.searchVal.value = "";
}
// 置空排除框内的内容
logisEle.searchVal.onfocus = function() {
    logisEle.filterVal.value = "";
}

/**
* 功能：排除筛选结果输出
**/
function filterData() {
        // 获取排除输入框的值
    var filterVal = document.getElementById("filterVal").value,
        // 获取数组长度
        loginsInfo_data_len = loginsInfo.orderNum.length,
        // 物流信息表格内容
        tableCont = document.getElementById("logisInfoTable").getElementsByTagName("tbody")[0];
    // 置空表格内容
    tableCont.innerHTML = "";
    
    // 置空搜索框内的内容
    logisEle.filterVal.value = "";
    
    // 执行数组长度的循环
    for(var i = 0; i < loginsInfo_data_len; i++) {
        // 将用户输入的值和每一列的值进行对比
        if(!(filterVal == loginsInfo.orderNum[i] ||
        filterVal == loginsInfo.goodsName[i] ||
        filterVal == loginsInfo.beginDete[i] ||
        filterVal == loginsInfo.endDete[i] ||
        filterVal == loginsInfo.consignee[i] ||
        filterVal == loginsInfo.describe[i])) {
            tableCont.innerHTML += '<tr><td>' +
            loginsInfo.orderNum[i] + '</td><td>' +
            loginsInfo.goodsName[i] + '</td><td>' +
            loginsInfo.beginDete[i] + '</td><td>' +
            loginsInfo.endDete[i] + '</td><td>' +
            loginsInfo.consignee[i] + '</td><td><a href="pages/detailsData.html" target="_blank">' +
            loginsInfo.describe[i] + '</a></td></tr>';
        }
    }
}

/**
* 功能：搜索结果输出指定行
**/
function searchData() {
        // 获取排除输入框的值
    var filterVal = document.getElementById("searchVal").value,
        // 获取数组长度
        loginsInfo_data_len = loginsInfo.orderNum.length,
        // 物流信息表格内容
        tableCont = document.getElementById("logisInfoTable").getElementsByTagName("tbody")[0];
    // 置空表格内容
    tableCont.innerHTML = "";
    
    // 置空排除框内的内容
    logisEle.searchVal.value = "";
    
    // 执行数组长度的循环
    for(var i = 0; i < loginsInfo_data_len; i++) {
        // 将用户输入的值和每一列的值进行对比
        if(filterVal == loginsInfo.orderNum[i] ||
        filterVal == loginsInfo.goodsName[i] ||
        filterVal == loginsInfo.beginDete[i] ||
        filterVal == loginsInfo.endDete[i] ||
        filterVal == loginsInfo.consignee[i] ||
        filterVal == loginsInfo.describe[i]) {
            // 一旦发现有相同的值就将该行内容输出
            tableCont.innerHTML += '<tr><td>' +
            loginsInfo.orderNum[i] + '</td><td>' +
            loginsInfo.goodsName[i] + '</td><td>' +
            loginsInfo.beginDete[i] + '</td><td>' +
            loginsInfo.endDete[i] + '</td><td>' +
            loginsInfo.consignee[i] + '</td><td><a href="pages/detailsData.html" target="_blank">' +
            loginsInfo.describe[i] +
            '</a></td></tr>';
        }
    }
}























