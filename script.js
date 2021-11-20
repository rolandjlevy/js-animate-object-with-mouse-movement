const touchEnabled = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

const getCssVar = (prop) => getComputedStyle(document.body).getPropertyValue(prop);

const moveEvent = touchEnabled() ? 'ontouchmove' : 'onmousemove';

const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

let counter = 1;

document.onclick = (event) => {
  if (counter++ >= 100) return;
  const block = document.createElement('div');
  const classes = ['block', 'fade-in'];
  block.classList.add(...classes);
  $('.container').appendChild(block);
  const rotate = getTransform(event).rotate;
  const scale = getTransform(event).scale;
  block.style.transform = `${rotate} ${scale}`;
}

document[moveEvent] = (event) => {
  const rotate = getTransform(event).rotate;
  const scale = getTransform(event).scale;
  $('.dial-arm').style.transform = rotate;
  $$('.block').forEach(item => {
    item.style.transform = `${rotate} ${scale}`;
  });
}

const getTransform = (event) => {
  const evt = touchEnabled() ? event.touches[0] : event;
  const ratioX = window.innerWidth / 360;
  const ratioY = window.innerWidth / 3;
  const degrees = Math.ceil(evt.clientX / ratioX);
  const size = 0.1 + evt.clientY / ratioY;
  return {
    rotate: `rotate(${degrees}deg)`,
    scale: `scale(${size})`
  }  
}