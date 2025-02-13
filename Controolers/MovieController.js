
import jwt from "jsonwebtoken";
 import MovieModal from "../Modals/Movie.Modal.js";

export const addMovie = async (req, res) => {
  try {
    const { name, description, rating, releaseDate, duration, image, token } = req.body;

    if (!name || !description || !rating || !releaseDate || !duration || !image || !token) {
      return res.status(400).json({ success: false, message: "All fields are mandatory." });
    }

    // Decode Token and Check Role
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedData.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Only admins can add movies." });
    }

    // Save the movie in the database
    const movie = new MovieModal({
      name,
      description,
      rating,
      releaseDate,
      duration,
      image, // Save the image URL
      addedBy: decodedData.userId,
    });

    await movie.save();

    return res.status(201).json({ success: true, message: "Movie added successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const allMovies = async (req, res) => {
    try {
      const movies = await MovieModal.find({}); // Fetch all movies
  
      if (movies.length) {
        return res.status(200).json({ success: true, movies });
      }
  
      return res.status(404).json({ success: false, message: "No movies found!" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  };



  export const updateMovie = async (req, res) => {
    try {
      const { id } = req.params; // Movie ID from URL
      const { name, description, rating, releaseDate, duration, token } = req.body; 
  
      // Validate request body
      if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access, token required." });
      }
  
      // Verify JWT Token
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token Data:", decodedData); // Debugging
  
      if (!decodedData || decodedData.role !== "admin") {
        console.log("User is NOT admin:", decodedData.role); // Debugging
        return res.status(403).json({ success: false, message: "Access denied. Only admins can update movies." });
      }
  
      // Find and update movie
      const updatedMovie = await MovieModal.findByIdAndUpdate(
        id,
        { name, description, rating, releaseDate, duration },
        { new: true } // Return updated movie
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ success: false, message: "Movie not found!" });
      }
  
      return res.status(200).json({ success: true, message: "Movie updated successfully!", updatedMovie });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  };

  export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized access, token required." 
            });
        }

        const token = authHeader.split(' ')[1]; // Extract token from Bearer string

        // Verify JWT Token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Data:", decodedData);

        if (!decodedData || decodedData.role !== "admin") {
            console.log("User is NOT admin:", decodedData.role);
            return res.status(403).json({ 
                success: false, 
                message: "Access denied. Only admins can delete movies." 
            });
        }




        const deletedMovie = await MovieModal.findByIdAndDelete(id);
        
        if (!deletedMovie) {
            return res.status(404).json({ 
                success: false, 
                message: "Movie not found!" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Movie deleted successfully!" 
        });
    } catch (error) {
        console.log("Delete movie error:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token" 
            });
        }
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message 
        });
    }
};

  export const searchMovies = async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ success: false, message: "Search query is required." });
      }
  
      const movies = await MovieModel.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search
          { description: { $regex: query, $options: "i" } },
        ],
      });
  
      if (movies.length) {
        return res.status(200).json({ success: true, movies });
      }
      return res.status(404).json({ success: false, message: "No movies found!" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  };
  


  export const getSortedMovies = async (req, res) => {
    try {
      const { sortBy } = req.query;
      
      // Allowed sorting fields
      const allowedSortFields = ["name", "rating", "releaseDate", "duration"];
      if (!allowedSortFields.includes(sortBy)) {
        return res.status(400).json({ success: false, message: "Invalid sort parameter." });
      }
  
      const movies = await MovieModel.find({}).sort({ [sortBy]: 1 }); // 1 for ascending, -1 for descending
  
      return res.status(200).json({ success: true, movies });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  };