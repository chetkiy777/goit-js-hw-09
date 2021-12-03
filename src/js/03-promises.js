import Notiflix from "notiflix";


const form = document.querySelector('.form')

function createPromise(position, newDelay) {
  const shouldResolve = Math.random() > 0.5;
    return new Promise((resolve, reject) => {
     
        if (shouldResolve) {
          resolve({position, newDelay})
        } else {
         
          reject({position, newDelay})
        }
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const form = e.currentTarget
  let delay = +form['delay'].value
  const amount = +form['amount'].value
  const step = +form['step'].value
  let position = 0
  
    for (let i = 1; i <= amount; i += 1) {
      position = i
      
      const firstDelay = delay
      let newDelay = delay += step

      createPromise(position, firstDelay, newDelay)
          
      
        .then(({ position, newDelay }) => {
            
          setTimeout(() => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${newDelay}ms`);
          }, newDelay)
        })
    
        .catch(({ position, newDelay }) => {
            
          setTimeout(() => {
            Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${newDelay}ms`);
          }, newDelay)
        })
    }
})
      
    




