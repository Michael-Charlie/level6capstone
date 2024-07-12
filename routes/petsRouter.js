const express = require("express");
const petsRouter = express.Router();
const Pets = require("../models/Pets");

// Get all pets

petsRouter.get("/", (req, res, next) => {
  Pets.find()
    .populate("userId", "-password")
    .exec((err, pets) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(pets);
    });
});

// Get pets by id

petsRouter.get("/user", (req, res, next) => {
  Pets.find({ userId: req.auth._id })
    .populate("userId", "-password")
    .exec((err, pets) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(pets);
    });
});

// Add new pet


petsRouter.post("/", (req, res, next) => {
  req.body.userId = req.auth._id;
  const newPet = new Pets(req.body);
  newPet.save((err, savedPet) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    // Now, let's populate the userId field in savedPet
    Pets.populate(
      savedPet,
      { path: "userId", select: "-password" },
      (populateErr, populatedPet) => {
        if (populateErr) {
          res.status(500);
          return next(populateErr);
        }
        // Return the populatedPet after successful population
        return res.status(201).send(populatedPet);
      }
    );
  });
});


// Delete pet

petsRouter.delete("/:petId", (req, res, next) => {
    Pets.findOneAndDelete(
        { _id: req.params.petId, user: req.auth._id },
        (err, deletedPet) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedPet.petName}'s blog entry.`)
        }
    )
})

// Update pet

petsRouter.put("/:petId", (req, res, next) => {
    Pets.findOneAndUpdate(
        { _id: req.params.petId, user: req.auth._id },
        req.body,
        { new: true })
        .populate("userId", "-password")
        .exec((err, updatedPet) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPet)
        })
    
})

// Upvote pet
petsRouter.put("/upVote/:petId", (req, res, next) => {
    Pets.findOneAndUpdate(
        { _id: req.params.petId },
        {
            $addToSet: { likedUsers:req.auth._id },
            $pull: { dislikedUsers: req.auth._id }
        },
        { new: true }
        )
        .populate('userId', "-password")
        .exec((err, updatedPet) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPet)
        })
    
})

// Downvote pet

petsRouter.put("/downVote/:petId", (req, res, next) => {
    Pets.findOneAndUpdate(
        { _id: req.params.petId },
        {
            $addToSet: { dislikedUsers: req.auth._id },
            $pull: { likedUsers: req.auth._id }
        },
        { new: true }
        )
        .populate('userId', "-password")
        .exec((err, updatedPet) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPet)
        })
    
})

module.exports = petsRouter