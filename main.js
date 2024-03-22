/*** Establecer elementos ***/

let rotacion = 1;
let isNegativo = 1;
const canvasDiv = document.getElementById("canvas");
const optionsDiv = document.getElementById("options");
const verNegativoDiv = document.getElementById("verNegativo");
const slider = document.getElementById("slider");
const slidecontainer = document.getElementById("slidecontainer");
const output = document.getElementById("value");
const rotateRight = document.getElementById("rotateRight");
const rotateLeft = document.getElementById("rotateLeft");
const fileInput = document.getElementById("fileInput");
const updload = document.getElementById("updload");
const blurBtn = document.getElementById("blur");

output.innerHTML = slider.value;

/*** Añadir Listerner ***/

updload.addEventListener("click", function () {
  document.getElementById("fileInput").click();
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
  let img = document.querySelector(".canvas");
  if (!img) return;
  if (isNegativo % 2 == 0) {
    img.style.filter = `hue-rotate(90deg)`;
  } else {
    img.style.filter = `hue-rotate(0deg)`;
  }
  isNegativo++;
});

blurBtn.addEventListener("click", function () {
  aplicateBlur(slider.value);
});

slider.oninput = function () {
  output.innerHTML = this.value;
};

/*** Funciones ***/

function setImage(e) {
  let oldImage = document.querySelector(".canvas");
  if (oldImage) {
    oldImage.remove();
  }

  canvasDiv.classList.remove("oculto");
  optionsDiv.classList.remove("oculto");
  slidecontainer.classList.remove("oculto");

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
  if (!img) return;
  img.style.filter = `hue-rotate(${isNegativo % 2 == 0 ? 0 : 90}deg) blur(${finalValue}px)`;
}
