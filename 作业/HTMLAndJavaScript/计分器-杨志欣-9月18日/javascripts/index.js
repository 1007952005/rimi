//初始化
window.addEventListener("DOMContentLoaded", function () {
    //题目的个数
    var questionCount = 20;
    //总分
    var total = 100;
    createQuestion(questionCount);

    //相关事件绑定
    eventBind(total);
});
/**
 *   功能：加载题目输入框
 *   参数：题目个数
 **/
function createQuestion(count) {
    var inputBox = $('.inputBox')[0],
        str = "";
    for (var i = 0; i < count; i++) {
        str += '<span><label for="inpNum">' + (i + 1) + '、</label><input type="text" class="inpNum"></span>';
    }
    inputBox.innerHTML = str;
}
/**
 *   功能：相关事件绑定
 *   参数：无
 **/
function eventBind(total) {
    var regx = /\D/;
    //绑定输入事件
    $(".inpNum").on("change", function () {
        //输入非数字
        if (regx.test(this.value)) {
            this.value = "";
            return;
        }
        var val = Number(this.value);
        if (val > 5) {
            this.value = "5";
        }
    });
    //分数计算事件
    var calcBtn = $('#button');
    var inpNum = $('.inpNum'),
        totalText = $('#total'),
        //记录焦点
        focusIndex = 0;
    //获取焦点时样式改变
    inpNum.each(function (index, ele) {
        ele.index = index;
        ele.onfocus = function () {
            inpNum[focusIndex].parentElement.classList.remove("action");
            this.parentElement.classList.add("action");
            focusIndex = ele.index;
        }
    });
    //初始焦点
    inpNum[0].focus();
    calcBtn.on('click', function () {
        //记录被减去的分数总和
        var count = 0;
        inpNum.each(function () {
            var val = Number(this.value);
            if (val > 0) {
                count += val;
            }
        });
        totalText.text(total - count);
        focusIndex = 0;
    });
    //清除文本
    var resetBtn = $('#reset');
    resetBtn.on('click', function () {
        totalText.text('');
        inpNum[0].focus();
        focusIndex = 0;
    });
    //键盘事件
    $(window).keyup(function (event) {
        //按上下左右获取相应的焦点如果焦点获取不到还原下标
        switch (event.keyCode) {
            case 13:
                calcBtn.click();
                break;
            case 32:
                resetBtn.click();
                break;
            case 37:
                try {
                    inpNum[focusIndex].parentElement.classList.remove("action");
                    inpNum[--focusIndex].focus();
                } catch (error) {
                    focusIndex++;
                    inpNum[focusIndex].parentElement.classList.add("action");
                }
                break;
            case 38:
                try {
                    inpNum[focusIndex].parentElement.classList.remove("action");
                    focusIndex -= 4;
                    inpNum[focusIndex].focus();
                } catch (error) {
                    focusIndex += 4;
                    inpNum[focusIndex].parentElement.classList.add("action");
                }
                break;
            case 39:
                try {
                    inpNum[focusIndex].parentElement.classList.remove("action");
                    inpNum[++focusIndex].focus();
                } catch (error) {
                    focusIndex--;
                    inpNum[focusIndex].parentElement.classList.add("action");
                }
                break;
            case 40:
                try {
                    inpNum[focusIndex].parentElement.classList.remove("action");
                    focusIndex += 4;
                    inpNum[focusIndex].focus();
                } catch (error) {
                    focusIndex -= 4;
                    inpNum[focusIndex].parentElement.classList.add("action");
                }
                break;
        }
    })
}
