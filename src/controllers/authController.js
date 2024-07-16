import Connection from "../db/config.js";
const connection = await Connection();
import bcrypt from "bcrypt";
let authController = {
  // Method to register a new user
  register: async (req, res) => {
    // Get the user data from the request body
    const { username, password } = req.body;
    // Check if the user already exists
    const [rows] = await connection.execute(
      "SELECT * FROM Users WHERE username = ?",
      [username]
    );
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the user into the database
    await connection.execute(
      "INSERT INTO Users (username, password) VALUES ( ?, ?)",
      [username, hashedPassword]
    );
    // Return a success message
    return res.status(201).json({ message: "User registered successfully" });
  },
  // Method to log in a user
  login: async (req, res) => {
    // Get the user data from the request body
    const { username, password } = req.body;
    // Check if the user exists
    const [rows] = await connection.execute(
      "SELECT * FROM Users WHERE username = ?",
      [username]
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Check if the password is correct
    const user = rows[0];
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({ status: true, user });
  },

  getUsers: async (req, res) => {
    // Get all users from the database
    const [rows] = await connection.execute(
      "SELECT * FROM Users WHERE user_id = ?",
      [req.params.id]
    );
    // Return the users
    return res.json(rows);
  },
  logOut: async (req, res) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  },
};

export default authController;
