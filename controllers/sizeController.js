const Tag = require("../models/sizeModule");

// ➤ Create a new tag
exports.createSize = async (req, res) => {
  try {
    const newTag = new Tag({ size: req.body.size });
    const savedTag = await newTag.save();
  
    res.status(200).send({success:true,data:savedTag})
    
  } catch (err) {
  
    res.status(500).send({success:true,error: err.message})
  }
};

// ➤ Get all tags
exports.getAllSizes = async (req, res) => {
  try {
    const tags = await Tag.find();
    
    res.status(200).send({success:true,data:tags})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get a single tag by ID
exports.getSizeById = async (req, res) => {
  try { 
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Update a tag by ID

// const Tag = require("../models/Tag");

exports.updateSize = async (req, res) => {
  try {
    const { size } = req.body;

    // Validate input
    if (!size) {
      return res.status(400).json({ message: "Size field is required" });
    }

    // Find and update tag
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      { $set: { size } },
      { new: true, runValidators: true }
    );
    console.log("hete yo",updatedTag);

    if (!updatedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // res.status(200).json(updatedTag);
    res.status(200).send({success:true,data:updatedTag});
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// exports.updateSize = async (req, res) => {
//   try {
//     const updatedData = {size: req.body.size }
//     const updatedTag = await Tag.findByIdAndUpdate(
//       req.params.id,
//       // { $set: updatedData }
//       { $set :{size: req.body.size} },
//       { new: true }
//     );
//     if (!updatedTag) return res.status(404).json({ message: "Tag not found" });
//     res.json(updatedTag);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// ➤ Delete a tag by ID
exports.deleteSize = async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) return res.status(404).json({ message: "Tag not found" });
   
    res.status(201).send({success:true, message: "Tag deleted"});
  } catch (errors) {
    res.status(500).send({ success:false,msg: err.message});
  }
};
