$(".week>li").on("click", function () {
    var that = $(this);
    var idx = that.index();

    var thisWeather = $(".weather>li").eq(idx);
    thisWeather.addClass("show").siblings().removeClass("show");
    switch (thisWeather.children(":first").text()) {
        case "晴天":
            thisWeather.addClass("sunny");
            that.addClass("sunny").siblings().removeClass();
            break;
        case "小雨":
            thisWeather.addClass("lightRain");
            that.addClass("lightRain").siblings().removeClass();
            break;
        case "中雨":
            thisWeather.addClass("moderateRain");
            that.addClass("moderateRain").siblings().removeClass();
            break;
        case "多云":
            thisWeather.addClass("cloudy");
            that.addClass("cloudy").siblings().removeClass();
            break;
    }
});
