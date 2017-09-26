/**************************************
 *   开发者：杨志欣
 *   功能：备忘录逻辑代码
 *   最后更改日期 2017/9/25
 **************************************/
//存放备忘录信息
var memoData = [];

//初始化
$(function () {
    //列表
    var $memoireList = $("#memoireList"),
        $main = $memoireList.parent(),
        //保存按钮
        $preservation = $(".preservation"),
        //文本编辑框
        $text = $(".text"),
        //返回
        $backMainPage = $(".backMainPage"),
        //编辑/添加的页面
        $memoOperation = $(".memoOperation"),
        //添加按钮
        $addToggle = $(".addToggle"),
        //删除按钮
        $deleteToggle = $(".deleteToggle"),
        //编辑文本框按钮
        $contentEdit = $(".contentEdit"),
        //头部标题
        $title = $(".title"),
        //底部提示
        $footerTitle = $(".footerTitle"),
        //主页面编辑按钮
        $editToggle = $(".editToggle"),
        //主页面取消按钮
        $cancelToggle = $(".cancelToggle"),
        //记录文本框原来的值
        originalVal = "",
        //记录编辑文本内容时的备忘录下标
        memoIndex = -1,
        //记录编辑备忘录列表状态
        isMemoEdit = false;
    //没有数据则编辑按钮失效
    $editToggle.addClass("disabled");
    $editToggle.attr("disabled", "disabled");
    //是否有本地存储
    if (!localStorage.getItem("memoData")) {
        localStorage.setItem("memoData", "[]");
    }
    memoData = JSON.parse(localStorage.getItem("memoData"));
    //本地存储不为空
    if (memoData.length !== 0) {
        $editToggle.removeClass("disabled");
        $editToggle.removeAttr("disabled", "disabled");
        var str = "";

        //加载数据
        $.each(memoData, function (index, ele) {
            str += `<li><div><i class="choice">√</i></div>
                <div  class="memoBox">
                    <p class="memoContent">${ele.textContent}</p>
                    <p class="memoTime">${ele.date}</p>
                </div>
            </li>`;
        });
        $memoireList.html(str);
    }

    //更新个数
    memoCount($footerTitle, memoData.length);


    //跳转添加备忘录
    $addToggle.on("click", function () {
        //设置为不是更改状态
        memoIndex = -1;
        $memoOperation.css("left", "0px");
        //文本框原本值赋值
        originalVal = "";
        $contentEdit.css("display", "none");
        $text.removeAttr("readonly");
        $text.focus();
    });


    //主页面编辑按钮事件
    $editToggle.on("click", function () {
        isMemoEdit = true;
        $title.text("已选中0项");
        $(this).css("display", "none");
        $cancelToggle.css("display", "block");
        $deleteToggle.css("display", "block");
        $addToggle.css("display", "none");
        $memoireList.children().addClass("editstatus");
        $memoireList.off();

    });


    //编辑选中按钮事件
    $main.on("click", "i", function () {
        $(this).toggleClass("selected");
        var count = $(".choice.selected").length;
        $title.text("已选中" + count + "项");
    });


    //主页面编辑取消按钮事件
    $cancelToggle.on("click", function () {
        isMemoEdit = false;
        $title.text("备忘录");
        $(this).css("display", "none");
        $editToggle.css("display", "block");
        $deleteToggle.css("display", "none");
        $addToggle.css("display", "block");
        $memoireList.children().removeClass("editstatus");
        $(".choice").removeClass("selected");
    });


    //删除备忘录事件
    $deleteToggle.on("click", function () {
        //记录删除了多少个
        var count=0;
        //删除数据和列表
        $(".choice").each(function (index,ele) {
            var $this = $(ele);
            if ($this.hasClass("selected")) {
                memoData.splice(index-count, 1);
                $this.closest("li").remove();
                count++;
            }
        });
        memoCount($footerTitle, memoData.length);
        localStorage.setItem("memoData", JSON.stringify(memoData));
        $cancelToggle.click();
        //如果没有数据按钮失效
        if (memoData.length == 0) {
            $editToggle.addClass("disabled");
            $editToggle.attr("disabled", "disabled");
        }

    });

    //返回备忘录
    $backMainPage.on("click", function () {
        $memoOperation.css("left", "100%");
        //时窗口完全关闭时在清空内容
        setTimeout(function () {
            $text.val("");
        }, 300);

    });


    //文本编辑事件改变保存状态
    $text.on("keyup", function () {
        if (originalVal == $(this).val()) {
            $preservation.addClass("disabled");
            $preservation.attr("disabled", "disabled");
            return;
        }
        $preservation.removeClass("disabled");
        $preservation.removeAttr("disabled");
    });


    //保存备忘录
    $preservation.on("click", function () {
        var nowDate = new Date();
        var obj = {
            textContent: $text.val(),
            date: getFormatDate(nowDate)
        };
        //如果是增加备忘录时
        if (memoIndex == -1) {
            memoData.push(obj);
            $memoireList.append(`<li>
                      <div><i class="choice">√</i></div>
                      <div>
                        <p class="memoContent">${obj.textContent}</p>
                        <p class="memoTime">${obj.date}</p>
                      </div>
                    </li>`);
            memoCount($footerTitle, memoData.length);
            $editToggle.removeClass("disabled");
            $editToggle.removeAttr("disabled", "disabled");
        }
        // 更改备忘录
        else {
            //更换对象
            memoData.splice(memoIndex, 1, obj);
            $(".memoContent").eq(memoIndex).text(obj.textContent);
            $(".memoTime").eq(memoIndex).text(obj.date);
        }
        //存储为本地
        localStorage.setItem("memoData", JSON.stringify(memoData));
        $backMainPage.click();

    });


    //每个备忘录的事件绑定
    $main.on("click", "li", function () {
        //当列表不编辑时才触发
        if (!isMemoEdit) {
            //跳转时的初始设置
            var val = memoData[$(this).index()].textContent;
            originalVal = val;
            $text.val(val);
            $text.attr("readonly", "readonly");
            $preservation.addClass("disabled");
            $preservation.attr("disabled");
            $contentEdit.css("display", "block");
            $memoOperation.css("left", "0px");
            memoIndex = $(this).index();
        }
    });


    //内容编辑事件绑定
    $contentEdit.on("click", function () {
        $text.removeAttr("readonly");
        $text.focus();
    });
});

/**
 *  功能：日期格式转化
 *  参数：日期date
 **/
function getFormatDate(date) {
    var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        minute = date.getMinutes();
    //个位数格式转化
    m < 10 ? ("0" + m) : m;
    d < 10 ? ("0" + d) : d;
    h < 10 ? ("0" + h) : h;
    minute < 10 ? "0" + minute : minute;
    return y + "-" + m + "-" + d + " " + h + ":" + minute;
}

/**
 *  功能：统计备忘录个数
 *  参数：数组长度
 **/
function memoCount(ele, count) {

    if (count == 0) {
        ele.text("无备忘录");
    } else {
        ele.text(count + "个备忘录");
    }

}
