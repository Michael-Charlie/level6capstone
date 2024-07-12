import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import Comment from "./Comment";
import Vote from "./Vote";
import moment from "moment";

export default function Pets(props) {
  const { user, deletePet, handleEdit } = useContext(UserContext);

  const {
    petName,
    description,
    datePosted,
    userId,
    _id,
    likedUsers,
    dislikedUsers,
    imgUrl,
  } = props;

  const [editPet, setEditPet] = useState({
    petName,
    description,
    imgUrl
  });

  function handleChange(e){
    const {name, value} = e.target
    setEditPet((prevPet) => {
      return {...prevPet, [name]: value}
    })
  }

  const [toggle, setToggle] = useState(false)

  function handleToggle(){
    setToggle(prev => !prev)
  }

  function handleEditSubmit(e){
    e.preventDefault()
    handleEdit(editPet, _id)
    handleToggle()
  }
  console.log(userId)
  const timestamp = moment(datePosted).fromNow();
  return (
    <div className="pets">
      <div className="pet-details">
        <h1>User: {userId.username}</h1>
        <h2>Title: {petName}</h2>
        <h3>Description: {description}</h3>
        <div>Date posted: {timestamp}</div>
        {imgUrl && <img src={imgUrl} />}
        {userId._id === user._id && (
          <button onClick={() => deletePet(_id)}>Delete</button>
        )}
        {userId._id === user._id && (
          <button onClick={handleToggle}>{toggle ? "Cancel" : "Edit"}</button>
        )}
      </div>
      <Vote likedUsers={likedUsers} dislikedUsers={dislikedUsers} petId={_id} />
      <Comment petId={_id} />
      {toggle && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editPet.petName}
            name="petName"
            onChange={handleChange}
          />

          <input
            type="text"
            value={editPet.description}
            name="description"
            onChange={handleChange}
          />
          <button>Submit Edit</button>
        </form>
      )}
    </div>
  );
}
