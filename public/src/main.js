
const chatbotConversation = document.getElementById('chatbot-conversation'); 

const conversationArr = [
  {
    role: 'system',
    content: 'You are useful assistance.' //this is the instruction
  }
];



document.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById("send-icon").style.transform="scale(1.2)";
  setTimeout(() => {
    document.getElementById("send-icon").style.transform="scale(1)";
  },300);
  // get text input field from user
  const userInput = document.getElementById('user-input');
  // create new div
  const newSpeechBubble = document.createElement('div');
  // assign CSS class to it
  newSpeechBubble.classList.add('speech', 'speech-human');
  // append speech bubble to conversation
  chatbotConversation.appendChild(newSpeechBubble);
  // add the user's input text to the speech bubble
  newSpeechBubble.textContent = userInput.value;

  // push object to conversationArr, with role and content assigned
  conversationArr.push({
    role: 'user',
    content: userInput.value,
  })
  console.log(conversationArr);
  // Clear user input
  userInput.value =' ';
  // scroll to the bottom
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
});

console.log(conversationArr.length);

