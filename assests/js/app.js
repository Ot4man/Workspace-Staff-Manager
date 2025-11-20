
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

    // Clear form after submit
    submit.reset();
    imagepreview.classList.add("hidden");
    txtpreview.classList.remove("hidden");

}

//////////////
// rend profile pop
function renderWorker(worker) {
    const unassigneddiv = document.createElement("div");
    unassigneddiv.className = "unassigneddiv cursor-pointer flex justify-between items-center bg-green-500 border border-gray-200 p-3 rounded-lg";

    // store all data in dataset
    unassigneddiv.dataset.id = worker.id;
    unassigneddiv.dataset.name = worker.name;
    unassigneddiv.dataset.role = worker.role;
    unassigneddiv.dataset.email = worker.email;
    unassigneddiv.dataset.phone = worker.phone;
    unassigneddiv.dataset.image = worker.image;
    unassigneddiv.dataset.experiences = JSON.stringify(worker.experiences);

    unassigneddiv.innerHTML = `
        <div class="flex items-center gap-4">
            <img src="${worker.image}" class="w-20 h-20 rounded-full object-cover border border-gray-300">
            <div>
                <p class="text-xl font-bold"> Name: ${worker.name}</p>
                <p class="text-sm"> Role: ${worker.role}</p>
                <p class="text-sm"> Company: ${worker.company}</p>
            </div>
        </div>
        <button class="text-red-700 font-bold text-xl deleteBtn">X</button>
    `;

    // Delete worker
    unassigneddiv.querySelector(".deleteBtn").addEventListener("click", () => {
        deleteWorker(worker.id);
        unassigneddiv.remove();
    });

    // Show profile
    unassigneddiv.addEventListener("click", (e) => {
        if (!e.target.classList.contains("deleteBtn")) {
            showProfile(unassigneddiv);
        }
    });

    unassignedList.appendChild(unassigneddiv);
}

function deleteWorker(id) {
    workers = workers.filter(wor => wor.id !== id);
    saveWorkers();
}

//////////////
// Load datta
window.addEventListener("DOMContentLoaded", () => {
    workers.forEach(renderWorker);
});

//////////////
// show profile
function showProfile(card) {
    let experienceshtml = "";
    let expers = card.dataset.experiences;
    if (expers) {
        expers = JSON.parse(expers);
    } else {
        expers = [];
    }

    expers.forEach(exp => {
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
            <img src="${card.dataset.image}" class="w-32 h-32 rounded-full object-cover border shadow">
            <div>
                <p class="text-2xl font-bold">${card.dataset.name}</p>
                <p class="text-gray-700 text-lg">${card.dataset.role}</p>
            </div>
        </div>

        <div class="bg-gray-100 p-4 rounded-lg space-y-2">
            <p><strong>Email:</strong> ${card.dataset.email}</p>
            <p><strong>Phone:</strong> ${card.dataset.phone}</p>
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
//rule of each room
const zoneRules = {
    "reception-room": ["receptionest", "manager"],
    "server-room": ["itguy", "manager"],
    "security-room": ["security", "manager"],
    "archives-room": ["manager"],
    "staff-room": ["manager", "cleaning"],
    "conference-room": "all"
};
//workers zone
let zoneWorkers = {
    "reception-room": [],
    "server-room": [],
    "security-room": [],
    "archives-room": [],
    "staff-room": [],
    "conference-room": []

};
// let unassignedWorkers =[];
workers.forEach(w => {
    if (w.zoneId) zoneWorkers[w.zoneId].push(w);
});
function assignWorkerToZone(worker, zone) {
    const allowedRoles = zoneRules[zone];

    if (allowedRoles !== "all" && !allowedRoles.includes(worker.role)) {
        alert(`${worker.name} cant be assigned to ${zone}`);
        return false;
    }
    worker.zoneId = zone;
    zoneWorkers[zone].push(worker);

    unassignedWorkers = unassignedWorkers.filter(w => w.id !== worker.id);
    return true;
}

const assignPopup = document.getElementById("assignPopup");
const assignRoomName = document.getElementById("assignRoomName");
const assignWorkersList = document.getElementById("assignWorkersList");
const assignCancel = document.getElementById("assignCancel");




let currentZone = null;

// Open popup 
document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentZone = btn.dataset.zone;

        assignWorkersList.innerHTML = "";
        if (unassignedWorkers.length === 0) {
            assignWorkersList.innerHTML = ` <div class="bg-white p-8 w-11/12 md:w-3/4 max-w-3xl rounded shadow-lg relative max-h-[90vh] overflow-y-auto ">
                                            <p class='text-gray-500'>No unassigned workers</p>            
                                            </div>`
        } else {
            unassignedWorkers.forEach(worker => {
                const workerBtn = document.createElement("button");
                // workerBtn.className = "w-full text-left px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600";
                // workerBtn.textContent = ` smiya: ${worker.name} lkhdma: (${worker.role})`;
                workerBtn.innerHTML = `<div class ="bg-white p-8 w-11/12 md:w-3/4 max-w-3xl rounded shadow-lg relative max-h-[90vh] overflow-y-auto ">
                <p> Name: ${worker.name} Role: (${worker.role})</p>
                </div>
`;

                workerBtn.addEventListener("click", () => {
                    if (assignWorkerToZone(worker, currentZone)) {
                        assignPopup.classList.add("hidden");
                        saveWorkers();
                        renderWorkersInRoom(currentZone);
                    }
                });
                assignWorkersList.appendChild(workerBtn);
            });
        }

        assignPopup.classList.remove("hidden");
    });
});

// Close popup
assignCancel.addEventListener("click", () => assignPopup.classList.add("hidden"));
assignPopup.addEventListener("click", e => {
    if (e.target === assignPopup) assignPopup.classList.add("hidden");
});


for (let zone in zoneWorkers) renderWorkersInRoom(zone);


function renderWorkersInRoom(zone) {
    const zoneDiv = document.getElementById(zone).querySelector(".zone-content");
    zoneDiv.innerHTML = "";

    zoneWorkers[zone].forEach(worker => {

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="bg-white p-8 rounded shadow flex justify-between items-center">
                <p>${worker.name} (${worker.role})</p>
                <button class="deletfromzon bg-red-500 text-white px-3 py-1 rounded">x</button>
            </div>
        `;

        const deleteBtn = div.querySelector(".deletfromzon");
        deleteBtn.addEventListener("click", () => {

            zoneWorkers[zone] = zoneWorkers[zone].filter(w => w.id !== worker.id);
            worker.zoneId = null;
            unassignedWorkers.push(worker);

            saveWorkers();

            renderWorkersInRoom(zone);
        });

        zoneDiv.appendChild(div);
    });
}
