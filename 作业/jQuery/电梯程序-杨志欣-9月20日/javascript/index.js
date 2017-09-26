//楼层
const floorCount = 5;

//初始化
$(function () {
    var elevator = $(".elevator");
    //记录上个楼层
    var prevFloor = 5;
    //生成楼层
    var str = "";
    //电梯门
    var elevatorDoor = $(".elevatorDoorL,.elevatorDoorR");
    for (let i = 0; i < floorCount; i++) {
        str += `<div class="floor">
                <div class="elevatorBtnBox">
                    <div class="elevatorBtnUp">↑</div>
                    <div class="elevatorBtnDown">↓</div>
                </div>
                <div class="floorNum">${floorCount-i}
                </div>
            </div>`;
    };
    $(".floorBox").html(str);
    //点击按钮电梯升降
    $(".elevatorBtnUp,.elevatorBtnDown").on("click", function () {
        var $this = $(this)
        //设置按钮颜色
        if (!$this.hasClass("action")) {
            $this.addClass("action");
        }
        var that = $this.closest(".floor"),
            top = that[0].offsetTop,
            newFloor = that.index(),
            speed = Math.abs((prevFloor - newFloor) * 1600);
        if (prevFloor == newFloor) {
            return;
        }

        prevFloor = that.index();
        elevator.animate({
            top: top + "px"
        }, speed, function () {
            elevatorDoor.addClass("toggle").css("animationDelay", speed + "s");
            $this.parent().children().removeClass("action");
            setTimeout(function () {
                elevatorDoor.removeClass("toggle");
            }, 5000);

        });
    });
});
