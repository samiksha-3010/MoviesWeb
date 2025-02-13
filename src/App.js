import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserHome from './Component/UserHome';
import Navbar from './Component/Navbar';
import EditMovies from './Component/DeleteMovie';
import UpdateMovies from './Component/UpdateMovies';
import AddMovies from './Component/AddMovies';
import Register from './Component/Register';
import Login from './Component/Login';
import AllMovies from './Component/AllMovies';
import Footer from './Component/Footer';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<UserHome/>}/>
        <Route exact path='login' element={<Login/>}/>
        <Route exact path='register' element={<Register/>}/>
        <Route path="/update-movie/:id" element={<UpdateMovies />} />
        {/* <Route exact path='update-movie' element={<UpdateMovies/>}/> */}
        <Route exact path='AddMoviesAdmin' element={< AddMovies/>}/>
        <Route exact path='all-movies' element={<AllMovies/>}/>




      </Routes>
      <Footer/>
     
    </div>
  );
}

export default App;
