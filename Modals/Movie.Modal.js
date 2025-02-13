

// import mongoose from "mongoose";

// const movieSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   rating: { type: Number, required: true },
//   releaseDate: { type: String, required: true },
//   duration: { type: Number, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// });

// export default mongoose.model("Movie", movieSchema);


import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: true }, // New field for the image
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to admin user
});

const Movie = mongoose.model("Movie", movieSchema); // ✅ Ensure this matches your import
export default Movie;



