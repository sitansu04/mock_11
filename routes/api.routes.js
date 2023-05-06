const express = require("express");
const { Postmodel } = require("../models/forms.model");

const formRouter = express.Router();

//-------------------------------Checking Router is working or not-------------------------->
formRouter.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: `Router is working` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});
//------------------------------Post a Post by user------------------------------------->
formRouter.post("/add", async (req, res) => {
  try {
    const { name, title, description, date } = req.body;

    if (!name || !title || !description) {
      return res.status(404).send({ msg: `Please fill all the details` });
    }

    const ex_post = await Postmodel.findOne({ name: name });

    if (ex_post) {
      return res.status(400).send({
        msg: `There is already a Post in this name please use another name`,
      });
    }

    const new_post = new Postmodel({
      name,
      title,
      description,
      date,
    });

    await new_post.save();
    return res.status(201).send({ msg: "Post is Created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});
//----------------------------------See all posts------------------------------>
formRouter.get("/all", async (req, res) => {
  try {
    const posts = await Postmodel.find();

    if (posts.length > 0) {
      return res.status(200).send(posts);
    } else {
      return res.status(404).send({ msg: `No Posts Found` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});
//---------------------------------Delete Post----------------------->
formRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Postmodel.findById(id);

    if (!post) {
      return res.status(400).send({ msg: `There is no post with this id` });
    }

    await Postmodel.findByIdAndDelete({ _id: id });
    return res.status(200).send({ msg: "Post deletion  successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});
//-----------------------------------update Post---------------------------->
formRouter.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Postmodel.findById(id);

    if (!post) {
      return res.status(400).send({ msg: "There is no post" });
    }

    const { name, title, description } = req.body;

    if (!name || !title || !description) {
      return res.status(400).send({ msg: "Please fill all the details" });
    }

    const payload = {
      name,
      title,
      description,
    };

    await Postmodel.findByIdAndUpdate({ _id: id },payload);
    return res.status(200).send({ msg: "Post updated Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

//-------------------------------------Exports Router--------------------------->
module.exports = {
  formRouter,
};
