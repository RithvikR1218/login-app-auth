function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var url = "http://localhost:5000/auth/register";

    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //callback function
    xhr.onload = function () {
        console.log(username)
        const nooURL = 'http://localhost:5000/auth/login'; 
        window.location.href = nooURL;
    };

    //JSON object
    var data = {
        username: username,
        password: password
    };

    // Send the request after converting the data to JSON
    xhr.send(JSON.stringify(data));
}