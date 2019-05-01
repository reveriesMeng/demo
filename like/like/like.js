window.onload =function() {

var $ = function(divclass) {
	return document.getElementsByClassName(divclass);
}

var num = $("num");
var heart = $("se");
//利用闭包实现点赞数量不冲突
 function getValue(i) {
 	var value = 0;
 	//直接返回函数给监听事件
 	return function add() {
 		value++;
 		num[i].innerHTML = value;
 		console.log(value);
 	}
 	add();
 }

//for循环遍历绑定点击事件
for (var i = 0; i < heart.length; i++) {
	heart[i].onclick = getValue(i);

}





}