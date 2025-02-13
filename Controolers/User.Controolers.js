
import bcrypt from 'bcrypt';
 import jwt from "jsonwebtoken";
import UserModals from '../Modals/User.Modals.js';

export const Register = async (req, res) => {
    try {
      const { userData } = req.body;
      const { name, email, password, role } = req.body.userData;
      if (!name || !email || !password || !role)
        return res.json({
          success: false,
          message: "All Feilds are Mandatory!",
        });
  
      const isEmailExist = await UserModals.find({ email: email });
      if (isEmailExist.length) {
        return res.json({
          success: false,
          message: "Email already exists! Try a new one.",
        });
      }
  
      const hashPassW = await bcrypt.hash(password, 10);
  
      const user = new UserModals({
        name:name,
        email:email,
        password: hashPassW,
        role:role,
      });
  
      await user.save();
      return res.json({
        success: true,
        message: "User Registered Successfully!",
        user:user
      });
    } catch (error) {
      return res.json({ success: false, message: error.message});
    }
  };

//   export const Login = async (req, res) => {
//     try {
//           const { email, password } = req.body
//         if (!email || !password) return res.json({ success: false, message: "All fields are mandtory.." })

//         const user = await UserModals.findOne({ email:email })
//         if (!user) return res.json({ success: false, message: "User not found.." })

//         if (user.isBlocked) {
//             return res.status(404).json({ success: false, message: "You are Blocked, Contact us." })
//         }

//         const isPasswordRight = await bcrypt.compare(password, user.password);
//         if (isPasswordRight) {

//             const userObeject = {
//                 name: user.name,
//                 email: user.email,
//                 _id: user._id
//             }
//             const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
//             // console.log(token, "token her")
//             return res.json({ success: true, message: "Login Successfull.", user: userObeject, token: token })
//         }
//         return res.json({ success: false, message: "Password is wrong." })
//     } catch (error) {
//         return res.json({ success: false, message: error })
//     }
// }


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModals.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Verify password (Assuming bcrypt is used)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include role
      process.env.JWT_SECRET,
       { expiresIn: "1d" }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.json({ success: false, message: "Token is required!" })

        const decoededData = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoededData, "decoededData")
        if (!decoededData) {
            return res.json({ success: false, message: "Not valid json token.." })
        }
        // return res.send(decoededData)
        const userId = decoededData?.userId

        const user = await UserModals.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found.." })
        }

        const userObeject = {
            name: user?.name,
            email: user?.email,
            _id: user?._id
        }

        return res.json({ success: true, user: userObeject })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}




  