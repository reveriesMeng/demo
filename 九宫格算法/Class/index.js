window.onload = function(){

	function $(divclass){
		return document.getElementsByClassName(divclass);
	}

	var btn = $("btn");
	var image = $("image");
	var inner = $("inner");

	var CurrentW = 250,CurrentH = 250,CurrentXY = 10,ItRow = 0,
		ItCol = 0,Pwidth = 0,Pheight = 0;


	function waterfall(col) {
		//计算宽度，使瀑布流的内容居中显示
		inner[0].style.width = CurrentW*col+CurrentXY*(col-1)+"px";

		for (var i = 0;i<image.length;i++) {

			ItRow = parseInt(i/col);
			ItCol = i%col;
			Pwidth = (CurrentW+CurrentXY)*ItCol;
			Pheight = (CurrentH+CurrentXY)*ItRow;

			image[i].style.position = "absolute";
			image[i].style.left = Pwidth+"px";
			image[i].style.top = Pheight+"px";

		}

	}

	btn[0].onclick = function(){
		waterfall(1);
	}
	btn[1].onclick = function(){
		waterfall(2);
	}
	btn[2].onclick = function(){
		waterfall(3);
	}
	btn[3].onclick = function(){
		waterfall(4);
	}
	btn[4].onclick = function(){
		waterfall(5);
	}

}