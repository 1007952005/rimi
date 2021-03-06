window.onload = function () {
    var $sectionBox = $(".sectionBox"),
        $article = $("article");
    //显示列表
    $("#showList").click(function () {
        $sectionBox.fadeToggle(300);
        //恢复默认值
        $("input").val("");
        $("textarea").val("");
    });
    //添加列表事件
    $("#confirm").click(function () {
        var titleText = $("input").val(),
            textContent = $("textarea").val();
        //列表内容不能为空
        if (titleText == "" || textContent == "") {
            return;
        }
        var str = `<div class="list"><section>
            <h2>${titleText}</h2>
            <p>${textContent}</p>
            <span class="close"></span>
        </section></div>`;
        //添加列表
        $article.append(str);
        //绑定关闭事件
        //        $(".close:last").click(function (event) {
        //            $(this).closest("div").fadeOut(200, function () {
        //                $(this).remove();
        //            })
        //            //阻止事件冒泡防止列表展开事件触发
        //            event.stopPropagation();
        //        });
        //列表展开事件
        //        $(".list:last section").click(function (e) {
        //            //e.stopPropagation();
        //            console.log($(this));
        //            $(this).parent().siblings().find("p").slideUp(300);
        //            $(this).find("p").slideToggle(300);
        //            $(this).css("background-color", "#e8e8e8");
        //
        //        });
        //关闭列表
        $sectionBox.fadeOut(300);
    });
    //事件代理绑定关闭事件
    $("article").on("click", ".close", function (event) {
        //阻止事件冒泡防止列表展开事件触发
        event.stopPropagation();
        $(this).closest("div").fadeOut(200, function () {
            console.log($(this));
            $(this).remove();
        })

    });
    //事件代理绑定展开列表事件
    $("article").on("click", "section", function (e) {
        console.log($(this));
        $(this).parent().siblings().find("p").slideUp(300);
        $(this).find("p").slideToggle(300);
        $(this).css("background-color", "#e8e8e8");

    });
}
