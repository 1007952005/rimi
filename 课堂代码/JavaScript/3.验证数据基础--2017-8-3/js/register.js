/**
 * 功能：数据验证基础
 * 日期：2017-8-3
 **/
// 表单输入内容
var email = document.getElementById("email"), emailStatus = false,
	nicename = document.getElementById("nicename"), nicenameStatus = false,
	pwd = document.getElementById("pwd"), pwdStatus = false,
	repwd = document.getElementById("repwd"), repwdStatus = false,
	tel = document.getElementById("tel"), telStatus = false,
	birthday = document.getElementById("birthday"), birthdayStatus = false,
	profession = document.getElementById("profession"), professionStatus = false,
	// 两次密码的一致性
	uniformity = false;

// 注册按钮
var signUp = document.getElementById("signUp");

// 邮箱（失去焦点）
email.onblur = function() {
	// 调用“输入框失去焦点验证”函数
	emailStatus = blurHandle(this, "请填写邮箱");
}
// 邮箱（键盘松开）
email.onkeyup = function() {
	emailStatus = blurHandle(this, "请填写邮箱");
}

// 昵称（失去焦点）
nicename.onblur = function() {
	nicenameStatus = blurHandle(this, "请填写昵称");
}
// 昵称（键盘松开）
nicename.onkeyup = function() {
	nicenameStatus = blurHandle(this, "请填写昵称");
}

// 密码（失去焦点）
pwd.onblur = function() {
	pwdStatus = blurHandle(this, "请填写密码");
	// 调用“两次密码一致性核对”函数
	checkUniformity(this);
}
// 密码（键盘松开）
pwd.onkeyup = function() {
	pwdStatus = blurHandle(this, "请填写密码");
}

// 确认密码（失去焦点）
repwd.onblur = function() {
	repwdStatus = blurHandle(this, "请确认一次密码");
	checkUniformity(this);
}
// 确认密码（键盘松开）
repwd.onkeyup = function() {
	repwdStatus = blurHandle(this, "请确认一次密码");
}

// 手机号（失去焦点）
tel.onblur = function() {
	telStatus = blurHandle(this, "请填写手机号");
}
// 手机号（键盘松开）
tel.onkeyup = function() {
	telStatus = blurHandle(this, "请填写手机号");
}

// 生日（失去焦点）
birthday.onblur = function() {
	birthdayStatus = blurHandle(this, "请填写生日");
}
// 生日（键盘松开）
birthday.onkeyup = function() {
	birthdayStatus = blurHandle(this, "请填写生日");
}

// 职业（失去焦点需要特殊处理）
profession.onblur = function() {
	// 调用“下拉菜单是否选择”验证函数
	selectedHandle(this);
}
profession.onchange = function() {
	selectedHandle(this);
}


// 注册按钮点击事件
signUp.onclick = function() {
	// 运行一次所有表单元素的“失去焦点”事件
	email.onblur();
	nicename.onblur();
	pwd.onblur();
	repwd.onblur();
	tel.onblur();
	birthday.onblur();
	profession.onblur();
	
	// 检查表单元素状态值是否为真（true）,最后一个条件是判断两次密码是否一致
	if(emailStatus && nicenameStatus && pwdStatus && repwdStatus && telStatus && birthdayStatus && professionStatus && uniformity) {
		location.href = "https://www.baidu.com/";
	}
	// 如果有值存在错误
	else {
		alert("表单填写有误，请检查！");
	}
}

/**
 * 功能：输入框失去焦点验证
 * 参数：1、标识符；2、提示语
 **/
function blurHandle(ident,mesg) {
	// 获取当前表单元素的值
	var thisVal = ident.value;
	// 存储错误信息节点元素
	var erroMesg = ident.previousElementSibling.previousElementSibling;
	
	// 如果当前的值为空
	if(thisVal === "") {
		erroMesg.textContent = mesg;
		// 设置红色边框进行提示
		ident.style.borderColor = "#e00";
		return false;
	}
	// 否则
	else {
		erroMesg.textContent = "";
		// 恢复原来边框的颜色
		ident.style.borderColor = "#999";
		return true;
	}
}
/**
 * 功能：下拉菜单是否选择验证
 * 参数：标识符
**/
function selectedHandle(ident) {
	// 获取当前表单元素的值
	var thisVal = ident.value;
	// 存储错误信息节点元素
	var erroMesg = ident.previousElementSibling.previousElementSibling;
	
	// 如果当前的值为空
	if(thisVal === "未选择") {
		erroMesg.textContent = "请选择您的职业";
		// 设置红色边框进行提示
		ident.style.borderColor = "#e00";
		professionStatus = false;
	}
	// 否则
	else {
		erroMesg.textContent = "";
		// 恢复原来边框的颜色
		ident.style.borderColor = "#999";
		professionStatus = true;
	}
}

/**
 * 功能：两次密码一致性核对
 * 参数：标识符
**/
function checkUniformity(ident) {
	// 获取两次密码输入的值
	var pwdVal = pwd.value,
		repwdVal = repwd.value;
	// 存储错误信息节点元素
	var thisErroMesg = ident.previousElementSibling.previousElementSibling,
		pwdErroMesg = pwd.previousElementSibling.previousElementSibling,
		repwdErroMesg = repwd.previousElementSibling.previousElementSibling;
	// 如果密码和确认密码都通过非空验证
	if(pwdStatus && repwdStatus) {
	    // 如果两次输入的不一致，并且都不为空
		if(pwdVal !== repwdVal) {
			thisErroMesg.textContent = "两次输入的密码不一致，请检查";
			uniformity = false;
		}
		else {
			pwdErroMesg.textContent = "";
			repwdErroMesg.textContent = "";
			uniformity = true;
		}
    }
	
}












