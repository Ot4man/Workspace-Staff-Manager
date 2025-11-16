const addworkerpopup =document.getElementById("addworkerpopup");
const closepopup =document.getElementById("closepopup");
const submitworker =document.getElementById("submitworker");
const addWorkerBtn =document.getElementById("addWorkerBtn");


///////////////////

addWorkerBtn.addEventListener("click",() => {
    addworkerpopup.classList.remove("hidden");
});
closepopup.addEventListener("click",() => {
    addworkerpopup.classList.add("hidden");
});
addworkerpopup.addEventListener("click", (e) => {
    if(e.target === addworkerpopup){
        addworkerpopup.classList.add("hidden");
    }
});




