window.onload = function () {
    var messages = [];
    var socket = io.connect('http://localhost:3001');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data);
            var html = '';
            for (var i = 0; i < messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ':</b> ';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html; 
            content.scrollTop = content.scrollHeight; 
        } else {
            console.log("There is a problem:", data);
        }
    });

   
    sendButton.onclick = function () {
        if (name.value.trim() === "") {
            alert("Please enter your name before sending a message!");
            return;
        }
        if (field.value.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        var text = field.value;
        socket.emit('send', { message: text, username: name.value });
        field.value = '';
        var names =name.value;
        name.value='' 
    };

    field.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { 
            sendButton.onclick();
        }
    });
};