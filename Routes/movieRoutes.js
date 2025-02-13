import express from "express";
import { addMovie, allMovies, deleteMovie, getSortedMovies, searchMovies, updateMovie } from "../Controolers/MovieController.js";


const router = express.Router();
router.post("/movies", addMovie);
router.get("/allmovies", allMovies);
router.put("/updatemovies/:id",  updateMovie); 

router.delete("/deleteMovie/:id", deleteMovie); 
router.get("/sorted", getSortedMovies); 
router.get("/search", searchMovies); 




 export default router;


// import express from "express";
// import { 
//   addMovie, 
//   allMovies, 
//   deleteMovie, 
//   getSortedMovies, 
//   searchMovies, 
//   updateMovie 
// } from "../Controolers/MovieController.js";
// import { authMiddleware } from "../Middleware/auth.middleware.js";

// const router = express.Router();

// // Public Routes
// router.get("/allmovies", allMovies);
// router.get("/sorted", getSortedMovies);
// router.get("/search", searchMovies);

// // Protected Routes (requires authMiddleware)
// router.use(authMiddleware);

// router.post("/movies", addMovie);
// router.put("/updatemovies/:id", updateMovie);
// router.delete("/deleteMovie/:id", deleteMovie);

// export default router;
