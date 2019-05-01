window.onload = function() {

	var img = document.getElementsByClassName('frame-content-img');
	var btn = document.getElementsByClassName('frame-select-btn');

	function $(divid) {
		return document.getElementById(divid);
	}

	//封装的动画函数
	function animation(ele, target) {
		//清除之前的定时器
		clearInterval(ele.timeId);

		let current = ele.offsetLeft;
		let step = 10;
		//目标位置大于当前位置，步数一步步加，小于的话一步步减
		step = target > current ? step : -step;

		ele.timeId = setInterval(function() {
			//current和target的差与step相比，判断有无要到目标
			if (Math.abs(target - current) > Math.abs(step)) {
				current += step;
			} else {
				current = target;
				clearInterval(ele.timeId);
			}

			ele.style.left = current + 'px';

		}, 10)
	}

	//按钮点击跳转函数
	function btnColor(j) {
		for (var i = 0; i < btn.length; i++) {
			btn[i].removeAttribute('id');
		}
		btn[j].setAttribute("id", "current");

	}

	//点击数字按钮函数
	function btnClick() {

		for (var i = 0; i < btn.length; i++) {
			btn[i]._index = i;
			btn[i].onclick = function() {
				btnColor(this._index);
				animation($('frame-content'), -305 * this._index);
			}
		}

	}


	//点击右箭头函数
	function rightArrow() {

		let target = $('frame-content').offsetLeft - 305;
		let num = Math.abs(($('frame-content').offsetLeft - 305) / 305);
		//如果到了最后一张图片点击时,在最后增加了第一张的图片，直到点击要去第二张图时，删掉最后一张增加的
		if ($('frame-content').offsetLeft == -(btn.length - 1) * 305) {
			num = 0;
			let newli = img[0].cloneNode(true);
			$('frame-content').appendChild(newli);
			animation($('frame-content'), target);
			btnColor(num);
		} else if ($('frame-content').offsetLeft == -btn.length * 305) {
			num = 1;
			$('frame-content').style.left = 0 + 'px';
			img[5].remove();
			target = $('frame-content').offsetLeft - 305;
			animation($('frame-content'), target);
			btnColor(num);
		} else {
			animation($('frame-content'), target);
			btnColor(num);
		}

	}
	//点击左箭头函数
	function leftArrow() {

		let target = $('frame-content').offsetLeft + 305;
		let num = Math.abs(($('frame-content').offsetLeft + 305) / 305)
		//第一张在点左边时,在最右边加了第一张图片，知道原先的最后一张点击了向左，删了最后的
		if ($('frame-content').offsetLeft == 0) {
			num = 4;
			let newli = img[0].cloneNode(true);
			$('frame-content').appendChild(newli);
			$('frame-content').style.left = -btn.length * 305 + 'px';
			target = $('frame-content').offsetLeft + 305;
			animation($('frame-content'), target);
			btnColor(num);
		} else if ($('frame-content').offsetLeft == -(btn.length - 1) * 305) {
			num = 3;
			animation($('frame-content'), target);
			img[5].remove();
			btnColor(num);
		} else {
			animation($('frame-content'), target);
			btnColor(num);
		}

	}


	btnClick();
	$('frame-dir-right').onclick = rightArrow;
	$('frame-dir-left').onclick = leftArrow;
	btnColor(0);//默认要有颜色

	//定时器出发右箭头点击事件，就能自动轮播了
	var time1 = setInterval(rightArrow, 1500);
	//鼠标悬停时停止定时器
	$('frame').onmouseover = function() {
		clearInterval(time1);
	}
	//鼠标离开时，再次开启定时器
	$('frame').onmouseout = function() {
		time1 = setInterval(rightArrow, 1500);;
	}

}