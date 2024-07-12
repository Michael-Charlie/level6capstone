import React from "react";
import Pets from "./Pets"

export default function PetsList(props) {
  const { pets } = props;
  return (
    <div className="pet-list">
      {pets.map((pet) => (
        <Pets {...pet} key={pet._id} />
      ))}
    </div>
  );
}
