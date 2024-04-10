export const validateForm = (formData = {}) => {
    let errors = {};

    if (!formData.email || !formData.email.trim()) {
        errors.email = "Email is required";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = "Invalid email format";
        }
    }
    if(formData.loggedIn){
        
    }

    if (!formData.mobile || !formData.mobile.trim()) {
        errors.mobile = "Mobile is required";
    } else {
        if (formData.mobile.trim().length !== 10 || !/^\d+$/.test(formData.mobile.trim())) {
            errors.mobile = "Mobile must be exactly 10 digits";
        }
    }

    Object.keys(formData).forEach((key) => {
        console.log("formData[key]: ",formData[key].trim())
        if (!formData[key].trim()) {
            errors[key] = `${key} is required`;
        }
    })

    return errors;
}
