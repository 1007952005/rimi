var classLi = document.getElementById("classLi");



loadNav();






function loadNav() {
    var strClassify = "",
        nav2_width = 265,
        nav2_col = 0;

    for (var i in goodsData) {
        strClassify += "<li class=\"nav1-item\"><a href=\"#\">" + goodsData[i].classify + "<i class=\"fa fa-angle-right fa-2x\"></i></a><div class=\"nav-2\"></div></li>";


    }
    classLi.innerHTML = strClassify;
    var nav2 = document.getElementsByClassName("nav-2");
    for (var j = 0; j < nav2.length; j++) {
        nav2_col = 0
        for (var k = 0; k < goodsData[j].goods.length; k++) {
            if (k % 6 == 0) {
                nav2[j].innerHTML += "<ul></ul>";
                var nav2_ul = nav2[j].getElementsByTagName("ul"),
                    newNav2_ul = nav2_ul[nav2_ul.length - 1];
                nav2_col++;
            }
            newNav2_ul.innerHTML += '<li><a href="#"><img src="' + goodsData[j].goods[k].imgURL + '"><span>' + goodsData[j].goods[k].goodsName + '</span></a><a class="checkShop" href="#">选购</a></li>';
            if (goodsData[j].goods[k].shop === 0) {
                var checkShop = nav2[j].getElementsByClassName("checkShop")[k];
                checkShop.style.display = "none";
            }



        }
        if (nav2_col == 1) {
            nav2[j].style.width = nav2_width + "px";
        } else {
            nav2[j].style.width = nav2_col * nav2_width + "px";
        }
    }
}
