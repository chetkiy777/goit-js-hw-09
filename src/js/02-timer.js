import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')
const daysOutput = document.querySelector('[data-days]')
const hoursOutput = document.querySelector('[data-hours]')
const minutesOutput = document.querySelector('[data-minutes]')
const secondsOutput = document.querySelector('[data-seconds]')

startBtn.disabled = 'disabled'

let timerId = null

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (this.selectedDates[0] > Date.now()) {
        startBtn.disabled = null
      } else {
        return Notiflix.Notify.failure('Please choose a date in the future');
      }
    },
}

const fp = flatpickr(inputEl, options)


function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const mins = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const secs = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, mins, secs };
}

const timer = {
  start() {
      let selectedTime = fp.selectedDates[0].getTime();
      let currentTime = Date.now()
      timerId = setInterval(() => {
        
      currentTime = Date.now()
      const deltaTime = selectedTime - currentTime
      const { days, hours, mins, secs } = convertMs(deltaTime)

      daysOutput.textContent = days
      hoursOutput.textContent = hours
      minutesOutput.textContent = mins
      secondsOutput.textContent = secs
      // let sum = (Number(days) + Number(hours) + Number(mins) + Number(secs))
      
        if (deltaTime <= 1000) {
          clearInterval(timerId)
        }

      }, 1000)
      
    
    startBtn.disabled = 'disabled'
    } 
  }

startBtn.addEventListener('click', timer.start)
