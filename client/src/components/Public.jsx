import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import PetsList from "./PetsList"
import PetsForm from "./PetsForm"

export default function Public(){
    const { getAllPets, allPets, addPet, getAllComments} = useContext(UserContext)

    useEffect(() => {
        getAllComments()
        getAllPets()
    }, [])
    console.log(allPets)
    return(
        <div className="public">
            <PetsForm addPet={addPet} />
            <PetsList pets={allPets} />
        </div>
    )
}