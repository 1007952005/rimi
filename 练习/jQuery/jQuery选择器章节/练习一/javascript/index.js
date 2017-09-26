$(".leftNavMenu>ul>li").on("click", function () {
    $(this).addClass("checked").siblings().removeClass("checked");
});
