import React, { useState } from "react";

function SingleComment(props) {
  const { text } = props;
  console.log(props)
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

export default SingleComment;
