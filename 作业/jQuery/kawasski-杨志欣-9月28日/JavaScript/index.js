/**************************************
 *   开发者：杨志欣
 *   功能：轮播
 *   最后更改日期 2017/9/28
 **************************************/
// 初始化
$(function(){
    var $img=$(".banner img");
    var index=1;
    setInterval(function(){
        if(index==4){
            index=0;
        }
        var $thisImg=$img.eq(index);
        $thisImg.addClass("show").siblings().removeClass("show");
        index++;
    },4000);
})