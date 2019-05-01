window.onload = function(){

	function $(divclass) {
		return document.getElementsByClassName(divclass);
	}

	var a = $("emoji");
	var b = $("image");
	for (var i = 0; i <a.length; i++) {
		a[i].index = i;
		
		a[i].onclick = function(){
			$("image")[0].style.display = "none";
			$("image")[1].style.display = "none";
			$("image")[2].style.display = "none";
			$("emoji")[0].style.background = "#eee";
			$("emoji")[1].style.background = "#eee";
			$("emoji")[2].style.background = "#eee";
			$("emoji")[0].style.borderBottom = "1px solid #ccc";
			$("emoji")[1].style.borderBottom = "1px solid #ccc";
			$("emoji")[2].style.borderBottom = "1px solid #ccc";
			$("image")[this.index].style.display = "block";
			$("emoji")[this.index].style.background = "#fff";
			$("emoji")[this.index].style.borderBottom = "none";
			
		}
	}




}