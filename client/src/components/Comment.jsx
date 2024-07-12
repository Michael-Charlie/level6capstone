import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import SingleComment from "./SingleComment";

function Comment(props) {
  const { addComment, allComments } = useContext(UserContext);
  const [input, setInput] = useState({ text: "" });
  const { petId } = props;

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addComment(input, petId);
  }

  const filteredComments = allComments.filter(
    (comment) => comment.pets === petId
  );

  const commentList = filteredComments.map((comment) => {
    return <SingleComment {...comment} key={comment._id} />;
  });

  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="text"
          value={input.text}
          type="text"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
      {filteredComments.length > 0 && <button onClick={() => setToggle(prev => !prev)}>{toggle ? "Hide Comments" : "See Comments"}</button>}
      {toggle && <>{commentList}</>}
    </div>
  );
}

export default Comment;
