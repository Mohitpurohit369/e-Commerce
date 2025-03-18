const express = require("express");
const logo_route = express.Router();  // ✅ Use Router instead of express()
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../config/auth");
const logoController = require("../controllers/logoController");

// ✅ Middleware to parse JSON
logo_route.use(express.json());
logo_route.use(express.urlencoded({ extended: true }));

// ✅ Serve static images
logo_route.use("/logoImages", express.static(path.join(__dirname, "../public/logoImages")));

// ✅ Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../public/logoImages");

        // Ensure directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ✅ Define Routes
logo_route.post('/brand-logos', upload.single('image'), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    next();
}, logoController.createLogo);

logo_route.get('/get-logos', logoController.getAllLogos);
logo_route.get("/get-logo/:id", logoController.getLogoById);
logo_route.put("/update-logo/:id", upload.single("image"), logoController.updateLogo);
logo_route.delete("/delete-logo/:id", logoController.deleteLogo);
logo_route.get("/get-images", logoController.getimage);

module.exports = logo_route;
