import React, { useContext, useEffect } from "react";
import Pets from "./Pets"
import PetsForm from "./PetsForm"
import PetsList from "./PetsList"
import { UserContext } from "../context/UserProvider";

export default function Profile(){
    const {
        user: {username},
        pets,
        addPet,
        getAllComments,
        getUserPets
    } = useContext(UserContext)
    useEffect(() => {
        getAllComments()
        getUserPets()
    }, [])

    return(
        <div className="profile">
            <h1>Welcome @{username}!</h1>
            <h3>Add a pet</h3>
            <PetsForm addPet={addPet} />
            <h3>Your pets</h3>
            <PetsList pets={pets} />
        </div>
    )
}