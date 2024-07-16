import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import indexRouter from "./src/routes/index.js";
import Connection from "./src/db/config.js";
import setupSocket from "./src/stockets.js";

// Helper function to get __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const server = createServer(app);

// Kết nối tới database
Connection()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);





app.use(express.static(path.join(__dirname, "public")));
server.listen(PORT, () => console.log(`💬 server on port ${PORT}`));

const io = setupSocket(server);

app.use(express.static(path.join(__dirname, "public")));

