
//DOM elemenets
const submit = document.getElementById("form");

// Popup
const addworkerpopup = document.getElementById("addworkerpopup");
const closepopup = document.getElementById("closepopup");
const addWorkerBtn = document.getElementById("addWorkerBtn");
const cancelworker = document.getElementById("cancelworker");

// Worker inputs
const inputurl = document.getElementById("urlimage");
const txtpreview = document.getElementById("txtpreview");
const imagepreview = document.getElementById("image");
const nameworker = document.getElementById("name");
const workerrole = document.getElementById("workerrole");

// Experience inputs
const companyNameExp = document.getElementById("companyNameExp");
const roleExp = document.getElementById("roleExp");
const startDateExp = document.getElementById("startDateExp");
const endDateExp = document.getElementById("endDateExp");

// Email & phone
const email = document.getElementById("email");
const phone = document.getElementById("phone");

// List in side bar
const unassignedList = document.getElementById("unassignedList");

// Experience add btn
const addExperienceBtn = document.getElementById("addExperienceBtn");

// Profile poppup
const workerProfile = document.getElementById("workerProfile");
const profileContent = document.getElementById("profileContent");

//////////////
// popup events
addWorkerBtn.addEventListener("click", () => {
    addworkerpopup.classList.remove("hidden");
});

closepopup.addEventListener("click", () => {
    addworkerpopup.classList.add("hidden");
});

cancelworker.addEventListener("click", (e) => {
    e.preventDefault();
    addworkerpopup.classList.add("hidden");
});

addworkerpopup.addEventListener("click", (e) => {
    if (e.target === addworkerpopup) {
        addworkerpopup.classList.add("hidden");
    }
});

//////////////
// show image
inputurl.addEventListener("input", showimage);

function showimage() {
    let url = inputurl.value.trim();
    if (url !== "") {
        imagepreview.src = url;
        imagepreview.classList.remove("hidden");
        txtpreview.classList.add("hidden");
    } else {
        imagepreview.classList.add("hidden");
        txtpreview.classList.remove("hidden");
    }
}

//////////////
// validation regex
const validationRules = {
    "name": {
        regex: /^[A-Za-z\s]{2,50}$/,
        message: "Invalid name (only letters, 2-50 characters)."
    },
    "urlimage": {
        regex: /^(https?:\/\/.*\.(jpg|jpeg|png|gif|webp))$/i,
        message: "Invalid image URL (jpg, png, gif, webp)."
    },
    "email": {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format."
    },
    "phone": {
        regex: /^[0-9]{8,15}$/,
        message: "Invalid phone number (8-15)"
    },
    // ""
};

function toggleError(field, show, message = "") {
    const errorDisplay = document.getElementById(`${field}-error`);
    const inputField = document.getElementById(field);
    if (!errorDisplay || !inputField) return;

    if (show) {
        errorDisplay.textContent = message;
        errorDisplay.classList.remove("hidden");
        inputField.classList.add("border-red-500");
    } else {
        errorDisplay.classList.add("hidden");
        inputField.classList.remove("border-red-500");
        inputField.classList.add("border-green-500");
    }
}

function validateField(field, value) {
    const rule = validationRules[field];
    if (rule && !rule.regex.test(value)) {
        toggleError(field, true, rule.message);
        return false;
    } else if (rule) {
        toggleError(field, false);
        return true;
    }
    return true;
}

function validateForm() {
    let isValid = true;
    for (const field in validationRules) {
        const inputField = document.getElementById(field);
        if (inputField && !validateField(field, inputField.value.trim())) {
            isValid = false;
        }
    }
    return isValid;
}

function validateDatesexp() {
    const startDate = document.querySelector(".startDateExp").value;
    const endDate = document.querySelector(".endDateExp").value;
    if (new Date(startDate) > new Date(endDate)) {
        alert("End date must be after start date");
        return false;
    }
    return true;
}
//////////////
// local storage
let workers;
const strdata = localStorage.getItem("workers");
if (strdata) {
    workers = JSON.parse(strdata);
} else {
    workers = [];
}
let unassignedWorkers = workers.filter(w => !w.zoneId);

function saveWorkers() {
    localStorage.setItem("workers", JSON.stringify(workers));
}

//////////////
// Add workers
submit.addEventListener("submit", addworker);
//if()
function addworker(e) {
    e.preventDefault();
    if (!validateForm()) return;
    if (!validateDatesexp()) return;

    const worker = {
        id: Date.now(),
        name: nameworker.value.trim(),
        role: workerrole.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        image: imagepreview.src,
        experiences: getexperiences(),
        zoneId: null
    };
    workers.push(worker);
    unassignedWorkers.push(worker);
    saveWorkers();
    renderWorker(worker);
    addworkerpopup.classList.add("hidden");

    // Clear form 
    submit.reset();
    imagepreview.classList.add("hidden");
    txtpreview.classList.remove("hidden");

    Swal.fire({
    icon: 'success',
    title: 'Worker Added',
    text: `${worker.name} has been addedd`,
    confirmButtonText: 'OK'
});
}


//////////////
// rend profile pop
function renderWorker() {
    // render pour chaque zone
    const zones = ["reception-room", "server-room", "security-room", "archives-room", "staff-room", "conference-room"];
    const filterZoneNull = workers.filter(worker => worker.zoneId === null);
    zones.forEach(zone => {
        const divzone = document.getElementById(zone);
        const filterworkers = workers.filter(worker => worker.zoneId === zone);
        divzone.innerHTML = ""
        filterworkers.forEach(w => {
            divzone.innerHTML += `
        <div class="flex items-center gap-2 bg-white p-1 rounded-lg shadow border border-gray-200">
            <img src="${w.image}" class="w-12 h-12 rounded-full object-cover border border-gray-300">
            <div>
                <p class="text-sm text-center font-bold"> ${w.name}</p>
                <p class="text-xs text-center font-bold">  ${w.role}</p>
            </div>
        </div>
        <button class="text-red-700 font-bold text-lg" onclick="restoremember(${w.id})">X</button>
            `;

        });

    });

    unassignedList.innerHTML = "";
    filterZoneNull.forEach(membernull => {
        unassignedList.innerHTML += `
            <div class="flex items-center gap-4 unassigneddiv cursor-pointer flex justify-between items-center bg-blue-300 border border-gray-200 p-3 rounded-lg" data-id=${membernull.id} >
                <img src="${membernull.image}" class="w-20 h-20 rounded-full object-cover border border-gray-300" onclick="showProfile(this)">
                <div>
                    <p class="text-xl text-center font-bold"> ${membernull.name}</p>
                    <p class="text-l text-center font-bold">  ${membernull.role}</p>
                </div>
                <button class="text-red-700 font-bold text-xl deleteBtn" onclick="deleteWorker(${membernull.id})">X</button>
            </div>
        `;
    })


updateRoomBackgrounds();
}

function restoremember(id) {
    let workerrestore = workers.find(worker => Number(worker.id) === Number(id))
    Object.assign(workerrestore, { zoneId: null })
    saveWorkers()
    renderWorker()
    //sweet alert unassigned
    Swal.fire({
        icon: 'info',
        title: 'Worker unassigned',
        text: `${workerrestore.name} is unassigned.`,
        confirmButtonText: 'OK'
    });
}

function deleteWorker(id) {
    Swal.fire({
        title: 'Are you sure you want delet the worker?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {

            workers = workers.filter(wor => wor.id !== id);
            saveWorkers();
            renderWorker();

            Swal.fire(
                'Deleted!',
                'Worker has been deleted.',
                'success'
            );
        }
    });
}


//////////////
// Load datta
window.addEventListener("DOMContentLoaded", () => {
    workers.forEach(renderWorker);
});

//////////////
// show profile
function showProfile(card) {
    const id = card.closest(".unassigneddiv").dataset.id
    const filtermemeber = workers.find(worker => Number(worker.id) === Number(id))
    let experienceshtml = "";
    filtermemeber.experiences.forEach(exp => {
        experienceshtml += `
                    <div class="bg-gray-100 p-4 rounded-lg space-y-2">
                        <p><strong>Company:</strong> ${exp.company}</p>
                        <p><strong>Role:</strong> ${exp.role}</p>
                        <p><strong>Period:</strong> ${exp.from} - ${exp.to}</p>
                    </div>
                `;
    });
    //injection of html 
    profileContent.innerHTML = `
                <h2 class="text-3xl font-bold text-center mb-6">Profile</h2>
                <div class="flex gap-6 items-center">
                    <img src="${filtermemeber.image}" class="w-32 h-32 rounded-full object-cover border shadow">
                    <div>
                        <p class="text-2xl font-bold">${filtermemeber.name}</p>
                        <p class="text-gray-700 text-lg">${filtermemeber.role}</p>
                    </div>
                </div>
        
                <div class="bg-gray-100 p-4 rounded-lg space-y-2">
                    <p><strong>Email:</strong> ${filtermemeber.email}</p>
                    <p><strong>Phone:</strong> ${filtermemeber.phone}</p>
                </div>
        
                <h3 class="text-2xl font-bold mt-6">Work Experience :</h3>
                ${experienceshtml}
        
                <button class="text-red-700 font-bold text-xl editbtn">Edit</button>
            `;

    workerProfile.classList.remove("hidden");


}


// Close profile
document.getElementById("closeProfile").addEventListener("click", () => {
    workerProfile.classList.add("hidden");
});

//////////////
// Add experiences
addExperienceBtn.addEventListener("click", addExperienceBlock);

function addExperienceBlock() {
    const ExperienceList = document.getElementById("ExperienceList");

    const ExperienceBlock = document.createElement("div");
    ExperienceBlock.className = "experience-blocks p-4 bg-blue-300 rounded mb-3";

    ExperienceBlock.innerHTML = `
    <div>
        <label>Company</label>
        <input type="text" class="companyNameExp border rounded p-2 w-full mb-2">

        <label>Role</label>
        <input type="text" class="roleExp border rounded p-2 w-full mb-2">

        <label>From</label>
        <input type="date" class="startDateExp border rounded p-2 w-full mb-2">

        <label>To</label>
        <input type="date" class="endDateExp border rounded p-2 w-full mb-2">

        <button class="deleteExp mt-2 bg-red-500 px-3 py-1 rounded text-white">Delete</button>
    </div>
`;

    ExperienceList.appendChild(ExperienceBlock);

    ExperienceBlock.querySelector(".deleteExp").addEventListener("click", () => {
        ExperienceBlock.remove();
    });
}
//function get all experiences 

function getexperiences() {
    const blocks = document.querySelectorAll("#ExperienceList .experience-blocks");
    const exp = [];

    blocks.forEach(b => {
        exp.push({
            company: b.querySelector(".companyNameExp").value.trim(),
            role: b.querySelector(".roleExp").value.trim(),
            from: b.querySelector(".startDateExp").value.trim(),
            to: b.querySelector(".endDateExp").value.trim()
        });
    });

    return exp;
}
/////////zone functiions 
const zoneRules = {
    "reception-room": ["receptionest", "manager"],
    "server-room": ["itguy", "manager"],
    "security-room": ["security", "manager"],
    "archives-room": ["manager"],
    "staff-room": ["manager", "cleaning"],
    "conference-room": ["manager", "cleaning", "security", "itguy", "receptionest"]
};

//open pop up for each
document.querySelectorAll(".add-btn").forEach(btn => {
    const assignWorkersList = document.getElementById("assignWorkersList");
    btn.addEventListener("click", () => {
        let memberzone = [];
        currentZone = btn.dataset.zone;
        zoneRules[currentZone].forEach(cur => {
            memberzone.push(...workers.filter(worker => worker.role === cur && worker.zoneId === null));
        })
        console.log(assignWorkersList)
        assignWorkersList.innerHTML = "";
        if (memberzone.length === 0) {
            assignWorkersList.innerHTML = ` <div class="bg-white p-8 w-11/12 md:w-3/4 max-w-3xl rounded shadow-lg relative max-h-[90vh] overflow-y-auto ">
                                            <p class='text-gray-500'>No unassigned workers</p>            
                                            </div>`
        } else {
            memberzone.forEach(worker => {
                const workerBtn = document.createElement("button");
                workerBtn.innerHTML = `<div data-id=${worker.id} class ="bg-white p-8 w-11/12 md:w-3/4 max-w-3xl rounded shadow-lg relative max-h-[90vh] overflow-y-auto ">
                <div>
                        <img src="${worker.image}" class="w-16 h-16 rounded-full object-cover border mb-2" />
                </div>
                    <div>
                        <p class ="text-gray-800 font-semibold text-lg"> Name: ${worker.name}</p>
                        <p class ="text-gray-800 font-semibold text-lg"> Role: ${worker.role}</p>
                    </div>
                </div>`
                workerBtn.addEventListener("click", () => {
                    const memberselected = workers.find(worker => Number(worker.id) === Number(workerBtn.firstElementChild.dataset.id))
                    Object.assign(memberselected, { zoneId: currentZone })
                    saveWorkers()
                    renderWorker()
                    assignPopup.classList.add("hidden");
                    //sweet alert 
                    Swal.fire({
                    icon: 'success',
                    title: 'Worker Assigned',
                    text: `${worker.name} has been assigned `,
                    confirmButtonText: 'OK'
                    });
                });
                assignWorkersList.appendChild(workerBtn);
            });
        }

        assignPopup.classList.remove("hidden");

    })
})
// Close popup
assignCancel.addEventListener("click", () => assignPopup.classList.add("hidden"));
assignPopup.addEventListener("click", e => {
    if (e.target === assignPopup) assignPopup.classList.add("hidden");
});



renderWorker()


//Unassigned All workers btn

const unassignAllBtn = document.getElementById("unassignAllBtn");

unassignAllBtn.addEventListener("click", () => {
    
    Swal.fire({
        title: 'Unassigne All',
        text: "You can't return back!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        backdrop: true 
    }).then((result) => {
        if (result.isConfirmed) {
            workers.forEach(worker => {
                worker.zoneId = null;
            });
            saveWorkers();
            renderWorker();

            Swal.fire(
                'Unassigned Success✅',
            );
        }
    });
        
    });
    

function updateRoomBackgrounds() {
    const zones = ["reception-room", "server-room", "security-room", "archives-room", "staff-room", "conference-room"];

    zones.forEach(zone => {
        const divzone = document.getElementById(zone);
        const workersInZone = workers.filter(worker => worker.zoneId === zone);
        if (zone === "staff-room" || zone === "conference-room") {
            divzone.parentElement.style.backgroundColor = "";
            return;
        }
        if (workersInZone.length === 0) {
            divzone.parentElement.style.backgroundColor = "rgba(219, 120, 120, 0.5)";
        } else {
            divzone.parentElement.style.backgroundColor = "";
        }
    });
}


