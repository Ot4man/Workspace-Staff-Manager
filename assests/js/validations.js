// validations.js
export const validationRules = {
    'name': {
        regex: /^[A-Za-z\s]{2,50}$/,  
        message: "Invalid Name, name can only contain letters and spaces."
    },
    'urlimage': {
        regex: /^(https?:\/\/.*\.(jpg|jpeg|png|gif|webp))$/i,  
        message: "Invalid image URL (only .jpg, .jpeg, .png, .gif, .webp)."
    }
    ,
    'companyNameExp': {
        regex: /^[A-Za-z0-9\s,.'-]{2,50}$/,  
        message: "Company name must be 2-50 characters long."
    },
    'roleExp': {
        regex: /^[A-Za-z\s]{2,50}$/,  
        message: "Role must be at least 2 characters long and contain only letters and spaces."
    },
    'startDateExp': {
        regex: /.+/,  
        message: "Start date is required."
    },
    'endDateExp': {
        regex: /.+/,  
        message: "End date is required."
    }
};

export function toggleError(field, show, message = '') {
    const errorDisplay = document.getElementById(`${field}-error`);
    const inputField = document.getElementById(field);

    if (show) {
        errorDisplay.textContent = message;
        errorDisplay.classList.remove('hidden');
        inputField.classList.add('border-red-500');
        inputField.classList.remove('border-green-500');
    } else {
        errorDisplay.classList.add('hidden');
        inputField.classList.remove('border-red-500');
        inputField.classList.add('border-green-500');
    }
}

export function validateField(field, value) {
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

export function validateForm() {
    let isValid = true;
    
    for (const field in validationRules) {
        const inputField = document.getElementById(field);
        if (inputField && !validateField(field, inputField.value)) {
            isValid = false;
        }
    }
    
    return isValid;
}
