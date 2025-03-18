// controllers/logoController.js
const Logo = require('../models/logoModel.js');


// Create a new logo
// const createLogo = async (req, res) => {

//   try {
//     const logo_data = new Logo({
//       name: req.body.name,
//       image: req.file.filename
//     })
//     const logodace = await logo_data.save();
//     res.status(200).send({ success: true, msg: "store data", data: logodace });
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// };



const createLogo = async (req, res) => {
  try {
      const imageUrl = `/logoImages/${req.file.filename}`; // ✅ Store relative URL
      const newLogo = new Logo({ name: req.body.name, image: imageUrl });
      await newLogo.save();
      
      res.status(201).json({ success: true, message: "Logo uploaded successfully", data: newLogo });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

// Get all logos
const getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find();
    res.status(200).send({ success: true, msg: "store data", data: logos });
  } catch (err) {
    res.status(500).send({ success: false, msg: err.message });
  }
};


// Get Single Logo
const getLogoById = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params._id);
    // if (!logo) return res.status(404).send({ success: false, msg: "Logo not found"})
    

    // res.status(200).json(logo);
    res.status(200).send({ success: true, msg: "store data", data: logo });
    
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching logo", error });
  }
};

// Update Logo
// const updateLogo = async (req, res) => {
//   try {
//     // Find and update brand logo
//     const updatedLogo = await Logo.findByIdAndUpdate(
//       req.params.id, // Find item by _id
//       {
//         $set: {
//           name: req.body.name || req.file?.originalname,
//           // image: req.file?.path || req.body.image // Ensure correct field name
//           image: req.file?.filename || req.body.image
//         }
//       },
//       { new: true } // Return updated document
//     );

//     if (!updatedLogo) {
//       return res.status(404).json({ success: false, message: "❌ Logo not found" });
//     }

//     res.status(200).json({ success: true, message: "✅ Logo updated successfully", logo: updatedLogo });
//   } catch (error) {
//     console.error("❌ Error updating logo:", error);
//     res.status(500).json({ success: false, message: "❌ Error updating logo", error: error.message });
//   }
// };


const updateLogo = async (req, res) => {
  try {
    // Find existing logo
    const existingLogo = await Logo.findById(req.params.id);
    if (!existingLogo) {
      return res.status(404).json({ success: false, message: "❌ Logo not found" });
    }

    // Build updated data
    const updatedData = {
      name: req.body.name || existingLogo.name, // Keep existing name if no new name is provided
      image: req.file ? `/logoImages/${req.file.filename}` : existingLogo.image // Ensure correct image path
    };
    // Update logo in DB
    const updatedLogo = await Logo.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true } // Return updated document
    );

    res.status(200).json({ success: true, message: "✅ Logo updated successfully", logo: updatedLogo });
  } catch (error) {
    console.error("❌ Error updating logo:", error);
    res.status(500).json({ success: false, message: "❌ Error updating logo", error: error.message });
  }
};



// Delete Logo
const deleteLogo = async (req, res) => {
  try {
    const deletedLogo = await Logo.findByIdAndDelete(req.params.id);
    if (!deletedLogo) return res.status(404).json({ success:false,message: "❌ Logo not found" });

    res.status(200).send({ success:true,message: "✅ Logo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success:false,message: "❌ Error deleting logo", error });
  }
};

const getimage = async (req, res) => {
  try {
      const images = await Logo.find({}, "image"); // ✅ Only fetch the 'image' field
      res.status(200).json(images);
  } catch (error) {
      res.status(500).json({ success: 0, message: error.message });
  }
};

module.exports = {
   createLogo,
    getAllLogos, 
    deleteLogo,
     updateLogo, 
     getLogoById,
     getimage
     };
