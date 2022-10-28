let elRef = selector => document.querySelector(selector);

let timerId = null;

elRef('[data-stop]').disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

elRef('[data-start]').addEventListener('click', onStartBtnClck);
elRef('[data-stop]').addEventListener('click', onStopBtnClck);

function onStartBtnClck() { 
    elRef('[data-start]').disabled = true;
    elRef('[data-stop]').disabled = false;
    timerId = setInterval(() => { 
        elRef('body').style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function onStopBtnClck() { 
    clearInterval(timerId);
    elRef('[data-start]').disabled = false;
    elRef('[data-stop]').disabled = true;
}
