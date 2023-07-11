const userInputForm = document.getElementById('user-input-form');
const userInputText = document.getElementById('user-input');
const chatbotConversation = document.getElementById('chatbot-conversation'); 


// Storing objects
const conversationArr = [
  {
    role: 'system',
    content: 'You are a useful assistant.'
  }
]

const addSpeechBubble = (role, content) => {
  const newSpeechBubble = document.createElement('div');
  newSpeechBubble.classList.add('speech', `speech-${role}`);
  newSpeechBubble.textContent = content;
  chatbotConversation.appendChild(newSpeechBubble);
};

const scrollToBottom = () => {
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
};

userInputForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById("send-icon").style.transform="scale(1.2)";
  setTimeout(() => {
    document.getElementById("send-icon").style.transform="scale(1)";
  },300);
  

  const prompt = userInputText.value.trim();

  conversationArr.push({
    role: 'user',
    content: prompt
  })
  console.log(conversationArr);

  if (prompt !== '') {
    userInputText.value = '';
    addSpeechBubble('human', prompt);
  }

  try{
    const response = await fetch('/api/conversation', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    console.log(data);
    addSpeechBubble('ai', data.message);
    scrollToBottom();
    
    // chatbotConversation.textContent = data.message;
  } catch (error) {
    console.error('Error: ', error.message);
  }

});

