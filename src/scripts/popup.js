export function showPopup(message) {
  document.querySelector(".overlay").style.display = "flex";
  document.querySelector(".win-popup").style.display = "flex";
  document.querySelector(".winner-message").textContent = `${message} wins!`;
}

export function hidePopup() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".win-popup").style.display = "none";

}