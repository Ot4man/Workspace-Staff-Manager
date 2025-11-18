// modales.js
export function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.remove("hidden");
}

export function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.add("hidden");
}

export function addCloseEventListener(popupId, closeBtnId) {
    const closeBtn = document.getElementById(closeBtnId);
    closeBtn.addEventListener("click", () => closePopup(popupId));
}

