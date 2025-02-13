import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Box,
} from "@mui/material";
import { Menu, Search } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const SearchBar = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  padding: "5px 10px",
  borderRadius: "20px",
  width: "300px",
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate(); // React Router navigate function

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "all-movies", path: "/all-movies" },
    { text: "Series", path: "/series" },
    { text: "Login", path: "/login" },
  ];

  const handleNavigation = (path) => {
    setMobileOpen(false); // Close the drawer if open
    navigate(path);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#0d253f" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {/* Left Side: Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              MovieFlix
            </Typography>
          </Box>

          {/* Center: Search Bar */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <SearchBar>
              <Search sx={{ color: "#555" }} />
              <InputBase placeholder="Search..." sx={{ marginLeft: 1, flex: 1 }} />
            </SearchBar>
          </Box>

          {/* Right Side: Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
            {navLinks.map((link) => (
              <Typography
                key={link.text}
                variant="body1"
                sx={{ cursor: "pointer", "&:hover": { color: "gray" } }}
                onClick={() => handleNavigation(link.path)}
              >
                {link.text}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List>
          {navLinks.map((link) => (
            <ListItem button key={link.text} onClick={() => handleNavigation(link.path)}>
              <ListItemText primary={link.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;



// import React, { useContext, useState, useEffect } from "react";
// import { AppBar, Toolbar, Typography, IconButton, Box, InputBase, Button } from "@mui/material";
// import { Menu, Search } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "./Context/AuthContext";

// const SearchBar = styled("div")({
//   display: "flex",
//   alignItems: "center",
//   backgroundColor: "#f1f1f1",
//   padding: "5px 10px",
//   borderRadius: "20px",
//   width: "300px",
// });

// const Navbar = () => {
//   const [userData, setUserData] = useState(null);
//   const { state, Logout } = useContext(AuthContext); // Context for authentication
//   const navigate = useNavigate();

//   // Sync user data with the state from AuthContext
//   useEffect(() => {
//     if (state && state.user) {
//       setUserData(state.user);
//     } else {
//       setUserData(null);
//     }
//   }, [state]);

//   const navLinks = [
//     { text: "Home", path: "/" },
//     { text: "All Movies", path: "/all-movies" },
//     { text: "Series", path: "/series" },
//   ];

//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: "#0d253f" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {/* Logo Section */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <IconButton edge="start" color="inherit" sx={{ mr: 2, display: { xs: "block", sm: "none" } }}>
//             <Menu />
//           </IconButton>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: "bold", cursor: "pointer" }}
//             onClick={() => navigate("/")}
//           >
//             MovieFlix
//           </Typography>
//         </Box>

//         {/* Search Bar */}
//         <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
//           <SearchBar>
//             <Search sx={{ color: "#555" }} />
//             <InputBase placeholder="Search..." sx={{ marginLeft: 1, flex: 1 }} />
//           </SearchBar>
//         </Box>

//         {/* Navigation Links and User Section */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//           {navLinks.map((link) => (
//             <Typography
//               key={link.text}
//               variant="body1"
//               sx={{ cursor: "pointer", "&:hover": { color: "gray" } }}
//               onClick={() => navigate(link.path)}
//             >
//               {link.text}
//             </Typography>
//           ))}

//           {/* Dynamic Login/Logout Button */}
//           {userData ? (
//             <>
//               <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//                 {userData.name}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="inherit"
//                 onClick={() => {
//                   Logout(); // Call logout function
//                   navigate("/"); // Redirect to home after logout
//                 }}
//               >
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>
//               Login
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
