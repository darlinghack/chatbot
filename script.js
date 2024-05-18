let state = 'initial';

function sendMessage() {
    const inputElement = document.getElementById('user-input');
    const message = inputElement.value.trim();
    inputElement.value = '';

    if (message === '') return;

    addMessage('User', message);

    if (state === 'initial' && message.toLowerCase() === 'i want to login') {
        addMessage('Bot', 'Enter your email:');
        state = 'awaiting_email';
    } else if (state === 'awaiting_email') {
        sessionStorage.setItem('email', message);
        addMessage('Bot', 'Enter your password:');
        state = 'awaiting_password';
    } else if (state === 'awaiting_password') {
        sessionStorage.setItem('password', message);
        saveCredentials(sessionStorage.getItem('email'), sessionStorage.getItem('password'));
        addMessage('Bot', 'Login successful');
        state = 'initial';
    }
}

function addMessage(sender, message) {
    const display = document.getElementById('chat-display');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    display.appendChild(messageElement);
    display.scrollTop = display.scrollHeight;
}

async function saveCredentials(email, password) {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    console.log(result);
}
