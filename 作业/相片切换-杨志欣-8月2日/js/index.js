var showImg = document.getElementsByClassName("showImg-i")[0];
var tabImgList = document.getElementsByClassName("tabImg-i");

for (var i = 0; i < tabImgList.length; i++) {
    console.log(tabImgList[i].src);
    tabImgList[i].onclick = function () {
        var thisSrc = this.src;
        showImg.src = thisSrc;
    }
}
