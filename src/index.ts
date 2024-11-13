import express, { type Express, type Request, type Response } from "express";
import connectDB from "./db-connection";
import authRoutes from "./routes/auth.route";
import bookRoutes from "./routes/book.route";
import mechanismRoutes from "./routes/mechanism.route";
import formatResponse from "./format/formatResponse";

const app: Express = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req: Request, res: Response) => {
  const date = new Date();
  const response = formatResponse("success", "Hello World", date);
  res.send(response);
});

// Routes
app.use("/book", bookRoutes);
app.use("/auth", authRoutes);
app.use("/mechanism", mechanismRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});