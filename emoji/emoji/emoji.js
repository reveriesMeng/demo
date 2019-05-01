window.onload = function () {

	var canvas = document.getElementById("canvas");
	
	//增加星星方法
	function addstar() {

		var star = document.createElement("img");
		star.src = "emoji.jpg";
		star.style.width = "0px";
		star.style.height = "0px";
		star.style.position = "absolute"
		//获取屏幕宽高，然后用随机数进行图片位置随机定位
		//图片有宽高，要剪掉，不然超出屏幕啦
		starW = (document.documentElement.clientWidth-250)*Math.random();
		starH = (document.documentElement.clientHeight-250)*Math.random();
		star.style.left = starW+"px";
		star.style.top = starH+"px";
		//给个随机的延时，图片动画就不会同步出现了
		star.style.animationDelay = Math.random()*10+"s";
		canvas.appendChild(star);

	}

	for (var i = 0; i < 40; i++) {
		addstar();
	}
	



}