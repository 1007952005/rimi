var box = document.getElementById('box'),
    banner = document.getElementsByClassName('banner')[0],
    banner_img = banner.getElementsByTagName('img')[0]; 

//获取下方点击区域
var ctrl = document.getElementsByClassName('banner-ctrl')[0],li = ctrl.getElementsByTagName('li');

/*窗口大小 banner大小 li大小*/
var win_h = document.body.clientHeight,
    li_w = li[0].offsetWidth,
    li_h = li_w;
/*窗口大小发生变化时执行函数*/
window.onresize = function(){
    resizeLi();
    resizeBanner();
}
/*设置banner大小*/
function resizeBanner(){
    win_h = document.body.clientHeight;
    banner.style.height = win_h * 0.8 + 'px';
    if(box.offsetWidth > win_h / 3 * 4){
        box.style.maxWidth = win_h / 3 * 4 + 'px';
        box.style.margin = '15px auto';
    }
}
resizeBanner();
/*重新设置li大小*/
function resizeLi(){
    li_h = li_w = li[0].offsetWidth;
    for(var i = 0;i < li.length; i++){
        li[i].style.height = li_h + 'px';
    }
}
resizeLi();
/*点击缩略图切换banner*/
function tabImg(o){
    banner_img.src = o.getElementsByTagName('img')[0].src;
}

/*添加点击事件*/
for(var i = 0;i < li.length; i++){
    li[i].onclick = function(){
        tabImg(this);
    }
}