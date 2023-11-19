const ENGLISH_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const REPLACED_ALPHABET = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘꞯʀꜱᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘꞯʀꜱᴛᴜᴠᴡxʏᴢ";

const translationMap = new Map();
for (var i = 0; i < ENGLISH_ALPHABET.length; i++) {
  translationMap.set(ENGLISH_ALPHABET.charAt(i), REPLACED_ALPHABET.charAt(i));
}

function replace(input) {
  let newString = [];
  for (var i = 0; i < input.length; i++) {
    const currentChar = input.charAt(i);
    newString[i] = translationMap.get(currentChar) || currentChar;
  }
  return newString.join("");
}

function setToLastContent(key, element) {
  const value = localStorage.getItem(key);
  if (value == undefined) return;
  element.value = value;
}

const output = document.querySelector("#output");
const input = document.querySelector("#input");
setToLastContent("input", input);
setToLastContent("output", output);

input.addEventListener("input", () => {
  localStorage.setItem("input", input.value);
  localStorage.setItem("output", replace(input.value));
  setToLastContent("output", output);
  output.scrollTop = output.scrollHeight;
})

new ResizeObserver(() => {
  output.style.height = input.style.height;
}).observe(input, {
  attributes: true, attributeFilter: ["style"]
})

const activationMap = new Map();
function switchClass(button, className) {
  activationMap.set(className, !activationMap.get(className) || false);
  if (activationMap.get(className)) {
    output.classList.add(className);
    button.classList.add("active");
  } else {
    output.classList.remove(className);
    button.classList.remove("active");
  }
}

const boldButton = document.querySelector("#bold-button");
const italicButton = document.querySelector("#italic-button");
boldButton.addEventListener("click", () => switchClass(boldButton, "bold"));
italicButton.addEventListener("click", () => switchClass(italicButton, "italic"));

const copyButton = document.querySelector("#copy-button");
const copyIcons = document.querySelector(".copy-icons");
const iconCopied = document.querySelector("#icon-copied");

let isAnimating = false;
copyButton.addEventListener("click", () => {
  if (navigator.clipboard != undefined) {
    navigator.clipboard.writeText(output.value);
  }
  copyIcons.classList.add("copy-done")
  if (isAnimating) return;
  isAnimating = true;
  setTimeout(() => {
    iconCopied.classList.add("hidden");
    setTimeout(() => {
      copyIcons.classList.remove("copy-done")
      iconCopied.classList.remove("hidden");
      isAnimating = false;
    }, 500);
  }, 1500)
})
