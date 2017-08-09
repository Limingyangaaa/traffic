
$(function(){

	var server="http://127.0.0.1:8888/";
	var totalCount  //表格总数据量
	var showCount   //显示导航数量
	var limit       //显示单个表格数据量
	var map_id      //传回地图坐标参数
	var time_id		//传回时间id
	var indicatorItem //导航菜单所有数据
	var indicatorItem_first //获取路段
	var indicatorItem_second //获取路段详情
	var indicatorItem_road
	var indicatorItem_id
	var indicatorItem_det
	var indicatorItem_bat
	var indicatorItem_bus
	var tempContent
	var itemContent
	var listContent
	var stationItem
	var detailItem
	var stationContent
	var module      
	var dimension


	//用户退出
    $('.admin-exit').click(function(){
    	window.location='login.html';
    });

    //首页点击刷新
    $('.nav-title').click(function(){
    	window.location='index.html';
    });

    //设置用户名
    var encrypt1=sessionStorage.getItem("users");
    $('.admin-name').text(encrypt1);		

    //在未点击地图时，显示未选择查询条件页面
    $('.search-btn').click(function(e){
		e.stopPropagation();
		if(map_id)
		{
			$('.li-container-main-map').click();
		}
		else
		{
			$('.right-load').hide();
			$('.right-warner').show();
		}
		$('.right-list').animate({scrollTop:0},150)

	})

	//地图点击事件
	$('.li-container-main-map').click(function(){
		var usermap="";
		var datetime=$('#datetime').text();
		var whole=datetime.split(" ")[0];
			var full=(datetime).split(" ")[1];
			var YY=whole.split("-")[0];//搜索年份
			var MM=whole.split("-")[1];//搜索月份
			var DD=whole.split("-")[2];//搜索日期
			var start=full.split("-")[0];
			var end=full.split("-")[1];
			var SHH=start.split(":")[0];//起始分钟
			var SII=start.split(":")[1];//起始秒钟
			var EHH=end.split(":")[0];//结束分钟
			var EII=end.split(":")[1];//结束秒钟
		$.ajax({
				type:'get',
				data:{
					map_id:usermap,
					time_id:"YY-MM-DD SHH:SII-EHH:EII"
				},
				typeData:'json',
				url:server+"map",
				success:function(res){
					var searchInfo=res.data;
					console.log('search',searchInfo);
					listShow(searchInfo);
					

				},
				error:function(res){
					throw new Error("获取map_id请求错误,错误代码"+res.status);
				}
			})	
	});

})

	//设置时间函数
//	function dateTimeSearch(searchInfo){
//		
//			
//			var datetime=$('#datetime').text();
//			console.log(datetime);
//			var fullDate=datetime.split(" ")[0];
//			var fullTime=(datetime).split(" ")[1];
//			var searchYear=fullDate.split("-")[0];//搜索年份
//			var searchMonths=fullDate.split("-")[1];//搜索月份
//			var searchDate=fullDate.split("-")[2];//搜索日期
//			var startTime=fullTime.split("-")[0];
//			var endTime=fullTime.split("-")[1];
//			var startMinutes=startTime.split(":")[0];//起始分钟
//			var startSeconds=startTime.split(":")[1];//起始秒钟
//			var endMinutes=endTime.split(":")[0];//结束分钟
//			var endSeconds=endTime.split(":")[1];//结束秒钟
//			$.ajax({
//				type:'post',
//				data:{
//					map_id:usermap,
//					search_year:searchYear,
//					search_Months:searchMonths,
//					search_date:searchDate,
//					start_Minutes:startMinutes,
//					start_Seconds:startSeconds,
//					end_Minutes:endMinutes,
//					end_Seconds:endSeconds
//				},
//				typeData:'json',
//				url:server+"search",
//				success:function(res){
//					console.log(res);
//					console.log('time_id',res.data);
//					var time_id=res.data;
//					listShow(usermap,time_id);
//				},
//				error:function(res){
//					throw new Error("获取time_id请求错误,错误代码"+res.status);
//				}
//
//			})
//			
//		
//	}

	//生成列表函数
	function listShow(searchInfo){
		$.ajax({
			type:'get',
			data:{
				searchInformation:"searchIfo"
			},
			url:server+"list",
			typeData:'json',
			success:function(res){
				$('.right-list').html("");
				console.log(res.data);
				indicatorItem=res.data;

				for(var key in indicatorItem)
				{
					indicatorItem_first=indicatorItem[key];
					//console.log('indicatorItem_first',indicatorItem_first);
							indicatorItem_road=indicatorItem_first[0].road;
							$('.right-load').hide();
							$('.right-warner').hide();
							$('.right-list').show();
							
							var tempContent="";
							tempContent+='<div class="sidbar-nav">'+
										'<div class="sidbar-dropdown-toggle">'+
											'<a href="javascript:void" class="sidbar-item1"><img src="./img/road1.png" alt=""></a>'+
											'<span class="sidbar-item2">'+indicatorItem_road[0]+'</span>'+
											'<span class="sidbar-item3">'+indicatorItem_road[1]+'</span>'+
											'<span class="sidbar-item4">'+indicatorItem_road[2]+'</span>'+
											'<span class="sidbar-item5 item-open"><img src="./img/open.png" alt=""></span>'+
											'<span class="sidbar-item6 item-close"><img src="./img/close.png" alt=""></span>'+
										'</div>';
							
							indicatorItem_id=indicatorItem_first[1];
							
							for(var j in indicatorItem_id)	
							{
								itemContent="";
								itemContent+='<div class="sidbar-dropdown-menu-container">';
								indicatorItem_det=indicatorItem_id[j][0].item1;
								indicatorItem_bus=indicatorItem_id[j][0].item2;
								itemContent+=
												'<div class="sidbar-dropdown-menu">'+
												  '<a href="javascript:void" class="sidbar-item12"><div class="circle"></div></a>'+
												  '<span class="sidbar-item2">'+indicatorItem_det[0]+'</span>'+
												  '<span class="sidbar-item3">'+indicatorItem_det[1]+'</span>'+
												  '<span class="sidbar-item4">'+indicatorItem_det[2]+'</span>'+
												'</div>';
								listContent="";
								for(var i in indicatorItem_bus)
								{
									listContent+='<div class="sidbar-dropdown-ind">'+
													'<span class="sidbar-item-31">'+indicatorItem_bus[i].busitem1+'</span>'+
													'<span class="sidbar-item-32">'+indicatorItem_bus[i].busitem2+'</span>'+
													'<span class="first_indicatorId" style="display: none">'+indicatorItem_bus[i].targetid+'</span>'+
													'<span class="sidbar-item-7"></span>'+
												'</div>';
								}
								itemContent+=listContent;
							itemContent+='</div>';
							tempContent+=itemContent;
							}
							
							
							tempContent+='</div>';
							$('.right-list').append(tempContent);				
				}
				$('.sidbar-nav:first').siblings().find('.sidbar-dropdown-menu-container').hide();//.sublings().find('.sidbar-dropdown-ind')
					$('.sidbar-nav:first').siblings().css('color','#7f7f7f');
					$('.sidbar-nav:first').find('.sidbar-dropdown-menu-container:first').siblings().find('.sidbar-dropdown-ind').hide();
					$('.sidbar-nav:first').find('.item-open').show();
					$('.sidbar-nav:first').find('.item-close').hide();
					$('.sidbar-nav:first').find('.sidbar-item1 img').css('display','block');
					$('.sidbar-dropdown-toggle').click(function(){
						$(this).parent().siblings().find('.item-open').hide();
						$(this).parent().siblings().find('.item-close').show();
						$(this).find(".item-open").toggle();
						$(this).find(".item-close").toggle();
						$(this).parent().siblings().find('.sidbar-dropdown-menu-container').hide();
						$(this).parent().find('.sidbar-dropdown-menu-container').toggle();	
						$(this).parent().siblings().css('color','#7f7f7f');
						$(this).parent().css('color','#4285f4');
						$(this).parent().siblings().find('.sidbar-item1 img').css('display','none');
						$(this).find('.sidbar-item1 img').css('display','block');
				
						//二级列表第一个分列表显示
						$(this).parent().find('.sidbar-dropdown-menu-container:first').siblings().find('.sidbar-dropdown-ind').hide();
						$(this).parent().find('.sidbar-dropdown-menu-container:first').find('.sidbar-dropdown-ind').show();
					});		
					$('.sidbar-dropdown-menu').click(function(){
								$(this).parent().siblings().find('.sidbar-dropdown-ind').hide();
								$(this).parent().find('.sidbar-dropdown-ind').toggle();
								$(this).find('.circle').css({'border':'1px solid #4285f4','background':'#4285f4'});
								$(this).parent().siblings().find('.circle').css({"border":"1px solid #dedfe0","background": "#dedfe0"});
								$(this).parent().parent().siblings().find('.circle').css({"border":"1px solid #dedfe0","background": "#dedfe0"});
							});
				
					$('.sidbar-dropdown-ind').hover(function(){
							$(this).find('.sidbar-item-7').show();
							$(this).css('background','#f2f2f2');
						},function(){
							$(this).find('.sidbar-item-7').hide();
							$(this).css('background','#fff');
						});
				
					$('.sidbar-dropdown-ind').click(function(){
							var road=$(this).find('.sidbar-item-31').text();
							$('.info-header-num').text(road);
							$(this).parent().parent().parent().find('.sidbar-dropdown-ind').hover(function(){//所有同类包括自己清除hover
							$(this).find('.sidbar-item-7').show();
							$(this).css('background','#f2f2f2');
							
						},function(){
							$(this).find('.sidbar-item-7').hide();
							$(this).css('background','#fff');
						}).css('background','#fff').find('.sidbar-item-7').hide();//所有同类包括自己蓝色图标隐藏
				
							$(this).find('.sidbar-item-7').show();
							$(this).css('background','#f2f2f2');
				
							$(this).hover(function(){    //设定点击后颜色不变
								$(this).find('.sidbar-item-7').show();
								$(this).css('background','#f2f2f2');
							},function(){
								$(this).find('.sidbar-item-7').show();
								$(this).css('background','#f2f2f2');
							});
							
							//$(this).siblings('.sidbar-dropdown-ind').css('background','#fff').find('.sidbar-item-7').hide();
							//$(this).parent().parent().siblings().find('.sidbar-dropdown-ind').css('background','#fff').find('.sidbar-item-7').hide();
							
							//地图隐藏,信息页显示
							$('.li-container-main-map').hide();
							$('.li-container-main-info').show();
							var target_id=$(this).find('.first_indicatorId').text();
							tableShow(target_id);
					});
			}

		})
	}

	function tableShow(tableId){
		$.ajax({
			type:'get',
			data:{
				table_id:tableId
			},
			typeData:'json',
			url:server+"table",
			success:function(res){
				totalCount=res.total;
				showCount=10;
				limit=5;
				var data=res.data[0];
				var html="";
				html+=' <table class="table table-hover piece">';
				 html+=' <thead><tr><th>车牌号</th><th>上下行站点</th><th>发车时间</th><th>最近公交站</th><th>经过时间</th><th>最近公交站上下车人数</th><th>满载率</th><th>详情</th></tr></thead><tbody>';
				for(var key in data){
					html+='<tr>'+
						   '<td>'+data[key][0]+'</td>'+
						   '<td>'+data[key][1]+'</td>'+
						   '<td>'+data[key][2]+'</td>'+
						   '<td>'+data[key][3]+'</td>'+
						   '<td>'+data[key][4]+'</td>'+
						   '<td>'+
						    	'<img src="./img/up.png" alt="" class="up-img"><span class="info-up">21</span>'+
						   		'<img src="./img/down.png" alt="" class="down-img"><span class="info-down">4</span>'+
						   '</td>'+
						   '<td>'+data[key][5]+'</td>'+
						   '<td>'+data[key][6]+'</td>'+
						   '<td style="display:none;" class="td-last">'+data[key][7]+'</td>'+
					   '</tr>';
					    	
					    }
					    
					     html+='</tbody></table>';
					     var mainObj = $('.info-main-nav');
	
					    mainObj.empty();
					    mainObj.append(html);


				$('.nav-page-change1').extendPagination({
			
			            totalCount: totalCount,
			
			            showPage: showCount,
			
			            limit: limit,
			    });

				$('.nav-page-change1').click(function(){
					var LI=$(this).find('li');
					ppt(LI);
				})

				function ppt(child){
					$.each(child,function(){
						if($(this).attr('class')=="active")
						{
							var activePage=$(this).text();
							$.ajax({
								type:'get',
								data:{
									showPage:activePage
								},
								typeData:'json',
								url:server+"currpage",
								success:function(res){
									console.log(res);
									var data=res.data[0];
									console.log('22',data);
									var html="";
									 html+=' <table class="table table-hover piece">';
				       			 html+=' <thead><tr><th>车牌号</th><th>上下行站点</th><th>发车时间</th><th>最近公交站</th><th>经过时间</th><th>最近公交站上下车人数</th><th>满载率</th><th>详情</th></tr></thead><tbody>';
								for(var key in data){
						        	
						        	
						        		html+='<tr>'+
											   '<td>'+data[key][0]+'</td>'+
											   '<td>'+data[key][1]+'</td>'+
											   '<td>'+data[key][2]+'</td>'+
											   '<td>'+data[key][3]+'</td>'+
											   '<td>'+data[key][4]+'</td>'+
											   '<td>'+
											    	'<img src="./img/up.png" alt="" class="up-img"><span class="info-up">21</span>'+
											   		'<img src="./img/down.png" alt="" class="down-img"><span class="info-down">4</span>'+
											   '</td>'+
											   '<td>'+data[key][5]+'</td>'+
											   '<td>'+data[key][6]+'</td>'+
											   '<td style="display:none;" class="td-last">'+data[key][7]+'</td>'+
										   '</tr>';
						        	
						        }
						        
						         html+='</tbody></table>';
						         var mainObj = $('.info-main-nav');
						
						        mainObj.empty();
						        mainObj.append(html);
								 
       				 			$(".info-main-nav tbody tr").click(function(){
									$('.footer-logo').css('visibility','visible');
									var tr_id=$(this).find('.td-last').text();
									var tb_first=$(this).find('td:nth-child(1)').text();//表格第一个元素
									var tb_second=$(this).find('td:nth-child(2)').text();//表格第二个元素
									var tb_forth=$(this).find('td:nth-child(4)').text();
									var tb_fifth=$(this).find('td:nth-child(5)').text();
									var tb_seventh=$(this).find('td:nth-child(7)').text();
									console.log('tr的id',tr_id);
									showDetail(tr_id,tb_first,tb_second,tb_forth,tb_fifth,tb_seventh);
								})

								}
							})
						}
					})
				}
     $(".info-main-nav tbody tr").click(function(){
			$('.footer-logo').css('visibility','visible');
			var tr_id=$(this).find('.td-last').text();
			var tb_first=$(this).find('td:nth-child(1)').text();//表格第一个元素
			var tb_second=$(this).find('td:nth-child(2)').text();//表格第二个元素
			var tb_forth=$(this).find('td:nth-child(4)').text();
			var tb_fifth=$(this).find('td:nth-child(5)').text();
			var tb_seventh=$(this).find('td:nth-child(7)').text();
			console.log('tr的id',tr_id);
			showDetail(tr_id,tb_first,tb_second,tb_forth,tb_fifth,tb_seventh);
		})	
			}
		})
	}
	

	function showDetail(trId,tb_first,tb_second,tb_forth,tb_fifth,tb_seventh){
		$.ajax({
			type:'get',
			typeData:'json',
			url:server+"detail",
			data:{
				tr_id:trId
			},
			success:function(res){
				console.log(res);
				$('.roadList').html("");
				var data=res.data;
				console.log(res.data);
				 var dataList=data.list;
				 var totalNum=data.totalStation;
				 var nearNum=data.nearStation;
				 stationContent="";
				 for(var i=0;i<totalNum-1;i++)
				 {
				 	stationContent+='<span class="road-item"></span><span class="load-item"></span>';
				 }
				 stationContent+='<span class="road-item">';
				 $('.roadList').append(stationContent);
				 $.each($('.road-item'),function(){$(this).html("")});
				 $('.loading-bus').hide();
				 $('.loading-search').show();
				 $('.logo-detail').text('查询中...');
				 $('.select').text('......');
				 $.each($('.load-item'),function(){
						var loadWith=1/(totalNum+5);
		
						var roadWidth=$('.footer-road').width();

						var percent=loadWith*(roadWidth-Number(totalNum*10))
					
						$(this).css('width',percent+"px");
					})
				 var selectTime=setTimeout(function(){
					$('.road-item').css({'height':'10px','width':'10px','border-radius': '5px','border':'1px solid #cdd1d3','margin-top':'9px'});
					$('.footer-logo').css('visibility','hidden');
					$('.bus-select').text(tb_first);
					$('.station-select').text(tb_second);
					console.log('最近车站',nearNum);
					$.each($('.load-item'),function(){
						var loadWith=1/(totalNum+5);
		
						var roadWidth=$('.footer-road').width();

						var percent=loadWith*(roadWidth-Number(totalNum*10))
					
						$(this).css('width',percent+"px");
					})
					for(var i=0;i<=nearNum;i++)
					{
						$('.road-item').eq(i).css({'background':'#65abef','border':'1px solid #65abef'});
						
						//设置一个不可见区域，为road-item提供点击区域
					}

					for(var i=0;i<nearNum+1;i++)
					{

							if(i==nearNum-1)
								{
									$('.road-item').eq(i).append('<div class="cd-item" style="background:url(./img/cd.png) no-repeat;background-size:contain">'+
															'<div class="station-item">'+
																'<div class="station-list">站点名</div>'+
																'<div class="station-list">到达时间</div>'+
																'<div class="station-list">满载率</div>'+
															'</div>'+
															'<div class="cd-detail">'+
																'<div class="cd-list">'+tb_forth+'</div>'+
																'<div class="cd-list">'+tb_fifth+'</div>'+
																'<div class="cd-list">'+tb_seventh+'</div>'+
															'</div>'+
														'</div>'
													);
								}
							else
							{
								$('.road-item').eq(i).append('<div class="cd-item" style="background:url(./img/cd.png) no-repeat;background-size:contain">'+
															'<div class="station-item">'+
																'<div class="station-list">站点名</div>'+
																'<div class="station-list">到达时间</div>'+
																'<div class="station-list">满载率</div>'+
															'</div>'+
															'<div class="cd-detail">'+
																'<div class="cd-list">'+dataList[i].item1+'</div>'+
																'<div class="cd-list">'+dataList[i].item2+'</div>'+
																'<div class="cd-list">'+dataList[i].item3+'</div>'+
															'</div>'+
														'</div>'
													);
							}								
						$('.road-item').eq(i).append('<div class="vision-item"></div>');
						if(i==nearNum-1)
						{
							$('.road-item').eq(i).find('.cd-item').show();
						}

						$('.vision-item').eq(i).click(function(){
							$(this).parent().siblings().find('.cd-item').hide();
							$(this).parent().find('.cd-item').show();
						});	
					}	
						for(var i=0;i<nearNum;i++)
						{
								$('.load-item').eq(i).css('background','#65abef');
						}
				},500);


			}
		})
	}







