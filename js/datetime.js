
$(function(){

	$('#datetime').html(moment().subtract('hours', 1).format('YYYY-MM-DD HH:mm') + '-' + moment().format('HH:mm')).css('color','#c7c8ca');
	$('.search-box').daterangepicker(  
                            {  
                                startDate: moment().startOf('day'),  
                                endDate: moment(),  
                                minDate: '01/01/2012',    //最小时间  
                                maxDate : moment(), //最大时间   
                                //起止时间的最大间隔  
                                showDropdowns : true,  
                                showWeekNumbers : false, //是否显示第几周  
                                timePicker : true, //是否显示小时和分钟  
                                timePickerIncrement : 1, //时间的增量，单位为分钟  
                                timePicker24Hour : true, //是否使用12小时制来显示时间  
                                linkedCalendars: false,
                                dateLimit : {  
                                    days : 3000000 ,
                                },
                                ranges : {  
                                    '最近1小时': [moment().subtract('hours',1), moment()],  
                                    '今日': [moment().startOf('day'), moment()],  
                                    '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')]
                                
                                },  
                                opens : 'left', //日期选择框的弹出位置  
                                buttonClasses : [ 'btn btn-default' ],  
                                applyClass : 'btn-small btn-primary blue',  
                                cancelClass : 'btn-small',  
                                format : 'YYYY-MM-DD HH:mm:ss', //控件中from和to 显示的日期格式  
                                separator : ' to ',  
                                locale : {  
                                    applyLabel : '确定',  
                                    cancelLabel : '取消',  
                                    fromLabel : '起始时间',  
                                    toLabel : '结束时间',  
                                    customRangeLabel : '自定义',  
                                    daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
                                    monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                                            '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
                                    firstDay : 1  
                                }  
                            }, function(start, end, label) {//格式化日期显示框  
                                if(start.format('YYYY-MM-DD')===end.format('YYYY-MM-DD'))
                                {
                                	$('#datetime').html(start.format('YYYY-MM-DD HH:mm') + '-' + end.format('HH:mm')).css('color','#4285f4');
                                	$('.date1').hide();
                                	$('.date2').show(); 
                                }
                                else{
                                	$('#datetime').html(start.format('YYYY-MM-DD HH:mm') + '-' + end.format('MM-DD HH:mm')).css('color','#4285f4');
                                	$('.date1').hide();
                                	$('.date2').show(); 
                                }
                                
                                
                           });
})