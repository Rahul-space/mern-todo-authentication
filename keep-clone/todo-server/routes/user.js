const router = require("express").Router();
const User = require("../models/User");
//UPDATE

router.put("/:id" ,async (req, res) => {

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }

});
// create a todo 







router.put("/add/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
        await user.updateOne({ $push: { task: req.body.task} },{new: true});
        res.status(200).json(req.body.task);
    } catch (err) {
      res.status(500).json(err);
    }
  } 
);


// Delete a todo 
router.delete("/delete/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {"task":req.body},
      },
      { new: true }
    );
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
} 
);





//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

//GET

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/random", async (req, res) => {
  let movie;
  try {
      movie = await User.aggregate([
        { $sample: { size: 1 } },
      ]);
    res.status(200).json(movie[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL



module.exports = router;