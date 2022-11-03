const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', e => {
  if (e.code.toLowerCase() === 'space') {
    e.preventDefault();
    setRandomColors();
  }
});

setTimeout(() => {
  const sb = document.querySelector('#snackbar');
  sb.textContent = 'Push SPACE';
  sb.className = 'show';
  setTimeout(() => {
    sb.className = sb.className.replace('show', '');
  }, 3500);
}, 500);

document.addEventListener('click', e => {
  const type = e.target.dataset.type;
  const sb = document.querySelector('#snackbar');

  if (type === 'lock') {
    const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');

    if (node.classList.contains('fa-lock-open')) {
      sb.textContent = 'Unlocked color';
    } else {
      sb.textContent = 'Locked color';
    }

    sb.className = 'show';
    setTimeout(() => {
      sb.className = sb.className.replace('show', '');
    }, 3500);
  } else if (type === 'copy') {
    copyToClickboard(e.target.textContent);
    sb.textContent = 'Successfully copied';
    sb.className = 'show';
    setTimeout(() => {
      sb.className = sb.className.replace('show', '');
    }, 3500);
  }
});

const hexData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const color = isInitial && colors[index] ? colors[index]: chroma.random();

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorHash(colors);
}

setRandomColors(true);

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorHash(colors = []) {
  document.location.hash = colors.toString().replace(/,/g, '-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.split('-');
  }
  return [];
}
