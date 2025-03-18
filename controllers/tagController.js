const Tag = require("../models/tagModule");

// ➤ Create Tag

const create_tag = async (req, res) => {
    try {
      const newTag = new Tag({ name: req.body.name });
      const savedTag = await newTag.save();
      // res.status(201).json(savedTag);
      res.status(200).send({success:true,data:savedTag})
    } catch (err) {
      res.status(500).send({success:true,error: err.message})
    }
  }


  // ➤ Read All Tags

  const get_all_tag = async (req, res) => {
    try {
      const tags = await Tag.find();
      res.status(200).send({success:true,data:tags})
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  // ➤ Read Single Tag by ID

 const getby_id_tag =  async (req, res) => {
    try {
      const tag = await Tag.findById(req.params.id);
      if (!tag) return res.status(404).json({ message: "Tag not found" });
      res.json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ➤ Update Tag by ID
 const update_tag = async (req, res) => {
    try {
      const updatedTag = await Tag.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
      );
      if (!updatedTag) return res.status(404).json({ message: "Tag not found" });
      res.status(200).send({success:true,data:updatedTag});
    } catch (err) {
      // res.status(500).json({ error: err.message });
      res.status(500).json({ error: "Server Error", details: err.message });
    }
  }

  // ➤ Delete Tag by ID

  const delete_tag = async (req, res) => {
    try {
      const deletedTag = await Tag.findByIdAndDelete(req.params.id);
      if (!deletedTag) return res.status(404).json({ message: "Tag not found" });
      // res.json({ message: "Tag deleted" });
      res.status(201).send({success:true, message: "Tag deleted"});
    } catch (err) {
      res.status(500).send({ success:false,msg: err.message});
    }
  }
  module.exports = {create_tag,update_tag,delete_tag,getby_id_tag,get_all_tag}