/**
 * 功能：图片切换
 * 日期：2017-8-2
 **/
// 控制缩略图按钮
var tabImg_1 = document.getElementById("tabImg-1"),
	tabImg_2 = document.getElementById("tabImg-2"),
	tabImg_3 = document.getElementById("tabImg-3"),
	tabImg_4 = document.getElementById("tabImg-4");
// 需要显示的图片
var showImg = document.getElementById("showImg");

tabImg_1.onclick = function() {
	var thisSrc = this.src;
	showImg.src = thisSrc;
}
tabImg_2.onclick = function() {
	var thisSrc = this.src;
	showImg.src = thisSrc;
}
tabImg_3.onclick = function() {
	var thisSrc = this.src;
	showImg.src = thisSrc;
}
tabImg_4.onclick = function() {
	var thisSrc = this.src;
	showImg.src = thisSrc;
}

/*// 需要显示的图片
var showImg = document.getElementById("showImg");
// 切换图片按钮的DIV
var tabDiv = document.getElementById("tabPhoto"),
	// 切换图片按钮组
	tabImgList = tabDiv.children,
	// 获取图片按钮的个数
	tabImgList_length = tabImgList.length;

for(var i = 0; i < tabImgList_length; i++) {
	tabImgList[i].onclick = function() {
		var thisSrc = this.src;
		showImg.src = thisSrc;
	}
}*/











