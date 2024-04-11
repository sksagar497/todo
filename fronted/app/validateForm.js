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

    if (!formData.mobile || !formData.mobile.trim()) {
        errors.mobile = "Mobile is required";
    } else {
        if (formData.mobile.trim().length !== 10 || !/^\d+$/.test(formData.mobile.trim())) {
            errors.mobile = "Mobile must be exactly 10 digits";
        }
    }

    Object.keys(formData).forEach((key) => {
        console.log("formData[key]: ",formData[key].trim(),"  ---- formData   ",formData  , "key --- ", key)
        if (!formData[key].trim()) {
            errors[key] = `${key} is required`;
        }
    })

    return errors;
}
// export const validateForm = (formData = {}) => {
//   let errors = {};

//   if (formData.name && !formData.name.trim()) {
//     errors.name = "Name is required";
//   }
//   if (formData.gender && !formData.gender.trim()) {
//     errors.gender = "Gender is required";
//   }
//   if (formData.hobbies && !formData.hobbies.trim()) {
//     errors.hobbies = "hobbies is required";
//   }
//   if (formData.country && !formData.country.trim()) {
//     errors.country = "country is required";
//   }
//   if (formData.email && !formData.email.trim()) {
//     errors.email = "Email is required";
//   } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//     errors.email = "Email is invalid";
//   }
//   if (formData.password && !formData.password.trim()) {
//     errors.password = "Password is required";
//   } else if (formData.password && formData.password.trim().length < 8) {
//     errors.password = "Password should be at least 8 characters long";
//   }
//   if (formData.mobile && !formData.mobile.trim()) {
//     errors.mobile = "Mobile No. is required";
//   } else if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
//     errors.mobile = "Mobile No. is invalid";
//   }
//   if (formData.status && !formData.status.trim()) {
//     errors.status = "status is required";
//   }
//   if (formData.description && !formData.description.trim()) {
//     errors.description = "description is required";
//   }
//   if (formData.time && !formData.time.trim()) {
//     errors.time = "time is required";
//   }
//   return errors;
// };
