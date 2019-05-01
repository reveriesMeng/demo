window.onload = function() {

	function $(divid) {
		return document.getElementById(divid);
	}

	//JS居中
	function autoCenter(e) {
		//获取文档的当前宽高
		var bodyW = document.documentElement.clientWidth;
		var bodyH = document.documentElement.clientHeight;

		//获取登陆框的宽高
		var eW = e.offsetWidth;
		var eH = e.offsetHeight;

		//居中实现
		e.style.left = (bodyW - eW) / 2 + 'px';
		e.style.top = (bodyH - eH) / 2 + 'px';
		console.log('aaa')

	}

	//响应式处理浏览器窗口变化
	window.onresize = function() {
		autoCenter($('dialog'));
	}

	//用于判断是否可以移动
	var canmove = false;
	var offsetX = 0;
	var offsetY = 0;	
	//当鼠标按下时，计算鼠标相对于header的偏移
	$('dialog-header').onmousedown = function(e) {

		offsetX = e.pageX - $('dialog').offsetLeft; 
		offsetY = e.pageY - $('dialog').offsetTop; 
		
		canmove = true;
	}

	//当鼠标移动时，计算并移动
	document.onmousemove = function(e) {
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var moveX = 0;
		var moveY = 0;

		if(canmove == true) {		
			//dialog不能超出浏览器边界
			//下面的相当于0<边界值<(document.documentElement.clientWidth-$('dialog').offsetWidth)
			//超过的指则赋值为最大或最小的值
			moveX = Math.min(document.documentElement.clientWidth-$('dialog').offsetWidth,Math.max(0,(mouseX - offsetX)));
			moveY = Math.min(document.documentElement.clientHeight-$('dialog').offsetHeight,Math.max(0,(mouseY - offsetY)));

			$('dialog').style.left = moveX + 'px';
			$('dialog').style.top = moveY + 'px';
		}
	}

	document.onmouseup = function() {
		canmove = false;
	}

	//登陆按钮
	$('login').onclick = function() {
		$('dialog').style.display = 'block';
		autoCenter($('dialog'));

		$('mask').style.width = document.documentElement.clientWidth + 'px';
		$('mask').style.height = document.documentElement.clientHeight + 'px';
		$('mask').style.display = 'block';
		
	}

	//关闭按钮
	$('dialog-header-close').onclick = function() {
		$('dialog').style.display = 'none';
		$('mask').style.display = 'none';
	}

}

	
