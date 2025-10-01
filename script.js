const firebaseConfig = {
    apiKey: "YOUR_API_KEY", 
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    // ...
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const commonDbPath = 'cross_chat_messages'; 
const messagesRef = database.ref(commonDbPath);



const chatFormuse1 = document.getElementById('chatFormuse1');
const usernameuse1Input = document.getElementById('usernameuse1');
const messageuse1Input = document.getElementById('messageuse1');
const chatBoxuse1 = document.getElementById('chatBoxuse1');

const chatFormuser2 = document.getElementById('chatFormuser2');
const usernameuser2Input = document.getElementById('usernameuser2');
const messageuser2Input = document.getElementById('messageuser2');
const chatBoxuser2 = document.getElementById('chatBoxuser2');



function sendMessageHandler(usernameInput, messageInput) {
    const username = usernameInput.value.trim();
    const messageText = messageInput.value.trim();

    if (username && messageText) {
        const newMessage = {
            username: username,
            text: messageText,
            timestamp: Date.now()
        };


        messagesRef.push(newMessage)
            .then(() => {
                messageInput.value = ''; 
            })
            .catch((error) => {
                console.error("Error writing message to Firebase: ", error);
                alert("don't send the massage");
            });
    } else {
        alert("please type.");
    }
}


function displayMessage(username, text, timestamp, chatBoxRef) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageElement.innerHTML = `
        <span class="username">${username}</span>
        <span class="time">(${time})</span>: 
        <p class="text">${text}</p>
    `;

    chatBoxRef.appendChild(messageElement);
    chatBoxRef.scrollTop = chatBoxRef.scrollHeight; 
}


chatFormuse1.addEventListener('submit', (e) => {
    e.preventDefault();
   
    sendMessageHandler(usernameuse1Input, messageuse1Input);
});


chatFormuser2.addEventListener('submit', (e) => {
    e.preventDefault();
   
    sendMessageHandler(usernameuser2Input, messageuser2Input);
});

messagesRef.limitToLast(100).on('child_added', (snapshot) => {
    const message = snapshot.val();
    
    
    displayMessage(message.username, message.text, message.timestamp, chatBoxuse1);
    

    displayMessage(message.username, message.text, message.timestamp, chatBoxuser2);
});
