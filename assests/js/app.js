const addworkerpopup =document.getElementById("addworkerpopup");
const closepopup =document.getElementById("closepopup");
const submitworker =document.getElementById("submitworker");
const addWorkerBtn =document.getElementById("addWorkerBtn");
/////////////
const inputurl = document.getElementById("urlimage");
const txtpreview = document.getElementById("txtpreview");
const imagepreview = document.getElementById("image");

///////////////////
// popup buttons : add worker ,close 
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
//showing image function
inputurl.addEventListener("input",showimage);
function showimage(){
    let url = inputurl.value;
    if(url !== ""){
        imagepreview.src = url;
        imagepreview.classList.remove("hidden");
        txtpreview.classList.add("hidden")
    }else{
        imagepreview.classList.add("hidden");
        txtpreview.classList.remove("hidden");
    }
}






