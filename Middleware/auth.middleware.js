// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// export const verifyAdmin = (req, res, next) => {
//   try {
//     // Get the token from the request headers or body
//     const token = req.headers.authorization?.split(" ")[1] || req.body.token;

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Access Denied. No token provided!" });
//     }

//     // Verify the token
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Check if the user has admin role
//     if (decodedData.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Forbidden! Only admins can perform this action." });
//     }

//     // Attach user info to request
//     req.user = decodedData;
//     next(); // Proceed to the next middleware or route handler

//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid or expired token!", error: error.message });
//   }
// };
import jwt from "jsonwebtoken";
export const  authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized access, token required." });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decodedData; // Attach decoded data (user info) to request object
    next(); // Call next middleware/route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};


// export const verifyAdmin = (req, res, next) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({ success: false, message: "Access denied: Admins only." });
//   }
//   next();
// };