function addMessage(text, sender) {
    const chat = document.getElementById("chat-box");

    const message = document.createElement("div");
    message.className = "message " + sender;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    message.innerHTML = `
        <div class="bubble">
            ${text}
            <br>
            <small>${time}</small>
        </div>
    `;

    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();

    if (text === "") return;

    // Show user message
    addMessage(text, "user");
    input.value = "";

    // Show typing message
    addMessage("🤖 Typing...", "bot");

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: text
        })
    })
        .then(response => response.json())
        .then(data => {
            const chat = document.getElementById("chat-box");

            // Remove typing message
            chat.removeChild(chat.lastChild);

            // Show bot reply after 1 second
            setTimeout(() => {
                addMessage(data.reply, "bot");
            }, 1000);
        })
        .catch(error => {
            console.error(error);

            const chat = document.getElementById("chat-box");
            chat.removeChild(chat.lastChild);

            addMessage("❌ Error connecting to server.", "bot");
        });
}

document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function clearChat() {
    document.getElementById("chat-box").innerHTML = "";

    addMessage(
        "👋 Welcome to the Student AI Chatbot!<br><br>I can help you with:<br>🎓 Admissions<br>📚 Courses<br>📝 Exams<br>🏨 Hostel<br>💼 Placements<br>📞 Contact Information",
        "bot"
    );
}

window.onload = function () {
    clearChat();
};