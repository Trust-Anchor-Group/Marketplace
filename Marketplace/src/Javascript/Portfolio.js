function changeLoginButton(logedIn)
{	
	const loginBtn = document.getElementById("login_btn");
	if (logedIn == 1){
		
		loginBtn.onclick = location.href='/Marketplace/src/Portfolio.md?LogOut=True';
	}
	else if (logedIn == 0){
		
		loginBtn.onclick = location.href='/Marketplace/src/Portfolio.md?LogIn=True';
	}
	
}


