function submitLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // login request is sent to this url
    var url = "http://localhost:5000/auth/login";

    // XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open("POST", url, true);

    // Set the request headers
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText)
            if(response.token){
                console.log("JWT Token : ", response.token)
                localStorage.setItem('jwtToken', response.token);
                const newURL = 'http://localhost:5000/auth/home'; 
                window.location.href = newURL;
            }else{
                console.log(xhr.responseText)
                alert(xhr.responseText)
            } 
        }else if(username == "admin"){
            const newURL = 'http://localhost:5000/auth/admin'; 
            window.location.href = newURL;
        }else{
            alert("Login failed")
        }
        
    };

    // Prepare the data as a JSON object
    var data = {
        username: username,
        password: password
    };

    // Send the request after converting the data to JSON
    xhr.send(JSON.stringify(data));
}  