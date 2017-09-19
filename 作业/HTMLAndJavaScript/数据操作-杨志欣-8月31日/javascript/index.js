//初始化
window.onload = function () {
    var addBtn = document.getElementById("addBtn"),
        delBtn = document.getElementById("delBtn"),
        checkboxMain = document.getElementById("checkboxMain"),
        tbody = document.getElementsByTagName("tbody")[0],
        count = 0;
    //复制数据
    copyObj(goodsData);
    //加载数据按钮事件
    addBtn.onclick = function () {
        //调用对话框插件
        var dialog = new Dialog({
            type: "load"
        });
        //渲染插件
        dialog.initDialog();
        //删除插件
        setTimeout(dialog.removeDialog, 1300);
        setTimeout(function () {
            //更新数据绑定删除事件
            upData(tbody, goodsData);
            //数据复选框事件绑定
            dataCheckBoxStatusSet();
            //删除按钮绑定事件
            delDataEventBind();
            //排序事件绑定
            sortIconEventBind();
            //设置复选框
            count = 0;
            checkboxMain.indeterminate = false;
            checkboxMain.checked = false;
            //主复选框设置有效
            checkboxMain.removeAttribute("disabled");
            checkboxMain.style.cursor = "pointer";


        }, 1300);



    }
    //删除选中按钮项事件
    delBtn.onclick = function () {
        var dialog;
        var isCheck = checkboxMain.checked;
        var sortIcon = document.getElementsByClassName("sortIcon"),
            sortIcon_length = sortIcon.length;
        //排序图标初始
        for (var i = 1; i < sortIcon_length; i++) {
            sortIcon[i].style.cssText = "transform: rotateZ(0deg);";
        }
        //如果主复选框选中且有效时
        if (isCheck) {
            dialog = new Dialog({
                type: "dialog",
                textContent: "您确定要删除全部吗？",
                callBack: function () {
                    testGoodsData = [];
                    upData(tbody, testGoodsData);
                    checkboxMain.indeterminate = false;
                    checkboxMain.checked = false;
                    checkboxMain.disabled = "disabled";
                    checkboxMain.style.cursor = "not-allowed";
                    count = 0;
                }
            });
            dialog.initDialog();

        } else {
            dialog = new Dialog({
                type: "dialog",
                textContent: "您确定要删除选中项吗？",
                callBack: function () {
                    var checkbox = document.getElementsByClassName("checkbox"),
                        checkbox_length = checkbox.length;
                    var deleteArr = [],
                        deleteDataArr = [];
                    //将要删除的Element添加到新数组
                    for (var i = 0; i < checkbox_length; i++) {
                        if (checkbox[i].checked) {
                            deleteArr.push(checkbox[i]);
                            deleteDataArr.push(testGoodsData[i]);
                        }
                    }

                    //删除元素
                    var deleteArr_length = deleteArr.length;
                    for (var j = 0; j < deleteArr_length; j++) {
                        //删除第一项数组应为删除后会刷新deleteItem
                        deleteArr[j].parentElement.parentElement.remove();
                    }
                    //删除数据
                    while (deleteDataArr.length) {
                        var data = deleteDataArr.pop();
                        testGoodsData.splice(testGoodsData.indexOf(data), 1);
                    }
                    //复选框设置
                    count = 0;
                    checkboxMain.indeterminate = false;
                    checkboxMain.checked = false;

                }


            });
            dialog.initDialog();


        }

    }

    //设置没有数据时主复选按钮失效
    checkboxMain.disabled = "disabled";
    checkboxMain.style.cursor = "not-allowed";
    //主复选按钮事件
    checkboxMain.onchange = function () {
        var checkedbox = document.getElementsByClassName("checkbox");
        checkedbox_length = checkedbox.length;
        //主复选按钮选中时全选
        if (checkboxMain.checked) {
            for (var i = 0; i < checkedbox_length; i++) {
                if (!checkedbox[i].checked) {
                    checkedbox[i].checked = true;
                }
            }
            count = checkedbox_length;
        }
        //主复选按钮未选中时全不选
        else {
            for (var i = 0; i < checkedbox_length; i++) {
                if (checkedbox[i].checked) {
                    checkedbox[i].checked = false;
                }
            }
            count = 0;
        }


    }


    /**
     *  功能：数据复选框状态设置
     *  参数：无
     **/
    function dataCheckBoxStatusSet() {
        var checkBox = document.getElementsByClassName("checkbox"),
            checkboxMain = document.getElementById("checkboxMain"),
            checkBox_length = checkBox.length;
        //计数器
        for (var i = 0; i < checkBox_length; i++) {
            checkBox[i].onchange = function () {
                if (this.checked) {
                    count++;
                    if (count === checkBox.length) {
                        checkboxMain.checked = true;
                        checkboxMain.indeterminate = false;
                    } else if (count === 1) {
                        checkboxMain.checked = false;
                        checkboxMain.indeterminate = true;
                    }
                } else {
                    count--;
                    if (count === 0) {
                        checkboxMain.checked = false;
                        checkboxMain.indeterminate = false;
                    } else
                    if (count === checkBox.length - 1) {
                        checkboxMain.checked = false;
                        checkboxMain.indeterminate = true;
                    }
                }
            }

        }

    }

    /**
     *  功能：排序事件绑定
     *  参数：item:要排序的项; Sortstatus ：1为升序、2为降序;
     **/
    function sortIconEventBind() {
        var sortIcon = document.getElementsByClassName("sortIcon"),

            sortIcon_length = sortIcon.length,
            //每个项排序的标记用于升序还是降序：0不做操作、1是升序、2是降序
            goodsId = 0,
            manufactureDate = 0,
            purchaseDate = 0,
            goodsPrice = 0;
        //排序图标初始
        for (var i = 1; i < sortIcon_length; i++) {
            sortIcon[i].style.cssText = "transform: rotateZ(0deg);";
        }
        //货号排序
        sortIcon[0].onclick = function () {
            //其他图标复原
            for (var i = 0; i < sortIcon_length; i++) {
                if (i === 0) {
                    continue;
                } else {
                    sortIcon[i].style.cssText = "transform: rotateZ(0deg);";

                }
            }
            //设置其他排序
            manufactureDate = 0;
            purchaseDate = 0;
            goodsPrice = 0;
            //如果上次事件是该项没有排序或者降序那么就去升序
            if (goodsId === 0 || goodsId === 2) {
                sortData("goodsId", 1);
                this.style.cssText = "transform: rotateZ(90deg);";
                goodsId = 1;
            } else {
                sortData("goodsId", 2);
                this.style.cssText = "transform: rotateZ(-90deg);";
                goodsId = 2;
            }
        }
        //生产日期排序
        sortIcon[1].onclick = function () {
            for (var i = 0; i < sortIcon_length; i++) {
                if (i === 1) {
                    continue;
                } else {
                    sortIcon[i].style.cssText = "transform: rotateZ(0deg);";

                }
            }
            //设置其他排序
            goodsId = 0;
            purchaseDate = 0;
            goodsPrice = 0;
            //如果上次事件是该项没有排序或者降序那么就去升序
            if (manufactureDate === 0 || manufactureDate === 2) {
                sortData("manufactureDate", 1);
                this.style.cssText = "transform: rotateZ(90deg);";
                manufactureDate = 1;
            } else {
                sortData("manufactureDate", 2);
                this.style.cssText = "transform: rotateZ(-90deg);";
                manufactureDate = 2;
            }
        }
        //进货日期排序
        sortIcon[2].onclick = function () {
            for (var i = 0; i < sortIcon_length; i++) {
                if (i === 2) {
                    continue;
                } else {
                    sortIcon[i].style.cssText = "transform: rotateZ(0deg);";

                }
            }
            //设置其他排序
            goodsId = 0;
            manufactureDate = 0;
            goodsPrice = 0;
            //如果上次事件是该项没有排序或者降序那么就去升序
            if (purchaseDate === 0 || purchaseDate === 2) {
                sortData("purchaseDate", 1);
                this.style.cssText = "transform: rotateZ(90deg);";
                purchaseDate = 1;
            } else {
                sortData("purchaseDate", 2);
                this.style.cssText = "transform: rotateZ(-90deg);";
                purchaseDate = 2;
            }
        }
        //售价排序
        sortIcon[3].onclick = function () {
            for (var i = 0; i < sortIcon_length; i++) {
                if (i === 3) {
                    continue;
                } else {
                    sortIcon[i].style.cssText = "transform: rotateZ(0deg);";

                }
            }
            //设置其他排序
            goodsId = 0;
            manufactureDate = 0;
            purchaseDate = 0;
            //如果上次事件是该项没有排序或者降序那么就去升序
            if (goodsPrice === 0 || goodsPrice === 2) {
                sortData("goodsPrice", 1);
                this.style.cssText = "transform: rotateZ(90deg);";
                goodsPrice = 1;
            } else {
                sortData("goodsPrice", 2);
                this.style.cssText = "transform: rotateZ(-90deg);";
                goodsPrice = 2;
            }
        }
    }

    /**
     *  功能：数据删除事件绑定
     *  参数：item:要排序的项; Sortstatus ：1为升序、2为降序;
     **/
    function sortData(item, Sortstatus) {
        switch (item) {
            case "goodsId":
                if (Sortstatus === 1) {
                    testGoodsData = testGoodsData.sort(function (e1, e2) {
                        var num1 = e1.id.match(/\d+/),
                            num2 = e2.id.match(/\d+/);
                        console.log(num1);
                        return num1 - num2;
                    });

                } else {
                    testGoodsData = testGoodsData.sort(function (e1, e2) {
                        var num1 = e1.id.match(/\d+/),
                            num2 = e2.id.match(/\d+/);
                        return num2 - num1;
                    });
                }
                upData(tbody, testGoodsData);
                break;
            case "manufactureDate":
                if (Sortstatus === 1) {
                    testGoodsData = testGoodsData.sort(function (e1, e2) {
                        var date1 = new Date(e1.manufactureDate),
                            date2 = new Date(e2.manufactureDate);
                        return date1 - date2;
                    });

                } else {
                    testGoodsData = testGoodsData.sort(function (e1, e2) {
                        var date1 = new Date(e1.manufactureDate),
                            date2 = new Date(e2.manufactureDate);
                        return date2 - date1;
                    });
                }
                upData(tbody, testGoodsData);
                break;
            case "purchaseDate":
                if (Sortstatus === 1) {
                    testGoodsData = testGoodsData.sort(function (e1, e2) {
                        var date1 = new Date(e1.purchaseDate),
                            date2 = new Date(e2.purchaseDate);
                        return date1 - date2;
                    });

                } else {
                    testGoodsData = testGoodsData.sort(function (e1, e2) {
                        var date1 = new Date(e1.purchaseDate),
                            date2 = new Date(e2.purchaseDate);
                        return date2 - date1;
                    });
                }
                upData(tbody, testGoodsData);
                break;
            case "goodsPrice":
                if (Sortstatus === 1) {
                    testGoodsData = testGoodsData.sort(function (e1, e2) {
                        return e1.price - e2.price;
                    });

                } else {
                    testGoodsData = testGoodsData.sort(function (e1, e2) {
                        return e2.price - e1.price;
                    });
                }
                upData(tbody, testGoodsData);
                break;
            default:
                break;
        }
    }

}
/**
 *  功能：复制数据
 *  参数：数据
 **/
function copyObj(data) {
    data.forEach(function (item) {
        var newItem = {};
        for (var x in item) {
            newItem[x] = item[x];
        }
        testGoodsData.push(newItem);
    });
}

/**
 *  功能：更新数据到表格
 *  参数：ident更新所在的元素节点、data更新时的数据
 **/
function upData(ident, data) {
    var data_length = data.length,
        str = "";
    for (var i = 0; i < data_length; i++) {
        str += '<tr>' +
            '<td class="checkboxItem"><input class="checkbox" type=checkbox></td>' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].name + '</td>' +
            '<td>' + data[i].manufactureDate + '</td>' +
            '<td>' + data[i].purchaseDate + '</td>' +
            '<td>' + data[i].qualityDate + '</td>' +
            '<td>￥' + data[i].price.toFixed(2) + '</td>' +
            '<td>' +
            '<a class="details">查看</a>' +
            '<a class="delete">删除</a>' +
            '</td>' +
            '</tr>';
    }
    ident.innerHTML = str;
}

/**
 *  功能：数据删除事件绑定
 *  参数：无
 **/
function delDataEventBind() {
    var deleteData = document.getElementsByClassName("delete"),
        deleteData_length = deleteData.length;
    for (var i = 0; i < deleteData_length; i++) {
        deleteData[i].obj = testGoodsData[i];
        deleteData[i].onclick = function () {
            var that = this;

            var dialog = new Dialog({
                type: "dialog",
                textContent: "您确定要删除吗？",
                callBack: function () {

                    var testGoodsData_length = testGoodsData.length;
                    //删除数据
                    for (var i = 0; i < testGoodsData_length; i++) {
                        if (that.obj === testGoodsData[i]) {
                            testGoodsData.splice(i, 1);
                        }
                    }
                    //删除行
                    that.parentElement.parentElement.remove();
                    console.log(testGoodsData);

                }
            });
            dialog.initDialog();
        }
    }
}
