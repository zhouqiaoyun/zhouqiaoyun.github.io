"use strict";
document.addEventListener("DOMContentLoaded", function() {
	//case1

	//放大镜
	;(function(){
		function getPos(obj){
			var l=0;
			var t=0;
			while(obj){
				l+=obj.offsetLeft;
				t+=obj.offsetTop;
				obj=obj.offsetParent;
			};
			return {left:l,top:t}
		};
    	window.onload=function(){
    		var oCase2=document.getElementById('case2');
            var oSmall=document.getElementById('small');
            var oBig=document.getElementById('big');
            var oSpan=oSmall.children[1]; 
            var oImg=oBig.children[0];
            oSmall.onmouseover=function(){
            	oSpan.style.display='block';
            	oBig.style.display='block';
            };
            oSmall.onmousemove=function(ev){
            	var oEvent=ev || event;
            	var l=oEvent.clientX-oSpan.offsetWidth/2-getPos(oSmall).left;
            	var t=oEvent.clientY-oSpan.offsetHeight/2-getPos(oSmall).top;
            	console.log(t)
            	
            	//鼠标定位
            	if(l<=0){
            		l=0;
            	};
            	if(l>=oSmall.offsetWidth-oSpan.offsetWidth){
            		l=oSmall.offsetWidth-oSpan.offsetWidth;
            	};
            	if(t<=0){
            		t=0;
            	};
            	if(t>=oSmall.offsetHeight-oSpan.offsetHeight){
            		t=oSmall.offsetHeight-oSpan.offsetHeight;
            	};
            	
            	oSpan.style.left=l+'px';
            	oSpan.style.top=t+'px';
            	
            	oImg.style.left=-l*(oImg.offsetWidth-oBig.offsetWidth)/(oSmall.offsetWidth-oSpan.offsetWidth)+'px';
            	oImg.style.top=-t*(oImg.offsetHeight-oBig.offsetHeight)/(oSmall.offsetHeight-oSpan.offsetHeight)+'px';
            };
            oSmall.onmouseout=function(){
            	oSpan.style.display='none';
            	oBig.style.display='none';
            };
    	};
	})();
	;(function(){
		Tab(case1)
		var oCase=document.getElementById('case1')
		
		function Tab(id){
			var oDiv=document.getElementById(id);
			var oOl=document.getElementById('case1-hd');
			var oUl=document.getElementById('case1-bd')
			var aBtn=oOl.getElementsByTagName('li');
			var aLi=oUl.getElementsByTagName('li');
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].index=i;
				aBtn[i].onclick=function(){
					for(var i=0;i<aBtn.length;i++){
						aBtn[i].className='';
						aLi[i].className='';
					}
					this.className='active';
					aLi[this.index].className='show';
				}
			}
		};
	})();
    //case3
    ;(function(){
    	var oUl3=document.getElementById('case3-ul1');
	    var aLi3=oUl3.children;
	    var W=50;
	    oUl3.style.width=aLi3[0].offsetWidth+(aLi3.length-1)*W+'px';
	    for(var i=1; i<aLi3.length; i++){
	        aLi3[i].style.left=aLi3[0].offsetWidth+(i-1)*W+'px';
	    }
	    for(var i=0; i<aLi3.length; i++){
	        aLi3[i].index=i;
	        aLi3[i].onmouseover=function(){
	            for(var i=1; i<aLi3.length; i++){
	                if(this.index>=i){
	                    move(aLi3[i], {left: i*W});
	                }else{
	                    move(aLi3[i], {left: aLi3[0].offsetWidth+(i-1)*W});
	                }
	            }
	        };
	    };
    })();
    //case4
    ;(function(){
    	var oUl4=document.getElementById('case4-ul1');
	    var aLi4=oUl4.children;
		var oBtn4=document.getElementById('btn4');
	    oBtn4.onclick=function(){
	        aPos.sort(function(){
	            return Math.random()-0.5;
	        });
	
	        for(var i=0; i<aLi4.length; i++){
	            move(aLi4[i], aPos[aLi4[i].index]);
	        }
	    };
	    var aPos=[];
	    var zIndex=999;
	    for(var i=0; i<aLi4.length; i++){
	        aPos[i]={
	            left: aLi4[i].offsetLeft,
	            top: aLi4[i].offsetTop
	        }
	    }
	    for(var i=0; i<aLi4.length; i++){
	        aLi4[i].style.position='absolute';
	        aLi4[i].style.left=aPos[i].left+'px';
	        aLi4[i].style.top=aPos[i].top+'px';
	        aLi4[i].style.margin=0;
	    }
	    for(var i=0; i<aLi4.length; i++){
	        drag(aLi4[i]);
	        aLi4[i].index=i;
	    }
	    function drag(obj){
	        obj.onmousedown=function(ev){
	            clearInterval(obj.timer);
	            obj.style.zIndex=zIndex++;
	            var oEvent=ev || event;
	            var disX=oEvent.clientX-obj.offsetLeft;
	            var disY=oEvent.clientY-obj.offsetTop;
	
	            document.onmousemove=function(ev){
	                var oEvent=ev || event;
	
	                obj.style.left=oEvent.clientX-disX+'px';
	                obj.style.top=oEvent.clientY-disY+'px';
	
	                for(var i=0; i<aLi4.length; i++){
	                    aLi4[i].className='';
	                }
	                // obj -> aLi4[i]
	                var oNear=findNearest(obj);
	                if(oNear){
	                    oNear.className='active';
	                }
	            };
	            document.onmouseup=function(){
	                document.onmousemove=null;
	                document.onmouseup=null;
	
	                var oNear=findNearest(obj);
	
	                if(oNear){
	                    move(oNear, aPos[obj.index]);
	                    move(obj, aPos[oNear.index]);
	
	                    oNear.className='';
	                    var tmp;
	                    tmp=oNear.index;
	                    oNear.index=obj.index;
	                    obj.index=tmp;
	                }else{
	                    move(obj, aPos[obj.index]);
	                }
	            };
	            return false;
	        }
	    }
	    // 碰撞检测
	    function collTest(obj, obj2){
	        var l1=obj.offsetLeft;
	        var r1=obj.offsetWidth+l1;
	        var t1=obj.offsetTop;
	        var b1=obj.offsetHeight+t1;
	
	
	        var l2=obj2.offsetLeft;
	        var r2=obj2.offsetWidth+l2;
	        var t2=obj2.offsetTop;
	        var b2=obj2.offsetHeight+t2;
	        if(r1<l2 || b1<t2 || l1>r2 || t1>b2){
	            return false;
	        }else{
	            return true;
	        }
	    }
	
	    // 寻找离我最近的元素
	    function findNearest(obj){
	        var iMin=999999;
	        var iMinIndex=-1;
	
	        for(var i=0; i<aLi4.length; i++){
	            if(obj==aLi4[i])continue;
	
	            if(collTest(obj, aLi4[i])){
	                var dis=getDis(obj, aLi4[i]);
	                if(dis<iMin){
	                    iMin=dis;
	                    iMinIndex=i;
	                }
	            }
	        }
	        if(iMinIndex==-1){
	            return null;
	        }else{
	            return aLi4[iMinIndex];
	        }
	    }
	
	    // 两个物体之间的距离
	    function getDis(obj, obj2){
	        var l1=obj.offsetLeft+obj.offsetWidth/2;
	        var t1=obj.offsetTop+obj.offsetHeight/2;
	        var l2=obj2.offsetLeft+obj2.offsetWidth/2;
	        var t2=obj2.offsetTop+obj2.offsetHeight/2;
	
	        var a=l1-l2;
	        var b=t1-t2;
	        return Math.sqrt(a*a+b*b);
	    }
    })();
    //case5
    ;(function(){
    	var oUl5=document.getElementById('case5-ul1');
	    var oBox5=document.getElementById('box5')
	    var aLi5=oUl5.children;
	    var aBtn=oBox5.getElementsByTagName('input');
	
	    oUl5.innerHTML+=oUl5.innerHTML;
	    oUl5.style.width=aLi5[0].offsetWidth*aLi5.length+'px';
	
	    var left=0;
	    var timer;
	    function toLeft(){
	        clearInterval(timer);
	        timer=setInterval(function(){
	            left-=5;
	            if(left<=-oUl5.offsetWidth/2){
	                left=0;
	            }
	            oUl5.style.left=left+'px';
	        }, 30);
	    }
	    toLeft();
	    function toRight(){
	        clearInterval(timer);
	        timer=setInterval(function(){
	            left+=5;
	            if(left>=0){
	                left=-oUl5.offsetWidth/2;
	            }
	            oUl5.style.left=left+'px';
	        }, 30);
	    }
	    aBtn[0].onclick=function(){
	        toLeft();
	    };
	    aBtn[1].onclick=function(){
	        toRight();
	    };
    })();
    //case6
    ;(function(){
    	var oUl6=document.getElementById('case6-ul1');
	    var oOl6=document.getElementById('ol1');
	    var  aLi6=oUl6.children;
	    var aSpan=oOl6.getElementsByTagName('span');
	
	    oUl6.style.width= aLi6[0].offsetWidth* aLi6.length+'px';
	
	    var n=0;
	    function next(){
	        move(aSpan[n% aLi6.length], {width: 80},{complete: function(){
	            for(var i=0; i<aSpan.length; i++){
	                aSpan[i].style.width=0;
	            }
	            n++;
	            move(oUl6, {left: - aLi6[0].offsetWidth*(n% aLi6.length)}, {complete: function(){
	                next();
	            }});
	        }});
	    }
	    next();
    })();
    //case7
    ;(function(){
    	var oBtn7=document.getElementById('btn7');
	    var oUl7=document.getElementById('case7-ul1');
	    var aLi7=oUl7.children;
	
	    // 布局转换
	    var aPos=[];
	    for(var i=0; i<aLi7.length; i++){
	        aPos[i]={
	            left: aLi7[i].offsetLeft,
	            top: aLi7[i].offsetTop
	        };
	    }
	    for(var i=0; i<aLi7.length; i++){
	        aLi7[i].style.position='absolute';
	        aLi7[i].style.left=aPos[i].left+'px';
	        aLi7[i].style.top=aPos[i].top+'px';
	        aLi7[i].style.margin=0;
	    }
	
	    var timer;
	    var bFlag=true;
	    oBtn7.onclick=function(){
	        if(!bFlag)return;
	        bFlag=false;
	        var n=0;
	        timer=setInterval(function(){
	            (function(index){
	                move(aLi7[n], {width: 0, height: 0, left: 0, top: 0, opacity: 0},{complete: function(){
	                    if(index==aLi7.length-1){
	                        n=index;
	
	                        timer=setInterval(function(){
	                            move(aLi7[n], {width: 150, height: 150, left: aPos[n].left, top: aPos[n].top, opacity: 1});
	                            n--;
	                            if(n==-1){
	                                clearInterval(timer);
	                                setTimeout(function(){
	                                    bFlag=true;
	                                }, 700);
	                            }
	                        }, 100);
	                    }
	                }});
	            })(n);
	            n++;
	
	            if(n==aLi7.length){
	                clearInterval(timer);
	            }
	        }, 100);
	    };
    })();
    //case8
   ;(function(){
   	 	var oBox8=document.getElementById('box8');
		var oUl8=document.getElementById('case8-ul1');
		var aLi8=oUl8.children;
		var aImg8=oUl8.getElementsByTagName('img');
		
		oUl8.style.width=aLi8[0].offsetWidth*aLi8.length+'px';
		
		var W=oBox8.offsetWidth/2;
		oUl8.onmousedown=function(ev){
		    var oEvent=ev || event;
		    var disX=oEvent.clientX-oUl8.offsetLeft;
		
		    document.onmousemove=function(ev){
		        var oEvent=ev || event;
		
		        var l=oEvent.clientX-disX;
		        if(l>=W-(1-0.5)*aLi8[0].offsetWidth){
		            l=W-(1-0.5)*aLi8[0].offsetWidth;
		        }
		        if(l<=W-(aLi8.length-0.5)*aLi8[0].offsetWidth){
		            l=W-(aLi8.length-0.5)*aLi8[0].offsetWidth;
		        }
		        oUl8.style.left=l+'px';
		
		    // 算距离
		        setSize();
		    };
		    document.onmouseup=function(){
		        document.onmousemove=null;
		        document.onmouseup=null;
		    };
		    return false;
		};
		oUl8.style.left=W-(3-0.5)*aLi8[0].offsetWidth+'px';
		setSize();
		function setSize(){
		    for(var i=0; i<aLi8.length; i++){
		        var c=Math.abs(W-(oUl8.offsetLeft+aLi8[i].offsetLeft+aLi8[i].offsetWidth/2));
		
		        var scale=1-c/500;
		        scale<0.5 && (scale=0.5);
		
		        aImg8[i].style.width=520*scale+'px';
		    	aImg8[i].style.marginLeft=-(520*scale-260)/2+'px';
		    	aImg8[i].style.marginTop=-(358*scale-179)/2+'px';
		        aLi8[i].style.zIndex=scale*1000;
		    }
		};
   })();
	/*case9*/
	;(function(){
		var oBox9=document.getElementById('box9');
	    var oBtn9=document.getElementById('btn9');
	    var M=7;
	    var Z=4;
	    for(var z=0; z<Z; z++){
	        for(var m=0; m<M; m++){
	            var oSpan9=document.createElement('span');
	            oSpan9.style.width=oBox9.offsetWidth/M+'px';
	            oSpan9.style.height=oBox9.offsetHeight/Z+'px';
	            oBox9.appendChild(oSpan9);
	            oSpan9.style.left=oSpan9.offsetWidth*m+'px';
	            oSpan9.style.top=oSpan9.offsetHeight*z+'px';
	            oSpan9.style.backgroundPosition='-'+oSpan9.offsetWidth*m+'px -'+oSpan9.offsetHeight*z+'px';
	        }
	    }
	    var timer;
	    var now10=0;
	    var bFlag10=true;
	    oBtn9.onclick=function(){
	        if(!bFlag10)return;
	        bFlag10=false;
	        var aSpan9=oBox9.children;
	        var S=0;
	        now10++;
	        timer=setInterval(function(){
	            aSpan9[S].style.opacity=0;
	            move(aSpan9[S], {opacity: 1});
	            if(now10%3==0){
	                oBox9.style.backgroundImage='url(img/case9-pic2.jpg)';
	            }else{
	                oBox9.style.backgroundImage='url(img/case9-pic'+(now10%3-1)+'.jpg)';
	            }
	            aSpan9[S].style.backgroundImage='url(img/case9-pic'+now10%3+'.jpg)';
	            S++;
	            if(S==aSpan9.length){
	                clearInterval(timer);
	                bFlag10=true;
	            }
	        }, 100);
	    };
	})();
    //case10
    
}, false);