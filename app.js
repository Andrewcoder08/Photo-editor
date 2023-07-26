const fileInput = document.querySelector("#fileInput");
const canvas = document.querySelector("#canvas");
// canvas context is used for drawing stuff on canvas
const canvasCtx = canvas.getContext("2d");
const brightnessInput = document.querySelector("#brightnessInput");
const saturationInput = document.querySelector("#saturationInput");
const blurInput = document.querySelector("#blurInput");
const inversionInput = document.querySelector("#inversionInput");
// FLOW->
/* 
1) resetSettings called whenever image is loaded and gives default values
2) whenever input fields of brightness, saturation, blur or inversion called updateSettings() is called which updates the value 
after updating the values image is rendered
3) when file is choosen we create object of that file
after file is loaded we resetSettings and we render that image on canvas
the canvas calls the generate filter to see the properties and applies them
*/

// we need a settings object which will have the value for each one of our input properties
// whatever setting we have in our object we will apply that to our image

const settings = {};
//  a variable for image which by default will be null, when page is refreshed
let image = null;

// a function to reset settings, which means when image is loaded all the settings will be put to some default values
function resetSettings() {
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blur = "0";
  settings.inversion = "0";
  //  everytime we choose a new image we want to reset those settings
  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
}

//we will call this resetSettings function initially
resetSettings();

// a function to update these settings

function updateSettings(key, value) {
  // here key is the property like brightness or saturation and value is what we set
  if (image) {
    settings[key] = value;
    // a function to render image on canvas
    renderImage();
  }
}

// we want to add an event listener on each input, everytime it is changed we want to trigger the updateSettings() function

brightnessInput.addEventListener("change", () => {
  updateSettings("brightness", brightnessInput.value);
});

saturationInput.addEventListener("change", () => {
  updateSettings("saturation", saturationInput.value);
});

blurInput.addEventListener("change", () => {
  updateSettings("blur", blurInput.value);
});

inversionInput.addEventListener("change", () => {
  updateSettings("inversion", inversionInput.value);
});

// we need add event listener when we choose a file and render it on the canvas

// in ordet to get an image and display it on canvas we need to take the file and interpret it as an image within an image object because canvas can only accept image objects
fileInput.addEventListener("change", () => {
  image = new Image();
  image.addEventListener("load", () => {
    // when the image loads I want to reset settings
    resetSettings();
    renderImage();
  });
  // how to load image from file into image oject
  image.src = URL.createObjectURL(fileInput.files[0]);
  //   fileInput can accept multiple files we are trying to access the first file from array
  //   createObjectURL takes file and converts it into url which the browser can use to refernce our image
});

// function to apply the filter on image
function generateFilter() {
  // object destructuring, taking properties of object and putting them seperately to work on them
  const { brightness, saturation, blur, inversion } = settings;
  //   we are returning the key because in key only we are passing value;
  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

// function to render image
function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;
  //setting canvas filter
  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}
