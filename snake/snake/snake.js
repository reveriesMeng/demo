window.onload = function() {

	//定义一个全局变量map来获取地图
	const map = document.querySelector('.map');

	/*
	 *产生随机数函数:
	 *返回一个值在min和max之间的随机数
	 */
	function getRandom(min, max) {

		var back = Math.floor(Math.random() * (max - min) + min)
		return back;

	}


	//随机产生食物方法
	(function(window) {
		function Food(color, width, height, x, y) {
			this.color = color || "red";
			this.width = width || 20;
			this.height = height || 20;
			this.x = x || 0;
			this.y = y || 0;
		}

		//定义私有属性和方法，外部无法访问,这里的私有代表在只调用函数里的私有
		let elementf = [];
		let removef = function() {
			for (var i = 0; i < elementf.length; i++) {
				elementf[i].remove();
			}
			elementf.splice(0);
		}

		//由于要计算width和height相对于map有多少个，所以只能穿num型
		Food.prototype.createf = function(map) {
			//每次初始化食物要删掉前一个食物
			removef();

			var div = document.createElement('div');
			map.appendChild(div);

			//给食物样式
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.backgroundColor = this.color;
			//给食物定位
			this.x = getRandom(0, map.offsetWidth / this.width);
			this.y = getRandom(0, map.offsetHeight / this.height);
			div.style.position = "absolute"; //父元素给了相对定位
			div.style.left = this.x * this.width + "px";
			div.style.top = this.y * this.height + "px";

			elementf.push(div);
		}

		/*将构造函数Food的对象(并未实例化)暴露给window，
		外部实例化对象后即可调用Food的方法属性*/
		window.Food = Food;

	})(window);
	// var food = new Food("red", 20, 20, 0, 0);
	// food.createf(map);



	//设置小蛇方法
	(function(window) {

		//这里只需要设置蛇头，通过蛇头来定义蛇身
		function Snake(width, height, direction) {
			this.width = width || 20;
			this.height = height || 20;
			this.direction = direction || "right";

			this.body = [{
				color: "red",
				x: 4,
				y: 2
			}, {
				color: "green",
				x: 3,
				y: 2
			}, {
				color: "green",
				x: 2,
				y: 2
			}];
		}

		let elements = [];

		Snake.prototype.moves = function(food, map) {

			for (var i = this.body.length - 1; i > 0; i--) {

				this.body[i].x = this.body[i - 1].x;
				this.body[i].y = this.body[i - 1].y;
			}

			switch (this.direction) {
				case "right":
					this.body[0].x++;
					break;
				case "left":
					this.body[0].x--;
					break;
				case "top":
					this.body[0].y--;
					break;
				case "bottom":
					this.body[0].y++;
					break;
			}

			//撞墙触发游戏结束
			var xx = map.offsetWidth / this.width;
			var yy = map.offsetHeight / this.height;

			if (this.body[0].x == xx || this.body[0].x < 0 || this.body[0].y == yy || this.body[0].y < 0) {
				alert("你真菜，游戏结束^_^");
				clearInterval(1);
			}

			//蛇头吃食物
			if (this.body[0].x == food.x && this.body[0].y == food.y) {
				//吃掉食物后尾巴要加一个
				var last = this.body[this.body.length - 1];
				this.body.push({
					color: last.color,
					x: last.x,
					y: last.y
				});

				//删掉被吃的食物并生成一个新的食物
				food.createf(map);
			}

			//小蛇蛇头撞身体，游戏结束
			for (var i = 1; i < this.body.length; i++) {
				if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
					alert("真蠢，吃了自己^_^");
					clearInterval(1);
				} 
			}

		}

		Snake.prototype.creates = function(map) {
			//先移除之前创建的蛇
			removes();
			//创建snake
			for (var i = 0; i < this.body.length; i++) {
				var div = document.createElement('div');
				map.appendChild(div);

				div.style.width = this.width + "px";
				div.style.height = this.height + "px";
				div.style.backgroundColor = this.body[i].color;
				div.style.position = "absolute";
				div.style.left = this.body[i].x * this.width + "px";
				div.style.top = this.body[i].y * this.height + "px";
				elements.push(div);
			}

		}

		let removes = function() {
			for (var i = 0; i < elements.length; i++) {
				elements[i].remove();
			}
			elements.splice(0);
		}

		window.Snake = Snake;

	})(window);


	//设置游戏构造函数
	(function(window) {

		function Game() {
			this.food = new Food();
			this.snake = new Snake();
			_this = this;
		}

		Game.prototype.createg = function(map) {
			this.food.createf(map);
			this.snake.creates(map);
			this.controls();
			this.startg(this.food, map);

		}

		Game.prototype.startg = function(food, map) {
			setInterval(function() {

				this.snake.moves(food, map);
				this.snake.creates(map);

			}.bind(new Game()), 100);
			/*.bind()方法将定时器对象的复制一份，传入this
			或者new Game()，则指向Game构造函数的对象*/

		}

		//控制移动方向
		Game.prototype.controls = function() {

			document.addEventListener('keydown', function(e) {
				switch (e.keyCode) {
					case 37:
						_this.snake.direction = "left";
						break;
					case 38:
						_this.snake.direction = "top";
						break;
					case 39:
						_this.snake.direction = "right";
						break;
					case 40:
						_this.snake.direction = "bottom";
						break;
				}
			});

		}

		window.Game = Game;

	})(window);

	var game = new Game();
	game.createg(map);


}