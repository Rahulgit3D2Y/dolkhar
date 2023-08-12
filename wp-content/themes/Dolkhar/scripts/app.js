!function(e){e.fn.slideshow=function(){this.each(function(){var n=e(this).find(".slide"),l=n.length;if(l>1){var s,i=e(".slide.active"),o=e(".w3-display-right"),t=e(".w3-display-left");s=i.length>0?n.index(i[0]):0;var c=function(){console.log(s),n.eq(s).removeClass("active"),s=s+1>=l?0:s+1,n.eq(s).addClass("active"); if(s == 1) { $("video").get(0).currentTime  = 0; $("video").get(0).pause();console.log("pause");} else {
    $("video source").attr("src", $("video source").data("srsc"));
    $("video source").load();
    $("video").get(0).load();
    $("video").get(0).play();console.log("play");  }},a=function(){n.eq(s).removeClass("active"),s=0>s-1?l-1:s-1,n.eq(s).addClass("active");},v=setInterval(c,9e3);o.on("click",function(){console.log("next"),clearInterval(v),c()}),t.on("click",function(){console.log("prev"),clearInterval(v),a()})}})}}(jQuery),$(function(){$(".slideshow").slideshow(),$(".menu").on("click",function(e){$(this).toggleClass("open"),$(".links").toggleClass("expand")})});
//# sourceMappingURL=app.js.map
