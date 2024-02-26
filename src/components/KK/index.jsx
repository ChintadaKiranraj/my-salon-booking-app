import React, { useState } from "react";

const MyForm = () => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    field8: "",
    field9: "",
    field10: "",
  });

  const [errors, setErrors] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    field8: "",
    field9: "",
    field10: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update error messages
    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `${name} is required` : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation: Check if all fields are filled
    let formIsValid = true;
    const newErrors = { ...errors };

    Object.keys(formData).forEach((fieldName) => {
      if (formData[fieldName].trim() === "") {
        newErrors[fieldName] = `${fieldName} is required`;
        formIsValid = false;
      } else {
        newErrors[fieldName] = "";
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      // If validation passes, submit the form or dispatch an action
      console.log("Form submitted:", formData);
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Repeat this block for each field */}
      <div>
        <label>
          Field 1:
          <input
            type="text"
            name="field1"
            value={formData.field1}
            onChange={handleChange}
          />
          <span style={{ color: "red" }}>{errors.field1}</span>
        </label>
      </div>
      {/* Repeat for other fields (field2, field3, ..., field10) */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
