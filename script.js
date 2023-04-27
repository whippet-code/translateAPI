// fetch request URL
const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";
// user input
let userInput;
// translation result
let translationResult;

// build options object for fetch request using user Input
const buildRequestOptions = (userInput) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "70502f8931msh2d22c387419d4f6p1c3a5djsn5369f9892607",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: new URLSearchParams({
      q: userInput,
      format: "html",
      target: "fr",
      source: "en",
    }),
  };
  return options;
};

// function to send fetch request built from url and user options object
const translate = async (options) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    translationResult = result.data.translations[0].translatedText;
    showResult();
  } catch (error) {
    console.error(error);
  }
};

// funtion to display result in result element
const showResult = () => {
  resultElement.innerHTML = translationResult;
};

const submitRequest = () => {
  if (userInputElement.value === "") {
    alert("Please enter a text to translate");
  } else {
    userInput = userInputElement.value;
    const options = buildRequestOptions(userInput);
    translate(options);
  }
};

// get user input Element
const userInputElement = document.querySelector("#text");
// get button element
const submitButton = document.querySelector("#translate");
// get result element
const resultElement = document.querySelector("#result");

// add event listener to button
submitButton.addEventListener("click", submitRequest);

// add event listener to input field and send request on enter key press
userInputElement.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    submitRequest();
  }
});
