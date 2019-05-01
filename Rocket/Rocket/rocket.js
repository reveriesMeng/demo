window.onload = function() {

	function $(divid) {
		return document.getElementById(divid);
	}
	var btn = $("path");
	var time = $("time");
	var an = $("an");
	var timer1 = null;
	var timer2 = null;
	var timer3 = null;

	var H = window.innerHeight;
	// var H = document.documentElement.clientHeight;都可以获取当前窗口高度
	var num = 0; //飞行高度



	btn.onclick = function() {

		var i = 5;
		time.style.display = "block";
		timer1 = setInterval(function() {

			i--;
			time.innerHTML = "倒计时" + i + "秒";
			if (i == 0) {

				time.style.display = "none";
				clearInterval(timer1);

				//启动第二个火箭发射定时器
				timer2 = setInterval(function() {

					num += 5 //匀速飞行
					btn.style.bottom = num + "px";
					if (num >= H + 100) {

						clearInterval(timer2);
						console.log(num);

					}

				}, 20)

			}

		}, 1000)



	}



}