"use strict";

const adviceText = document.querySelector(".card__content");
const adviceID = document.querySelector(".card__advice");
const dice = document.querySelector(".dice");
const circle = document.querySelector(".circle");
const root = document.documentElement;
const body = document.body;
let errorPopup = `<div class="error-popup">
<img
  src="images/circle-xmark-solid.svg"
  alt="error icon"
  class="error-popup__icon"
/>
<div class="error__content">
  <h3 class="error-popup__heading">Error. Try again later.</h3>
  <p class="error-popup__text">
    Please wait at least 2 seconds before clicking the button.
  </p>
</div>
</div>`;
const fadeOut = [{ opacity: "1" }, { opacity: "0" }];
const fadeOutTiming = {
  duration: 1500,
  iterations: 1,
};

async function getSlip() {
  let slip;
  const res = await fetch("https://api.adviceslip.com/advice");

  slip = await res.json();
  adviceID.textContent = `Advice #${slip.slip.id}`;
  adviceText.textContent = `"${slip.slip.advice}"`;
}
getSlip();

let timeoutId = null;
dice.addEventListener("click", (e) => {
  if (timeoutId !== null) {
    circle.classList.add("shake");
    circle.classList.add("error");
    body.insertAdjacentHTML("beforeend", errorPopup);
    const errorPopupElement = document.querySelector(".error-popup");
    setTimeout(() => {
      circle.classList.remove("shake");
      circle.classList.remove("error");
      errorPopupElement.animate(fadeOut, fadeOutTiming).onfinish = () =>
        errorPopupElement.remove();
    }, 1000);
  } else {
    circle.classList.add("no-hover");
    timeoutId = setTimeout(() => {
      circle.classList.remove("no-hover");
      timeoutId = null;
    }, 1000);
  }
  if (circle.classList.contains("shake")) e.preventDefault();

  getSlip();
});
