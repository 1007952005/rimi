/**
* 功能：一些公共的功能
* 最后修改日期：2016年6月22日
* 开发人员：全组
**/
/******************************************/
/* 页面加载完成后执行 */
/******************************************/
$(function() {
    // 主题列表--单选按钮效果
    listRadio(".payli li i.radio");
    // 主题列表--复选按钮效果
    listCheckbox(".leftSlipBtnCkbli li i.checkbox");
    // 主题列表--订单列表数量设置
    countListNum(".orderli");
    // 返回上一页
    $(".header > a.goBack").click(function() {
        history.go(-1);
    });
    // 返回主页
    $(".header > a.goHome").click(function() {
        /**** 本地测试使用 ****/
        // 跳转到主页
        location.href="../../index.html";
        /**** 生产环境内使用 ****/
        /*function getRootPath(){
            //获取当前网址
            var curWwwPath=window.document.location.href;
            // 获取主机地址之后的目录
            var pathName=window.document.location.pathname;
            var pos=curWwwPath.indexOf(pathName);
            // 获取主机地址
            var localhostPaht=curWwwPath.substring(0,pos);
            // 获取带"/"的项目名，如：/angel
            //var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
            //return(localhostPaht+projectName);
            return(localhostPaht);
        }
        // 跳转根目录下的index主页
        location.href=location.href=getRootPath()+ "/index.html";*/
    });
    // 点击展开预约时间详细列表
    toggleDetailsList(".toggleDetailsList");



});


/******************************************/
/* 函数定义部分 */
/******************************************/
/**
* 功能：商城菜单 -点击显示隐藏
* 参数：
**/
    function showMenu(){
        var node=$("#menu");
        if(node.is(':hidden')){
            　　node.show(100);
            $(node).children("li").click(function(){
               var isActive = !($(this).hasClass("active"));
               if(isActive){
                $(this).addClass("active")
                $(this).siblings("li").removeClass("active");
                node.hide(100);
            }else{
                node.hide(100);
            }
        })
        }else{
            　　node.hide(100);
        }
    }

/**
* 功能：主题列表--单选按钮 
* 参数：图形单选按钮的选择符
**/
function listRadio(rdoIdent) {
    $(document).off("click", rdoIdent).on("click", rdoIdent, function() {
        // 选中的状态
        var ckd = $(this).hasClass("checked");
        // 如果没有选中
        if(!ckd) {
            // 使其选中
            $(this).addClass("checked").next("input[type='radio']").attr("checked","checked");
            // 消除其它被选中的效果
            $(this).parent("li").siblings().children("i.radio").removeClass("checked").next("input[type='radio']").removeAttr("checked");
        }
        // 如果选中
        else {
            // 目前什么都不做
        }
    });
}
/**
* 功能：主题列表--复选按钮 
* 参数：图形复选按钮的选择符
**/
function listCheckbox(ckbIdent) {
    $(document).off("click", ckbIdent).on("click", ckbIdent, function() {
        // 选中的状态
        var ckd = $(this).hasClass("checked");
        // 如果没有选中
        if(!ckd) {
            // 使其选中
            $(this).addClass("checked").next("input[type='checkbox']").attr("checked","checked");
        }
        // 如果选中
        else {
            // 取消选中
            $(this).removeClass("checked").next("input[type='checkbox']").removeAttr("checked");
        }
    });
}
/**
* 功能：主题列表--向左滑动出现按钮 
* 参数：列表的标志符
**/
function slipBtnLeft(liIdent) {}

/**
* 功能：主题列表--订单列表数量设置
* 参数：列表的标志符
**/
function countListNum(liIdent) {
    /* 点击“-”时 */
    $(document).on("click", liIdent + " .count i:first-child", function() {
        // 获取数量
        var num = parseInt($(this).next().text());
        if(num == "1") {
            $(this).addClass("disabled");
        } 
        else if(num == 0) {
            return;
        }
        num = num - 1;
        $(this).next().text(num);
    });
    /* 点击“+”时 */
    $(document).on("click", liIdent + " .count i:last-child", function() {
        // 获取数量
        var num = parseInt($(this).prev().text());
        if(num == "0") {
            $(this).prevAll("i").removeClass("disabled");
        } 
        num = num + 1;
        $(this).prev().text(num);
    });
}
/**
* 功能：点击按钮显示/隐藏详细列表功能
* 参数：按钮选择符(需定位到和要展开的列表同级)
**/
function toggleDetailsList(btnIdent) {
    $(document).on("click", btnIdent, function() {
        $(btnIdent).parents("ul").next().slideToggle(100);
        // 获取箭头状态
        var isRightArr = !($(btnIdent).find(".arrRight").hasClass("arrDown"));
        if(isRightArr) {
            // 改变箭头为向下状态
            $(btnIdent).find(".arrRight").addClass("arrDown");
        }
        else {
            // 恢复箭头向右的状态
            $(btnIdent).find(".arrRight").removeClass("arrDown");
        }
    });
}
/**
* 功能：屏幕左滑/实现订单删除
* 参数：
**/
function toggleLeftWrapper(lineWrapper,lineScroll,slipBtn,lineNormal){
    // 设定每一行的宽度=屏幕宽度+按钮宽度
    $(lineScroll).width($(lineWrapper).width() + $(slipBtn).width());
    // 设定常规信息区域宽度=屏幕宽度
    $(lineNormal).width($(lineWrapper).width());
    // 获取所有行，对每一行设置监听
    var lines = $(lineWrapper);
    var len = lines.length; 
    var lastX, lastXForMobile;

    // 用于记录被按下的对象
    var pressedObj;  // 当前左滑的对象
    var lastLeftObj; // 上一个左滑的对象

    // 用于记录按下的点
    var start;

    // 网页在移动端运行时的监听
    for (var i = 0; i < len; ++i) {
        lines[i].addEventListener('touchstart', function(e){
            lastXForMobile = e.changedTouches[0].pageX;
            pressedObj = $(this).find(slipBtn); // 记录被按下的对象 

            // 记录开始按下时的点
            var touches = event.touches[0];
            start = { 
                x: touches.pageX, // 横坐标
                y: touches.pageY  // 纵坐标
            };
        });

        lines[i].addEventListener('touchmove',function(e){
            // 计算划动过程中x和y的变化量
            var touches = event.touches[0];
            delta = {
                x: touches.pageX - start.x,
                y: touches.pageY - start.y
            };

            // 横向位移大于纵向位移，阻止纵向滚动
            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                event.preventDefault();
            }
        });

        lines[i].addEventListener('touchend', function(e){
            var diffX = e.changedTouches[0].pageX - lastXForMobile;
            if (diffX < -65) {
                $(pressedObj).animate({right:"0"}, 200); // 左滑
                lastLeftObj && lastLeftObj != pressedObj && 
                    $(lastLeftObj).animate({right:"-65px"}, 200); // 已经左滑状态的按钮右滑
                lastLeftObj = pressedObj; // 记录上一个左滑的对象
            } else if (diffX > 0) {
                $(pressedObj).animate({right:"-65px"}, 200); // 右滑
                lastLeftObj = null; // 清空上一个左滑的对象
            }
        });
    }

    // 网页在PC浏览器中运行时的监听
    for (var i = 0; i < len; ++i) {
        $(lines[i]).bind('mousedown', function(e){
            lastX = e.clientX;
            pressedObj =  $(this).find(".slipBtn_right"); // 记录被按下的对象
        });

        $(lines[i]).bind('mouseup', function(e){
            var diffX = e.clientX - lastX;
            if (diffX < -65) {
                $(pressedObj).animate({right:"0"}, 200); // 左滑
                lastLeftObj && lastLeftObj != pressedObj && 
                    $(lastLeftObj).animate({right:"-65px"}, 200); // 已经左滑状态的按钮右滑
                lastLeftObj = pressedObj; // 记录上一个左滑的对象
            } else if (diffX > 0) {
                $(pressedObj).animate({right:"-65px"}, 200); // 右滑
                lastLeftObj = null; // 清空上一个左滑的对象
            }
        });
    }

}
     /*商品数量添加和减去*/
      function lower(a){
            var s=$(a).next('.num');
            var n=parseInt($(s).text());
            if(n>1){
                $(s).text(n-1);
            }else{
             $(s).text(1); 
         }
      }     
        function add(b){
            var s=$(b).prev('.num');
            var n=parseInt($(s).text());
            if(n>0){
                $(s).text(n+1);
            }else{
             $(s).text(n); 
         }
     }