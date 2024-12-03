import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, signin } from "./controllers/UsersControllers";

const app: Application = express();




//usuarios


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

app.post("/users/create", registerUsers)
app.post("/users/login", signin)

export default app;