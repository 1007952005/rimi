/**
 * 功能：弹出框构造函数
 * 最后修改日期：2017-8-30
 * 参数：
 * type：弹出框种类：load为加载 dialog为对话框
 * textContent：dialog对话框的内容
 * callBack：点击dialog对话框的回调函数
 **/
function Dialog(param) {
    this.initDialog = function () {
        //创建插件
        var dialog = document.createElement("dialog-plugin");
        if (param.type === "load") {
            createLoad(dialog);
        } else if (param.type === "dialog") {
            createDialog(dialog);
        }
    }

    /**
     *   功能：创建加载页面
     *   参数：ident插件元素
     **/
    function createLoad(ident) {
        ident.innerHTML = '<div class="spinner">' +
            '<div class="rect1"></div>' +
            '<div class="rect2"></div>' +
            '<div class="rect3"></div>' +
            '<div class="rect4"></div>' +
            '<div class="rect5"></div>' +
            '</div>';
        //渲染插件
        document.body.appendChild(ident);
    }
    //创建加载页面
    function createDialog(ident) {
        ident.innerHTML = '<dialog-content>' +
            '<dialog-body>' + param.textContent +
            '</dialog-body>' +
            '<dialog-control>' +
            '<button id="dialogConfirm" class="dialogBtn" type="button">确定</button>' +
            '<button id="dialogCancel" class="dialogBtn" type="button">取消</button>' +
            '</dialog-control>' +
            '</dialog-content>';
        //渲染插件
        document.body.appendChild(ident);
        var dialogConfirm = document.getElementById("dialogConfirm"),
            dialogCancel = document.getElementById("dialogCancel");
        dialogConfirm.onclick = function () {
            //调用回调函数
            param.callBack();
            ident.remove();

        }
        dialogCancel.onclick = function () {
            //找到插件并且移除
            ident.remove();
            //this.parentElement.parentElement.parentElement.remove();
        }
    }
    //移除插件
    this.removeDialog = function () {
        var dialog = document.getElementsByTagName("dialog-plugin")[0];
        dialog.remove();
    }
}
