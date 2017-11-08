let getUsername = () => {
  let random = Math.round(Math.random() * 5);
  if (random === 0) {
    return 'professor';
  } else {
    return `student${random}`;
  }
}

// Current User
let user = {
  'username': getUsername()
}

// Set the guest username into the view
document.getElementById('username').innerText = user.username;

// Add the message to the view
let addMessage = data => {
  let chatPool = document.getElementById('chat');
  let html = chatPool.innerHTML;
  chatPool.innerHTML = `${html}<li>${data.sender}: ${data.message}</li>`;
}

// Socket
let socket = io.connect('http://localhost:9191');
socket.on('connect', () => {
  socket.emit('join', user.username);
  socket.on('update', msg => {
    console.log(msg);
  });

  socket.on('receive', data => {
    addMessage(data);
  });
});

document.getElementById('msg').onkeypress = () => {
  if (event.keyCode == 13) {
    let message = {
      'sender': user.username,
      'message': msg.value
    };

    socket.emit('send', message);
    msg.value = '';
  }
};