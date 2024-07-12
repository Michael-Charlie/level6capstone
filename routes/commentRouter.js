const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/Comment");

// Get all comments ()

commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(comments);
  });
});


// Get comments by user id

commentRouter.get("/user", (req, res, next) => {
     Comment.find({ user: req.auth._id }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
     })
})

// Add new comment - need to find out the difference between rtv on this with req.body.issue and req.body.pet here

commentRouter.post("/:petId", (req, res, next) => {
    req.body.user = req.auth._id
    req.body.pets = req.params.petId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

// Delete comment

commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
        { _id: req.params.commentId, user: req.auth._id },
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted comment: ${deletedComment.text}`)
        }
    )
})

// Update comment

commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId, user: req.auth._id },
        req.body,
        { new: true },
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

module.exports = commentRouter;