import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let elRef = selector => document.querySelector(selector);
elRef('[data-start]').disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = Date.now();
    const userDate = selectedDates[0].getTime();
    if (userDate <= currentDate) {
      elRef('[data-start]').disabled = true;
      Notiflix.Report.warning('Calendar notification', 'Please choose a date in the future', 'Try one more time' );
    }
    else { 
      elRef('[data-start]').disabled = false; 
    }
  },
};

let calendar = flatpickr('#datetime-picker', options);
let timerId = null;

elRef('[data-start]').addEventListener('click', () => {
  elRef('[data-start]').disabled = true;
  timerId = setInterval(timer, 1000);
});

function timer() { 
  const currentTime = Date.now();
  const userDate = calendar.selectedDates[0].getTime();
  const timeDif = userDate - currentTime;
  const timeComponents = convertMs(timeDif);

  if (timeDif <= 0) { 
    clearInterval(timerId);
    return
  }

  updateClock(timeComponents);
}

function addLeadingZero(value) { 
  return String(value).padStart(2, '0');
}

function updateClock({ days, hours, minutes, seconds }) { 
  elRef('[data-days]').textContent = days;
  elRef('[data-hours]').textContent = hours;
  elRef('[data-minutes]').textContent = minutes;
  elRef('[data-seconds]').textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}