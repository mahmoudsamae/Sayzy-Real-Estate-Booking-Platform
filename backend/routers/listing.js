import express from "express";
import multer from "multer";
import Listing from "../models/listing.js";
import User from "../models/User.js";


const listinRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


// create listing 
listinRouter.post(
  "/create",
  upload.array("listingPhotos"),
  async (req, res) => {
    try {
      const {
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title,
        description,
        price,
      } = req.body;
      
      if (
        !creator ||
        !category ||
        !type ||
        !streetAddress ||
        !aptSuite ||
        !city ||
        !province ||
        !country ||
        !guestCount ||
        !bedroomCount ||
        !bedCount ||
        !bathroomCount ||
        !title ||
        !description ||
        !price
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const listingPhotos = req.files;
      if (!listingPhotos || listingPhotos.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }
      const listingPhotoPaths = listingPhotos.map((file) => file.path);

      const newListing = new Listing({
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        listingPhotoPaths,
        title,
        description,
        price,
      });
      await newListing.save();
      res.status(200).json({success: true, newListing});
    } catch (error) {
      res.status(409).json({success:false, message: "fail to create Listing", error: error.message})
      console.log(error)
    }
  }
);


// get listings depending on category 
listinRouter.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }
    res.status(200).json({ success: true, listings });
  } catch (error) {
    res
      .status(409)
      .json({
        success: false,
        message: "fail to get Listing",
        error: error.message,
      });
    console.log(error);
  }
});


// get listing by Id 
listinRouter.get("/:listingId", async (req, res) => {
  try {
    const {listingId} = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(200).json({success: true, listing})
  } catch (error) {
    res.status(404).json({success: false, message: error.message});
  }
})

// get listings depending on search 
listinRouter.get("/search/:search", async (req, res) => {
  const {search} = req.params;
  try {
    let listings = [];
    if (search === "All" || search === "all") {
      listings = await Listing.find({}).populate(
        "creator"
      );
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }
    res.status(200).json({ success: true, listings });
  } catch (error) {
    res
      .status(409)
      .json({
        success: false,
        message: "fail to get Listing",
        error: error.message,
      });
    console.log(error);
  }
});


export default listinRouter