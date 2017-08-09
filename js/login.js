var server="http://127.0.0.1:8888/"

$(function(){

$("#user").keyup(function(event){
	if(event.keyCode==13)
	{
		$('.login-button').click();
	}
})

$("#password").keyup(function(event){
	if(event.keyCode==13)
	{
		$('.login-button').click()
	}
})

$(".login-button").click(function(){
	var username = $("#user").val()
	var pass = $("#password").val()
	sessionStorage.setItem("users",username);
	if (username == "" || password == "") {
		alert("用户名或密码不能为空")
	}else{
		$.ajax({
			type:"post",
			url:server+"login",
			data:{
				user_name:username,
				password:pass
			},
			typeData:"json",
			success:function(res){
				//var res=eval('('+response+')');
				console.log(res);
				console.log(res.message);
				console.log(res.data);
				
				//console.log(dataObj) 
				
				//var data=eval('('+res+')')
				//console.log(data)
				if (res.message == "success") {
					sessionStorage.setItem("token",res.data)

					loginAuth(res.data)					
				}else if(res.message == "error"){
					alert("用户名和密码不匹配！")
				}
			},
			error:function(res){
				throw new Error("login网络请求失败，错误代码：" + res.status)
			}
		})
	}
})


function loginAuth(encrypt){
	$.ajax({
		type:"post",
		url:server + "auth",
		data:{
			"token":encrypt
		},
		typeData:"json",
		success:function(res){console.log(res);console.log(res.message);
			if (res.message == "success") {
				var userMsg = {}
				userMsg.userId = res.data.userId
				userMsg.userName = res.data.userName
				userMsg.rank = res.data.password
				sessionStorage.setItem("user",JSON.stringify(userMsg))
				window.location = "index.html";
		
			}else if(res.message == "error"){
				alert("登陆验证失败！")
			}
		},
		error:function(res){
			//var res=eval('('+response+')');
			throw new Error("login/auth网络请求失败，错误代码：" + res.status)
		}
	})
}


});