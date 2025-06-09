import express from "express";
import statusRoute from "./routes/statusRoutes";
import routeToQueue from "./routes/routeToQueue";
import config from "./config";

const app = express();
const port = config.port;

app.use(express.json());

app.use(`/api`, statusRoute);

const userRoute = routeToQueue("users", config.userServiceQueue)
app.use(`/api`, userRoute);

const courseRoute = routeToQueue("courses", config.courseServiceQueue);
app.use("/api", courseRoute);

const tagRoute = routeToQueue("tags", config.tagServiceQueue);
app.use("/api", tagRoute);

const lessonRoute = routeToQueue("lessons", config.lessonServiceQueue);
app.use("/api", lessonRoute);

const commentRoute = routeToQueue("comments", config.commentServiceQueue);
app.use("/api", commentRoute);

const enrollmentRoute = routeToQueue("enrollment", config.enrollmentServiceQueue);
app.use("/api", enrollmentRoute);

app.listen(port, () => {
  console.log(`API Gateway прослушивает порт: ${port}`);
});
