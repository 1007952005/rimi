//将html代码转为可以在浏览器中看到的代码
var textCode = document.getElementById("textCode"),
    textCode_HTML = textCode.innerHTML;
textCode_HTML = textCode_HTML.replace(/</g, "&lt;");
textCode_HTML = textCode_HTML.replace(/>/g, "&gt;");
//为了保存换行符和插入标签转出为数组
//var textCodeArr = textCode_HTML.split("");
//获取标签正则表达式
var tagRegx = /&lt;\/?.*?&gt;/g;
var tagArr = textCode_HTML.match(tagRegx);
var noRepeatTagArr=[];



while(tagArr.length){
    var item=tagArr.shift();
    if(noRepeatTagArr.indexOf(item)===-1){
        noRepeatTagArr.push(item);
    }
}
var noRepeatTagArr_length=noRepeatTagArr.length;
for(var i=0;i<noRepeatTagArr_length;i++){
    textCode_HTML=textCode_HTML.replace(new RegExp(noRepeatTagArr[i],"g"),'<span style="color:#f76d6c">' + noRepeatTagArr[i] + '</span>');
}

//获取标签属性正则表达式
var attrRegx=/\s[a-z\-]+?=/g;
var attrArr=textCode_HTML.match(attrRegx);
var noRepeatAttrArr=[];
while(attrArr.length){
    var item=attrArr.shift();
    if(noRepeatAttrArr.indexOf(item)===-1&&item!==" style="){
        noRepeatAttrArr.push(item);
    }
}
var noRepeatAttrArr_length=noRepeatAttrArr.length;
for(var i=0;i<noRepeatAttrArr_length;i++){
    textCode_HTML=textCode_HTML.replace(new RegExp(noRepeatAttrArr[i],"g"),'<span style="color:#8bd12e">' + noRepeatAttrArr[i] + '</span>');
}

//获取标签属性值正则表达式
var valRegx=/"[\w\-_]+?"/g;
var valArr=textCode_HTML.match(valRegx);
var noRepeatValArr=[];
while(valArr.length){
    var item=valArr.shift();
    if(noRepeatValArr.indexOf(item)===-1){
        noRepeatValArr.push(item);
    }
}


var noRepeatValArr_length=noRepeatValArr.length;
for(var i=0;i<noRepeatValArr_length;i++){
    textCode_HTML=textCode_HTML.replace(new RegExp(noRepeatValArr[i],"g"),'<span style="color:#ece077">' + noRepeatValArr[i] + '</span>');
}

console.log(textCode_HTML);
textCode.innerHTML=textCode_HTML;

/*另个方法没有实现*/
////标签<>或</>的正则表达式,且保留 空格（包括制表符、空格符、断行符等）
//var labelReg = /\s*?&lt;\/?\s*?.*?\s*?&gt;/g;

////标签<>或</>的正则表达式
//var labelReg = /&lt;\/?.*?&gt;/g
//var textCodeArr = textCode_HTML.match(labelReg);
//for (var i = 0; i < textCodeArr.length; i++) {
//    //字符串
//    var labelStr = textCodeArr[i],
//        //标签<>或</>的正则表达式
//        labelRegS = /&lt;\/?.*?&gt;/g,
//        //字符串转化数组添加元素
//        labelArr = labelStr.split(""),
//        resLable = labelRegS.exec(labelStr),
//        //数组插入的位置
//        start = resLable.index,
//        end = labelRegS.lastIndex + 1;
//    labelArr.splice(start, 0, '<span style="color:#f76d6c;">');
//    labelArr.splice(end, 0, '</span>');
//    textCodeArr[i] = labelArr.join("");
//    console.log(textCodeArr[i]);
//    console.log(textCodeArr);
//}
//textCode.innerHTML = textCodeArr.join("");
//
//////记录所加的标签个数用于后面的数组下标，因为正则表达式匹配的是字符串，添加则是数组
////var count = 0;
////while (true) {
////    var res = labelReg.exec(textCode_HTML);
////    console.log(res);
////    //匹配完成退出
////    if (res === null) {
////        break;
////    }
////    //数组插入的位置
////    var start = res.index + count;
////    var end = labelReg.lastIndex + 1 + count;
////    textCodeArr.splice(start, 0, '<span style="color:#f76d6c;">');
////    textCodeArr.splice(end, 0, '</span>');
////    //
////    count += 2;
////}
//////把添加完标签的数组变成字符串并且在浏览器中显示
////textCode.innerHTML = textCodeArr.join("");
