import Notiflix from 'notiflix';

const formRef = document.querySelector('form');
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) { 
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  const userDelay = Number(delay.value);
  const userStep = Number(step.value);
  const userAmount = Number(amount.value);
  let promiceDelay = userDelay;

  for (let i = 1; i <= userAmount; i += 1) { 
    let position = i;
    createPromise(position, promiceDelay).then(greeting => Notiflix.Notify.success(greeting)).catch(error => Notiflix.Notify.failure(error));
    promiceDelay += userStep;
  }
}

function createPromise(position, promiceDelay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {   
    setTimeout(() => {
      if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${promiceDelay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${promiceDelay}ms`);
    }, promiceDelay);
  });
}