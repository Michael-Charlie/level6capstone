import React, { useState } from "react";

const initInputs = {
  petName: "",
  description: "",
  imgUrl: "",
};

export default function PetsForm(props) {
  const [inputs, setInputs] = useState(initInputs);
  const { addPet } = props;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addPet(inputs);
    setInputs(initInputs);
  }

  const { petName, description, imgUrl } = inputs;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="petName"
        value={petName}
        onChange={handleChange}
        placeholder="Pet Name"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Tell us about your pet"
      />
      <input 
      type="text"
      name="imgUrl"
      value={imgUrl}
      onChange={handleChange}
      placeholder="Show us your pet!"
      />
      <button>Add Pet</button>
    </form>
  );
}
