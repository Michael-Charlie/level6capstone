import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

function Vote(props) {
  const { upVotePet, downVotePet } = useContext(UserContext);
  const { likedUsers, dislikedUsers, petId } = props;

  return (
    <div>
      <div>
        <p>{likedUsers.length}</p>
        <button onClick={() => upVotePet(petId)}>Like</button>
      </div>

      <div>
        <p>{dislikedUsers.length}</p>
        <button onClick={() => downVotePet(petId)}>Dislike</button>
      </div>
    </div>
  );
}

export default Vote;
