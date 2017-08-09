function tableShow(userid){
		$.ajax({
			type:'get',
			data:{
				table_id:userid
			},
			typeData:'json',
			url:server+"table",
			success:function(){			
				createTable(1,5);
				$('.nav-page-change1').extendPagination({
			
			            totalCount: totalCount,
			
			            showPage: showCount,
			
			            limit: limit,
			
			            callback: function (curr, limit, totalCount) {
			
			                createTable(curr, limit, totalCount);
			            }	
			    });
				        //图表点击事件
				    }
				    //createTable end
			}
		})
	}


function createTable(currPage, limit, total) {
	$.ajax({
		type:'get',
			data:{
				curr:currpage
			},
			typeData:'json',
			url:server+"currpage",
			success:function(res){
				var data=res.data[0];
				console.log('data',data);
				var i=0;
				for(var key in data)
				{
					i++;
				}
				totalCount=i;
				showCount=10;
				limit=5;
				var html="", showNum = limit;
				
				        if (total - (currPage * limit) < 0) 
				        {
				        	showNum = total - ((currPage - 1) * limit);
				        }
				        html+=' <table class="table table-hover piece">';
				        html+=' <thead><tr><th>车牌号</th><th>上下行站点</th><th>发车时间</th><th>最近公交站</th><th>经过时间</th><th>最近公交站上下车人数</th><th>满载率</th><th>详情</th></tr></thead><tbody>';
				  		console.log('currentpage',currPage);
				  		var k =(currPage-1)*limit;
				  		var i=-1;
				        for(var key in data){
				        	i++;
				        	if(i>=k&&i<=k+4)
				        	{
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
				        }
				        
				         html+='</tbody></table>';
				         var mainObj = $('.info-main-nav');
				
				        mainObj.empty();
				        mainObj.append(html);


				        //图表点击事件
				        
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