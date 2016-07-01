// JavaScript Document
$(document).ready(function() {	
	
		function tiao(){
			$('#header ul li').eq(0).click(function(){
				$("body,html").animate({
					
					 scrollTop: 0,
					 opacity: 'show'

				
										 
					 }, 500);
					
				
					})

			$('#header ul li').eq(1).click(function(){

			    var sh_top=$("#show").offset().top;
				$("body,html").animate({
					 scrollTop: sh_top-100+"px"
					 
					 }, 500);

				

					
				
					})
			$('#header ul li').eq(2).click(function(){

			    var ab_top=$(".about").offset().top;
				$("body,html").animate({ scrollTop: ab_top-100+"px"}, 500);
		

					})
					
			$('#header ul li').eq(3).click(function(){

			    var con_top=$(".contact").offset().top;
				$("body,html").animate({ scrollTop: con_top-100+"px"}, 500);
		

					});
					
			
			
			}			
			
		
		tiao();
		
		/*function show(){
			$(".show-list a").mousemove(function(){
			var path=$(this).attr("href");
			var $news=$("<div class='show-pic'><img src='"+path+"'/></div>");
			$("body").append($news);
				
		
		})						
			}
			show();*/
		$(".op").fadeTo(0,0.8);
		$(".show-list a").hover(function(){
			
			$(this).siblings(".mas,.op").stop().animate({
				
			    bottom:-80
				
				},200)
			$(this).parent().siblings(".show-list").stop().animate({
				opacity:"0.5"
				
				})
			
			},function(){
				
				$(this).siblings(".mas,.op").stop().animate({
				
			    bottom:-0
				
				},200);
				$(this).parent().siblings(".show-list").stop().animate({
				opacity:"1"
				
				})
				
				})

    });
window.onload = function () {
    var oImg=document.getElementById('img');

    window.onscroll=function(){
        var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;

        if(scrollTop>100){
            oImg.style.display='block';
        }else{
            oImg.style.display='none';
        }
    };

    var timer;
    oImg.onclick=function(){
        var start=document.documentElement.scrollTop || document.body.scrollTop;
        var dis=0-start;

        var count=Math.floor(1000/30);
        var n=0;
        timer=setInterval(function(){
            n++;
            var a=n/count;
            var cur=start+dis*a;

            document.documentElement.scrollTop=document.body.scrollTop=cur;

            if(n==count){
                clearInterval(timer);
            }
        },30);
    };
};
