



import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./Context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import "./Style/AddMovie.css"; 
const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    name: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    image: "", // Add image URL field
  });

  const { state } = useContext(AuthContext);
  const router = useNavigate();

  const handleChange = (event) => {
    setMovieData({ ...movieData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));

    if (
      movieData.name &&
      movieData.description &&
      movieData.rating &&
      movieData.releaseDate &&
      movieData.duration &&
      movieData.image && // Check if image is provided
      token
    ) {
      try {
        const response = await axios.post("http://localhost:8000/api/movies", {
          ...movieData,
          token,
        });

        if (response.data.success) {
          setMovieData({
            name: "",
            description: "",
            rating: "",
            releaseDate: "",
            duration: "",
            image: "",
          });
          router("/all-movies");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    } else {
      toast.error("All fields are mandatory.");
    }
  };

//   return (
//     <div id="add-movie-container">
//       <form onSubmit={handleSubmit}>
//         <fieldset>
//           <label>Movie Name:</label>
//           <br />
//           <input
//             type="text"
//             name="name"
//             value={movieData.name}
//             onChange={handleChange}
//             placeholder="Enter movie name"
//           />
//           <br />

//           <label>Movie Description:</label>
//           <br />
//           <textarea
//             name="description"
//             value={movieData.description}
//             onChange={handleChange}
//             placeholder="Enter movie description"
//           ></textarea>
//           <br />

//           <label>Movie Rating:</label>
//           <br />
//           <input
//             type="number"
//             name="rating"
//             value={movieData.rating}
//             onChange={handleChange}
//             placeholder="Enter movie rating (out of 10)"
//           />
//           <br />

//           <label>Release Date:</label>
//           <br />
//           <input
//             type="date"
//             name="releaseDate"
//             value={movieData.releaseDate}
//             onChange={handleChange}
//           />
//           <br />

//           <label>Duration (in minutes):</label>
//           <br />
//           <input
//             type="number"
//             name="duration"
//             value={movieData.duration}
//             onChange={handleChange}
//             placeholder="Enter movie duration"
//           />
//           <br />

//           <label>Movie Image URL:</label>
//           <br />
//           <input
//             type="text"
//             name="image"
//             value={movieData.image}
//             onChange={handleChange}
//             placeholder="Enter image URL"
//           />
//           <br />

//           <button type="submit">Add Movie</button>
//         </fieldset>
//       </form>
//     </div>
//   );
// };

return (
  <div id="add-movie-container" className="add-movie-container">
    <form onSubmit={handleSubmit} className="add-movie-form">
      <fieldset>
        <label className="form-label">Movie Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={movieData.name}
          onChange={handleChange}
          placeholder="Enter movie name"
          className="form-input"
        />
        <br />

        <label className="form-label">Movie Description:</label>
        <br />
        <textarea
          name="description"
          value={movieData.description}
          onChange={handleChange}
          placeholder="Enter movie description"
          className="form-textarea"
        ></textarea>
        <br />

        <label className="form-label">Movie Rating:</label>
        <br />
        <input
          type="number"
          name="rating"
          value={movieData.rating}
          onChange={handleChange}
          placeholder="Enter movie rating (out of 10)"
          className="form-input"
        />
        <br />

        <label className="form-label">Release Date:</label>
        <br />
        <input
          type="date"
          name="releaseDate"
          value={movieData.releaseDate}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label">Duration (in minutes):</label>
        <br />
        <input
          type="number"
          name="duration"
          value={movieData.duration}
          onChange={handleChange}
          placeholder="Enter movie duration"
          className="form-input"
        />
        <br />

        <label className="form-label">Movie Image URL:</label>
        <br />
        <input
          type="text"
          name="image"
          value={movieData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          className="form-input"
        />
        <br />

        <button type="submit" className="form-button">
          Add Movie
        </button>
      </fieldset>
    </form>
  </div>
);
};

export default AddMovie;
