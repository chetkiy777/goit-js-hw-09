function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const bodyEl = document.querySelector('body')


let timerId = null;



startBtn.addEventListener('click', startChanging)
stopBtn.addEventListener('click', stopChanging)

function startChanging() {
  onPressed = true;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor()
  }, 1000)
  startBtn.disabled = "disabled"
  
}

function stopChanging() {
  clearInterval(timerId)
  startBtn.disabled = null
}




