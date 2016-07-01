		function getStyle(obj,name){
			return (obj.currentStyle || getComputedStyle(obj,false))[name];
		}
		function move(obj,json,duration,complete){
			var start={};
			var dis={};
			for (var name in json){
				start[name]=parseFloat(getStyle(obj,name));
				dis[name]=json[name]-start[name];
			}
			
			var count=Math.round(duration/30);  //总步数 30=>几秒走一次
			var n=0;  //当前走到第几步
			
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				n++;
				for (var name in json){
					var a=n/count;
					var cur=start[name]+dis[name]*a
					obj.style[name]=cur+'px';
				}
				if (n==count) {
					clearInterval(obj.timer)
					complete && complete()
				};
			},30)
		}