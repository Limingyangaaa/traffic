	var server="http://127.0.0.1:8888/";
	var encrypt=sessionStorage.getItem('token');
	console.log(encrypt);


		$.ajax({
		type:"post",
		url:server + "auth",
		async:false,
		data:{
			"token":encrypt
		},
		typeData:"json",
		success:function(res){
			console.log('res');
			if(res.message == "error"||!encrypt){//当接通真数据时，去掉||encrypt
				window.location = "login.html";
			}
		},
		error:function(res){
			throw new Error("login/auth网络请求失败，错误代码：" + res.status)
		}
	})


	
