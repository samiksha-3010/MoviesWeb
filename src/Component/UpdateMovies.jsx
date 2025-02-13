
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Style/updateMovie.css";

// const UpdateMovie = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [movieData, setMovieData] = useState({
//     name: "",
//     description: "",
//     rating: "",
//     releaseDate: "",
//     duration: "",
//     image: "",
//   });

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         console.log("Fetching movie with ID:", id);
//         const response = await axios.get(`http://localhost:8000/api/movie/${id}`);
//         if (response.data.success) {
//           setMovieData(response.data.movie);
//         } else {
//           console.error("Failed to fetch movie:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching movie:", error.response?.data || error.message);
//       }
//     };

//     fetchMovie();
//   }, [id]);

//   const handleChange = (e) => {
//     setMovieData({ ...movieData, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const token = localStorage.getItem("token");
//   //   console.log("Token:", token);

//   //   if (!token) {
//   //     alert("Authentication token is missing. Please log in.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.put(
//   //       `http://localhost:8000/api/updatemovies/${id}`,
//   //       movieData,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );
//   //     if (response.data.success) {
//   //       alert(response.data.message);
//   //       navigate("/all-movies");
//   //     } else {
//   //       alert(response.data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating movie:", error.response?.data || error.message);
//   //     alert("An error occurred while updating the movie.");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const token = localStorage.getItem("token"); // Get token from localStorage
//     if (!token) {
//       alert("Please log in to update movies.");
//       navigate("/login");
//       return;
//     }
  
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/updatemovies/${id}`,
//         movieData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token in the Authorization header
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       if (response.data.success) {
//         alert("Movie updated successfully!");
//         navigate("/all-movies");
//       } else {
//         throw new Error(response.data.message || "Failed to update movie.");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "An error occurred while updating the movie.";
//       if (error.response?.status === 401) {
//         alert("Your session has expired. Please log in again.");
//         navigate("/login");
//       } else if (error.response?.status === 403) {
//         alert("You don't have permission to update movies.");
//       } else {
//         alert(errorMessage);
//       }
//       console.error("Error updating movie:", error.response?.data || error.message);
//     }
//   };
  
//   return (
//     <div className="update-movie-container">
//       <h1>Update Movie</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={movieData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={movieData.description}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Rating:
//           <input
//             type="number"
//             name="rating"
//             value={movieData.rating}
//             onChange={handleChange}
//             required
//             min="0"
//             max="10"
//           />
//         </label>
//         <label>
//           Release Date:
//           <input
//             type="date"
//             name="releaseDate"
//             value={movieData.releaseDate}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Duration (minutes):
//           <input
//             type="number"
//             name="duration"
//             value={movieData.duration}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Image URL:
//           <input
//             type="text"
//             name="image"
//             value={movieData.image}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Update Movie</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateMovie;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style/updateMovie.css";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log("Fetching movie with ID:", id);
        const response = await axios.get(`http://localhost:8000/api/movie/${id}`);
        if (response.data.success) {
          setMovieData(response.data.movie);
        } else {
          console.error("Failed to fetch movie:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching movie:", error.response?.data || error.message);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      alert("Please log in to update movies.");
      navigate("/login");
      return;
    }

    try {
      console.log("token242")
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8000/api/updatemovies/${id}`,
        movieData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Movie updated successfully!");
        navigate("/all-movies");
      } else {
        throw new Error(response.data.message || "Failed to update movie.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred while updating the movie.";
      if (err.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
      } else if (err.response?.status === 403) {
        alert("You don't have permission to update movies.");
      } else {
        alert(errorMessage);
      }
      console.error("Error updating movie:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-movie-container">
      <h1>Update Movie</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={movieData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={movieData.rating}
              onChange={handleChange}
              required
              min="0"
              max="10"
            />
          </label>
          <label>
            Release Date:
            <input
              type="date"
              name="releaseDate"
              value={movieData.releaseDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Duration (minutes):
            <input
              type="number"
              name="duration"
              value={movieData.duration}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={movieData.image}
              onChange={handleChange}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Movie"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateMovie;























// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateMovie = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const [movieData, setMovieData] = useState({
//     name: "",
//     description: "",
//     rating: "",
//     releaseDate: "",
//     duration: "",
//     image: ""
//   });

//   // Fetch movie data when component mounts
//   useEffect(() => {
//     const fetchMovie = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`http://localhost:8000/api/movie/${id}`);
//         if (response.data.success) {
//           // Format the date to YYYY-MM-DD for the input field
//           const movie = response.data.movie;
//           movie.releaseDate = new Date(movie.releaseDate).toISOString().split('T')[0];
//           setMovieData(movie);
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || "Failed to fetch movie details");
//         console.error("Error fetching movie:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovie();
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovieData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Validate movie data before submission
//   const validateMovieData = () => {
//     if (!movieData.name.trim()) return "Movie name is required";
//     if (!movieData.description.trim()) return "Description is required";
//     if (isNaN(movieData.rating) || movieData.rating < 0 || movieData.rating > 10) 
//       return "Rating must be between 0 and 10";
//     if (!movieData.releaseDate) return "Release date is required";
//     if (isNaN(movieData.duration) || movieData.duration <= 0) 
//       return "Duration must be a positive number";
//     return null;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate data
//     const validationError = validateMovieData();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     // Get token
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Please log in to update movies");
//       navigate('/login');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/updatemovies/${id}`,
//         movieData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.success) {
//         alert("Movie updated successfully!");
//         navigate("/all-movies");
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Failed to update movie";
      
//       if (error.response?.status === 401) {
//         setError("Your session has expired. Please log in again");
//         navigate('/login');
//       } else if (error.response?.status === 403) {
//         setError("You don't have permission to update movies");
//       } else {
//         setError(errorMessage);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Update Movie</h1>
//       {error && <div>{error}</div>}
      
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={movieData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             value={movieData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="rating">Rating:</label>
//           <input
//             type="number"
//             id="rating"
//             name="rating"
//             value={movieData.rating}
//             onChange={handleChange}
//             min="0"
//             max="10"
//             step="0.1"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="releaseDate">Release Date:</label>
//           <input
//             type="date"
//             id="releaseDate"
//             name="releaseDate"
//             value={movieData.releaseDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="duration">Duration (minutes):</label>
//           <input
//             type="number"
//             id="duration"
//             name="duration"
//             value={movieData.duration}
//             onChange={handleChange}
//             min="1"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="image">Image URL:</label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             value={movieData.image}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? "Updating..." : "Update Movie"}
//           </button>
//           <button type="button" onClick={() => navigate("/all-movies")}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateMovie;