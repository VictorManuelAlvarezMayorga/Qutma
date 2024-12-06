import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, signin } from "./controllers/UsersControllers";
import { createQuizz, getMetrics, getQuestionnaries } from "./controllers/QuestionnariesControllers";


const app: Application = express();
 

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

//usuarios
app.post("/users/create", registerUsers)
app.post("/users/login", signin)

app.post("/questionnaire/create", createQuizz)
app.get('/questionnarie/get-metrics', getMetrics)
app.get('/questionnarie/get-all', getQuestionnaries)

export default app;