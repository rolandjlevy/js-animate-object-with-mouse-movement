const touchEnabled = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

const moveEvent = touchEnabled() ? 'ontouchmove' : 'onmousemove';
const clickEvent = touchEnabled() ? 'ontouchstart' : 'onclick';

const getCssVar = (prop) => getComputedStyle(document.body).getPropertyValue(prop);


const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

let counter = 1;
const MAX_BLOCKS = 25;

document[clickEvent] = (event) => {
  if (counter++ >= MAX_BLOCKS) return;
  const block = document.createElement('div');
  block.setAttribute('data-counter', counter);
  const classes = ['block', 'fade-in'];
  block.classList.add(...classes);
  $('.container').appendChild(block);
  const rotate = getTransform(event, counter).rotate;
  const scale = getTransform(event).scale;
  block.style.transform = `${rotate} ${scale}`;
}

document[moveEvent] = (event) => {
  $('.dial-arm').style.transform = getTransform(event).rotate;
  $$('.block').forEach((item) => {
    const rotate = getTransform(event, item.dataset.counter).rotate;
    const scale = getTransform(event).scale;
    item.style.transform = `${rotate} ${scale}`;
  });
}

const getTransform = (event, index = 0) => {
  const evt = touchEnabled() ? event.touches[0] : event;
  const ratioX = window.innerWidth / 360;
  const ratioY = window.innerWidth / 5;
  const degrees = Math.ceil((evt.clientX) / ratioX) + Number(index) * 4;
  const size = 0.1 + evt.clientY / ratioY;
  return {
    rotate: `rotate(${degrees}deg)`,
    scale: `scale(${size})`
  }  
}