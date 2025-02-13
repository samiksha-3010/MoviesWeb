


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Style/AllMovie.css"; 

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); // For filtered movies
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/allmovies");
        if (response.data.success) {
          setMovies(response.data.movies);
          setFilteredMovies(response.data.movies); // Initialize filtered movies
        } else {
          console.error("Failed to fetch movies:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter movies based on name or description
    const filtered = movies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
    );

    setFilteredMovies(filtered);
  };



// const handleDelete = async (id) => {
//     const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage
//   console.log("id",id)
//   console.log("token",token)

//     if (!token) {
//       alert("You must be logged in as an admin to delete movies.");
//       return;
//     }
  
//      if (window.confirm("Are you sure you want to delete this movie?")) {

//       try {
//         console.log("token210",token)

//         const response = await axios.delete(`http://localhost:8000/api/deleteMovie/${id}`, {
//           data: { token }, // Send token in the request body
//         });
  
//         if (response.data.success) {
//           // Update the frontend state
//           setMovies(movies.filter((movie) => movie._id !== id));
//           setFilteredMovies(filteredMovies.filter((movie) => movie._id !== id)); // Update filtered state
//           alert(response.data.message);
//         } else {
//           alert("Failed to delete movie: " + response.data.message);
//         }
//       } catch (error) {
//         console.error("Error deleting movie:", error.message);
//         alert("An error occurred while deleting the movie.");
//       }
//     }
//    };
const handleDelete = async (id) => {
  const token = localStorage.getItem("token");
  
  // Remove any extra quotes from the token
  const cleanToken = token.replace(/^["'](.+)["']$/, '$1');
  
  if (!token) {
      alert("You must be logged in as an admin to delete movies.");
      return;
  }

  if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
          const config = {
              headers: {
                  'Authorization': `Bearer ${cleanToken}`, // Using cleaned token
                  'Content-Type': 'application/json'
              }
          };

          const response = await axios.delete(
              `http://localhost:8000/api/deleteMovie/${id}`,
              config
          );

          if (response.data.success) {
              setMovies(movies.filter((movie) => movie._id !== id));
              setFilteredMovies(filteredMovies.filter((movie) => movie._id !== id));
              alert("Movie deleted successfully!");
          }
      } catch (error) {
          console.error("Error deleting movie:", error.response?.data?.message || error.message);
          alert("Error deleting movie: " + (error.response?.data?.message || error.message));
      }
  }
};

  const handleUpdate = (id) => {
    // Navigate to the update movie page
    navigate(`/update-movie/${id}`);
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="all-movies-container">
      <h1>All Movies</h1>

      {/* Filter/Search Bar */}
      <input
        type="text"
        placeholder="Search movies by name or description..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <img
              src={movie.image}
              alt={movie.name}
              className="movie-image"
              onError={(e) => {
                e.target.src = "default-image-url.jpg"; // Fallback image URL
              }}
            />
            <div className="movie-details">
              <h3>{movie.name}</h3>
              <p>{movie.description}</p>
              <p><strong>Rating:</strong> {movie.rating}/10</p>
              <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {movie.duration} minutes</p>
              <div className="movie-actions">
                <button
                  className="update-button"
                  onClick={() => handleUpdate(movie._id)}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(movie?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
