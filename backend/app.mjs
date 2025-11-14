// import dotenv from "dotenv"
// dotenv.config()
// import express from "express"
// import http from "http"
// import { Server } from "socket.io"
// import cors from "cors"
// import chatRoutes from "./routes/chatRoutes.mjs"
// import path from "path"
// import { fileURLToPath } from "url"
// import chatSocket from "./socket/chatSocket.mjs"
// import { authMiddleware } from "./middleware/auth.mjs"
// import mongoose from "mongoose"
// import authRoutes from "./routes/authRoutes.mjs"



// const app = express()
// const PORT =process.env.PORT || 8000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const server = http.createServer(app)
// // const io = new Server(server, {
// //     cors: {
// //         origin: "*",
// //         methods: ["GET", "POST"]
// //     }
// // });


// const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://chatapppr.netlify.app",  // Frontend URL
//       "http://localhost:3000"            // Local development (optional)
//     ],
//     methods: ["GET", "POST"]
//   }
// });

// app.use(cors({
//   origin: [
//     "https://chatapppr.netlify.app",  // Frontend URL
//     "http://localhost:3000"
//   ]
// }));




// //db connectin

// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.error("❌ MongoDB error:", err));



// //middleware
// app.use(cors())
// app.use(express.json())

// //Routes
// app.use("/api/chat", chatRoutes)
// app.use("/api/auth", authRoutes)
// //Server static file 
// app.use(express.static(path.join(__dirname, "public")))

// //simple routes test

// app.get("/", (req, res) => {
//     res.send("chat backend is running")
// })



// //Socket io connection
// chatSocket(io)

// server.listen(PORT, () =>{
//     console.log(`Server is running on the port of http:localhost:${PORT}`)
// })






// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import chatRoutes from "./routes/chatRoutes.mjs";
// import path from "path";
// import { fileURLToPath } from "url";
// import chatSocket from "./socket/chatSocket.mjs";
// import { authMiddleware } from "./middleware/auth.mjs";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes.mjs";

// const app = express();
// const PORT = process.env.PORT || 8000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Allowed origins
// const allowedOrigins = [
//   "https://chatapppr.netlify.app", // Frontend live URL
      
//   "https://full-mern-chatapp-production-24b5.up.railway.app" // Backend URL (self)
// ];

// // Middleware
// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST"]
// }));
// app.use(express.json());

// // DB connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.error("❌ MongoDB error:", err));

// // Routes
// app.use("/api/chat", chatRoutes);
// app.use("/api/auth", authRoutes);

// // Serve static files
// app.use(express.static(path.join(__dirname, "public")));

// // Simple route test
// app.get("/", (req, res) => {
//     res.send("chat backend is running");
// });

// // Socket.io connection
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"]
//   }
// });

// chatSocket(io);

// // Start server
// server.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });








import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.mjs";
import path from "path";
import { fileURLToPath } from "url";
import chatSocket from "./socket/chatSocket.mjs";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Allowed origins
const allowedOrigins = [
  "https://chatapppr.netlify.app", // Frontend live
  "https://full-mern-chatapp-production-24b5.up.railway.app" // Backend (self)
];

// ✅ Global CORS Middleware (with credentials)
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ✅ Routes
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Test route
app.get("/", (req, res) => {
  res.send("chat backend is running");
});

// =======================
// 🔥 SOCKET.IO
// =======================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

chatSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});
