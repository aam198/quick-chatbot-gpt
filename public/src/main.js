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

function renderTypewriterText(text){
  const newSpeechBubble = document.createElement('div');
  newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor');
  chatbotConversation.appendChild(newSpeechBubble);

  // render each character one by one
  let i = 0;
  const interval = setInterval(() => {
    newSpeechBubble.textContent += text.slice(i-1, i);
    // When response text is completed
    if (text.length === i) {
      // Stops the execution of the function
      clearInterval(interval)
      newSpeechBubble.classList.remove('blinking-cursor')
    }
    // increments value by 1 to move to next character to continue typewriter effect
    i++;
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
  }, 50)
}

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
    renderTypewriterText(data.message);
    conversationArr.push({
      role: 'assistant',
      content: data.message
    })
    console.log('getting data back and adding to array', conversationArr);
    scrollToBottom();
    
    // chatbotConversation.textContent = data.message;
  } catch (error) {
    console.error('Error: ', error.message);
  }

});

