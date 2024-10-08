const router = require("express").Router();
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
    settings: {
        folder_mode: "dynamic"
    },
});

router.get("/", async (req, res) => {
    try {
        if (req.query.folderName === undefined) {
            throw Error("Invalid parameter folderName.")
        }

        const cloudinaryResult = await cloudinary.api.resources_by_asset_folder(req.query.folderName, {
            max_results: 500
        }, function(error, result) { if (error) { throw error } });
        const imageUrls = cloudinaryResult.resources.map(resource => resource.secure_url);
        res.status(200).send({
            message: "Successfully fetched images.",
            data: imageUrls
        });
    } catch(err) {
        return res.status(400).send({
            message: "Some error occurred while getting images.",
            error: err
        });
    }
});

module.exports = router;