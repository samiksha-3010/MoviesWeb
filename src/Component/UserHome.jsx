
import React, { useState, useEffect } from "react";
import "./Style/UserHome.css"; 
const MovieHome = () => {
  const movies = [
    {
      title: "Avengers: Endgame",
      image: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance.",
      rating: "8.4",
      releaseDate: "2019-04-26",
      duration: "3h 2m",
    },
    {
      title: "Interstellar",
      image: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      rating: "8.6",
      releaseDate: "2014-11-07",
      duration: "2h 49m",
    },
    {
      title: "Joker",
      image: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
      description: "A mentally troubled comedian embarks on a downward spiral that leads to the creation of an iconic villain.",
      rating: "8.4",
      releaseDate: "2019-10-04",
      duration: "2h 2m",
    },
    {
      title: "Inception",
      image: "http://images2.fanpop.com/image/photos/13300000/Inception-Poster-inception-2010-13368481-1029-1500.jpg",
      description: "A skilled thief, who enters the dreams of others to steal secrets, must plant an idea into a target's subconscious.",
      rating: "8.8",
      releaseDate: "2010-07-16",
      duration: "2h 28m",
    },
    {
      title: "The Dark Knight",
      image: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      description: "Batman sets out to dismantle organized crime in Gotham, but he is met with an unpredictable and terrifying force: The Joker.",
      rating: "9.0",
      releaseDate: "2008-07-18",
      duration: "2h 32m",
    },
  ];
  

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="movie-home">
      
      {/* Movie Slider */}
      <div className="carousel">
        <img className="slide-image" src={movies[currentIndex].image} alt="Movie" />
        <div className="overlay">
          <h2>{movies[currentIndex].title}</h2>
          <p>{movies[currentIndex].description}</p>
          <div className="details">
            <span> {movies[currentIndex].rating}</span>
            <span> {movies[currentIndex].releaseDate}</span>
            <span> {movies[currentIndex].duration}</span>
          </div>
        </div>
      </div>

      {/* Movie List Section */}
    {/* Movie List Section */}
<div className="movie-list">
  <h2>Popular Movies</h2>
  <div className="movies">
    {movies.map((movie, index) => (
      <div className="movie-card" key={index}>
        <img src={movie.image} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p className="desc">{movie.description}</p>
        <div className="details">
          <span> {movie.rating}</span>
          <span> {movie.releaseDate}</span>
          <span> {movie.duration}</span>
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default MovieHome;
