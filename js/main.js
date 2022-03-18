const aChoices = ["yes", "no", "maybe", "most definitely", "I think so"];

document.getElementById("magic8ball").addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const nChoice = Math.floor(Math.random() * aChoices.length);
    document.getElementById("answer").innerHTML = aChoices[nChoice];
});

window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }