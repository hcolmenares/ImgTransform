/*** Establecer elementos ***/

let rotacion = 1;
let isNegativo = false;
let isBlur = false;
let isCutting = false;
const containerDiv = document.getElementById("container");
const canvasDiv = document.getElementById("canvas");
const optionsDiv = document.getElementById("options");
const verNegativoDiv = document.getElementById("verNegativo");
const slider = document.getElementById("slider");
const circleSize = document.getElementById("circleSize");
const subtractBtn = document.getElementById("subtract");
const addBtn = document.getElementById("add");
const subtractBlurBtn = document.getElementById("subtractBlur");
const addBlurBtn = document.getElementById("addBlur");
const slidecontainer = document.getElementById("slidecontainer");
const rotateRight = document.getElementById("rotateRight");
const rotateLeft = document.getElementById("rotateLeft");
const fileInput = document.getElementById("fileInput");
const updload = document.getElementById("updload");
const blurBtn = document.getElementById("blur");
const applyMaskBtn = document.getElementById("applyMask");
const slideBarBtn = document.getElementById("slideBar");

/*** Añadir Listerner ***/

updload.addEventListener("click", function () {
  slider.value = 5;
  fileInput.click();
});

rotateRight.addEventListener("click", function () {
  let rotacionFinal = 90 * rotacion;
  rotateImage(rotacionFinal);
  if (rotacion < 4) {
    rotacion++;
  } else {
    rotacion = 1;
  }
});

rotateLeft.addEventListener("click", function () {
  let rotacionFinal = -90 * rotacion;
  rotateImage(rotacionFinal);
  if (rotacion < 4) {
    rotacion++;
  } else {
    rotacion = 1;
  }
});

fileInput.addEventListener("change", function (e) {
  setImage(e);
});

verNegativoDiv.addEventListener("click", function () {
  const img = document.querySelector(".canvas");
  isNegativo
    ? (img.style.filter = `hue-rotate(0deg)`)
    : (img.style.filter = `hue-rotate(90deg)`);
  isNegativo = !isNegativo;
});

subtractBlurBtn.addEventListener("click", function () {
  let varNumber = Number(slider.value) - 1;
  if (varNumber <= 1) {
    slider.value = 1;
    subtractBlurBtn.setAttribute("disabled", true);
    return;
  }
  addBlurBtn.removeAttribute("disabled", true);
  aplicateBlur(varNumber);
  slider.value = varNumber;
});

addBlurBtn.addEventListener("click", function () {
  let varNumber = Number(slider.value) + 1;
  if (varNumber >= 100) {
    slider.value = 100;
    addBlurBtn.setAttribute("disabled", true);
    return;
  }
  subtractBlurBtn.removeAttribute("disabled", true);
  aplicateBlur(varNumber);
  slider.value = varNumber;
});

blurBtn.addEventListener("click", function () {
  if (!isBlur) {
    aplicateBlur(slider.value);
    slidecontainer.classList.remove("oculto");
  } else {
    aplicateBlur(1);
    slidecontainer.classList.add("oculto");
  }
  isBlur = !isBlur;
});

slider.addEventListener("change", function () {
  console.log("banderita", slider.value);
  aplicateBlur(slider.value);
});

subtractBtn.addEventListener("click", function () {
  let varNumber = Number(circleSize.value);
  if (varNumber <= 10) {
    subtractBtn.setAttribute("disabled", true);
    circleSize.value = 10;
    return;
  }
  circleSize.value = varNumber - 10;
  adjustCircleSize();
});

addBtn.addEventListener("click", function () {
  circleSize.value = Number(circleSize.value) + 10;
  subtractBtn.removeAttribute("disabled", true);
  adjustCircleSize();
});

circleSize.addEventListener("change", function () {
  adjustCircleSize();
});

applyMaskBtn.addEventListener("click", function () {
  makeMask();
  if (!isCutting) {
    slideBarBtn.classList.remove("oculto");
  } else {
    slideBarBtn.classList.add("oculto");
  }
  isCutting = !isCutting;
});

/*** Funciones ***/

function setImage(e) {
  containerDiv.classList.add("tablet");
  let oldImage = document.querySelector(".canvas");
  if (oldImage) {
    oldImage.remove();
  }

  canvasDiv.classList.remove("oculto");
  optionsDiv.classList.remove("oculto");

  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function (f) {
    let img = document.createElement("img");
    img.classList.add("canvas");
    img.setAttribute("id", "canvasImg");
    img.src = f.target.result;
    canvasDiv.appendChild(img);
  };
  reader.readAsDataURL(file);
}

function rotateImage(degrees) {
  let img = document.querySelector(".canvas");
  if (!img) return;

  // Aplicar la transformación de rotación a la imagen
  img.style.transform = `rotate(${degrees}deg)`;
}

function aplicateBlur(number) {
  const finalValue = number * 0.1;
  let img = document.querySelector(".canvas");
  img.style.filter = `blur(${finalValue}px)`;
}

function makeMask() {
  if (!isCutting) {
    let mask = document.createElement("div");
    mask.classList.add("mask");
    mask.setAttribute("id", "mask");
    canvasDiv.appendChild(mask);
  } else {
    let mask = document.getElementById("mask");
    mask.remove();
  }
}

function adjustCircleSize() {
  const mask = document.getElementById("mask");
  const finalValue = circleSize.value;
  mask.style.setProperty("--circle-size", `${finalValue}px`);
}
