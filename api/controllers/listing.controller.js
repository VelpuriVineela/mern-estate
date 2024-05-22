import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  // check for the listing avaliability if avaliable or not if not generate error
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  // if listing found check about the autenticated user
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  // if everything is okay if it matches in both cases
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  // check for the avaliability of listing
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  // checks if the listing is belongs to the current user
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  // updatating the listing
  try {
    // it will find id(got as a request by user) and update in db
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      // it will give the update listing not the prev one
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    // check if listing is present in database or not
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    // if present send the listing details
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    //if there is query interger limit stored in limit varaible or else take 9 has limit(for pagination)
    const limit = parseInt(req.query.limit) || 9;

    //if there is query interger startIndex stored in limit varaible or else take 9 has startIndex
    const startIndex = parseInt(req.query.startIndex) || 0;

    // we get the offer from the query
    let offer = req.query.offer;

    //by default the offer is false or undefined so in this case we need to show both offered and notofferd listing
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    //we get the furnished from query
    let furnished = req.query.furnished;

    //by default the furnished is false or undefined so in this case we need to show both furnished and unfurnished listing
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    //we get the parking from query
    let parking = req.query.parking;

    //by default the parking is false or undefined so in this case we need to show both parking and unparking listing
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] }; // $in --> search inside the database
    }

    // we get the type from query
    let type = req.query.type;

    //by default the type is (both rent and sell) or undefined so in this case we need to show both rent and sell listing
    if (type === undefined || type === "all") {
      //all--> both sell and rent
      type = { $in: ["sale", "rent"] };
    }

    // we get search term from query or else take it as empty string
    const searchTerm = req.query.searchTerm || "";

    // we get the sorting by query or else sort it by created at latest
    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    // created listings
    const listings = await Listing.find({
      // regex ---> search for every related part of searchterm and i means search for both uppercase and lower case as well
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
