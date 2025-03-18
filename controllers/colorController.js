const Color = require("../models/Color");

// ➤ Create a new color
exports.createColor = async (req, res) => {
  try {
    const { name, code } = req.body;
    const newColor = new Color({ name, code });
    const savedColor = await newColor.save();
    res.status(201).send({success:true,data:savedColor,msg:"color data suceefull add"});
  } catch (err) {
    res.status(500).send({ success:false,msg: err.message});
  }
};

// ➤ Get all colors
exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.find();
    // res.json(colors);
    res.status(200).send({success:true,data:colors});
  } catch (err) {
    res.status(500).send({ success:false,msg: err.message});
  }
};

// ➤ Get a single color by ID
exports.getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) return res.status(404).json({ message: "Color not found" });
    // res.json(color);
    res.status(201).send({success:true,data:color});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Update a color by ID
exports.updateColor = async (req, res) => {
  try {
    const updatedColor = await Color.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, code: req.body.code },
      { new: true }
    );
    if (!updatedColor) return res.status(404).json({ message: "Color not found" });
    res.json(updatedColor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Delete a color by ID
exports.deleteColor = async (req, res) => {
  try {
    const deletedColor = await Color.findByIdAndDelete(req.params.id);
    if (!deletedColor) return res.status(404).json({ message: "Color not found" });
    res.status(201).send({success:true,data:deletedColor});
  } catch (err) {
    res.status(500).send({ success:false,msg: err.message});
  }
};
