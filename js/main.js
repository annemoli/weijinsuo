$(function() {
	function resize() {
		// 获取屏幕宽度
		var windowWidth = $(window).width();
    	// 判断屏幕属于大还是小
    	var isSmallScreen = windowWidth < 768;
    	// 根据大小为界面上的每一张轮播图设置背景
    	$('#main_ad > .carousel-inner > .item').each(function(i,item) {
    	  	// 因为拿到是DOM对象 需要转换
    	  	var $item = $(item);
    	  	var imgSrc = isSmallScreen ? $item.data('img-xs') : $item.data('img-lg');
    		// 设置背景图片
    		$item.css('backgroundImage', 'url("' + imgSrc + '")');

    		// 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
    		if (isSmallScreen) {
    			$item.html('<img src="' + imgSrc + '" alt="" />');
    		} else {
    			$item.empty();
    		}
    	});
    }
    $(window).on('resize',resize).trigger('resize');
    
    // 初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();

    // 动态控制标签页的容器宽度
    var width = 30; // 因为ul上面设置了padding-left：20；这里width设大一点
    var $ulContainer = $('.nav-tabs');
    // console.log($ulContainer.children());
    $ulContainer.children().each(function(index,ele) {
        // console.log(ele.clientWidth);   // 原生js 更效率
        // console.log($(ele).width());  // jq方法
        width += ele.clientWidth;     // 此时width等于所有LI的宽度总和
    })

      // 判断当前UL的宽度是否超出屏幕，如果超出就显示横向滚动条
      if (width > $(window).width()) {
        $ulContainer.css('width',width).parent().css('overflow-x','scroll');
    }

      // 给a添加点击事件
      var $newsTitle = $('.news-title');
      $('#news .nav-pills a').on('click',function() {
        // 获取当前的点击元素
        var $this = $(this);
        // 获取对应的title值
        var title = $this.data('title');
        // 将title设置到相应的位置
        $newsTitle.text(title);
    })

    // 给轮播图添加手指滑动效果
    var $carousel = $('.carousel');
    var startX,endX;
    var offset = 30;    // 判断滑动是否发生

    // 注册滑动事件
    $carousel.on('touchstart',function (e) {
        // console.log(e);
        // console.log(e.originalEvent.touches[0].clientX);
        startX = e.originalEvent.touches[0].clientX;
    })

    $carousel.on('touchmove',function (e) {
        console.log(e.originalEvent.touches[0].clientX);
        endX = e.originalEvent.touches[0].clientX;
    })

    $carousel.on('touchend',function (e) {
        // 结束触摸一瞬间记录最后的手指所在坐标X
        // 获取每次运动的距离，当距离大于一定值offset时认为是有方向变化
        var distance = Math.abs(startX - endX); // 比大小
        if (distance > offset) {
            // 有方向变化  根据获得到的方向选择上一张或者下一张
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    })


})