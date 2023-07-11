const userInputForm = document.getElementById('user-input-form');
const userInputInput = document.getElementById('user-input');
const chatbotConversation = document.getElementById('chatbot-conversation'); 

const addSpeechBubble = (role, content) => {
  const newSpeechBubble = document.createElement('div');
  newSpeechBubble.classList.add('speech', `speech-${role}`);
  newSpeechBubble.textContent = content;
  chatbotConversation.appendChild(newSpeechBubble);
};

const scrollToBottom = () => {
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
};

const fetchConversation = () => {
  fetch('/api/conversation')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((speechBubble) => {
        addSpeechBubble(speechBubble.role, speechBubble.content);
      });

      scrollToBottom();
    })
    .catch((error) => {
      console.error('Error fetching conversation:', error);
    });
};

const sendUserInput = (userInput) => {
  fetch('/api/conversation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // addSpeechBubble('user', input);
      addSpeechBubble('assistant', data.response);
      scrollToBottom();
    })
    .catch((error) => {
      console.error('Error sending user input:', error);
    });
};


userInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById("send-icon").style.transform="scale(1.2)";
  setTimeout(() => {
    document.getElementById("send-icon").style.transform="scale(1)";
  },300);
  

  const userInput = userInputInput.value.trim();

  if (userInput !== '') {
    sendUserInput(userInput);
    userInputInput.value = '';
  }

});

fetchConversation();