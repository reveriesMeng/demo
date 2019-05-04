	//封装的动画函数
	function animation(ele, target, attr) {
		//清除之前的定时器
		clearInterval(ele.timeId);

		var current = window.getComputedStyle ? window.getComputedStyle(ele, null)[attr] : element.currentStyle[attr];

		current = parseInt(current);
		var step = 10;
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

			ele.style[attr] = current + 'px';

		}, 10)
	}
