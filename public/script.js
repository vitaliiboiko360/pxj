// index.js
// import '@material/web/button/filled-button.js';
// import '@material/web/button/outlined-button.js';
// import '@material/web/checkbox/checkbox.js';

const divElement = document.getElementById('controls');

// divElement.addEventListener('dragstart', (ev) => {
//   ev.dataTransfer.setData('text/html', ev.target.id);
// });

let offsetX, offsetY;

divElement.addEventListener('mousedown', startDragging);
divElement.addEventListener('mouseup', stopDragging);

function startDragging(e) {
  offsetX = e.clientX - divElement.getBoundingClientRect().left;
  offsetY = e.clientY - divElement.getBoundingClientRect().top;
  divElement.classList.add('dragging');
  document.addEventListener('mousemove', dragElement);
}

function dragElement(e) {
  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;
  divElement.style.left = x + 'px';
  divElement.style.top = y + 'px';
}

function stopDragging() {
  divElement.classList.remove('dragging');
  document.removeEventListener('mousemove', dragElement);
}
