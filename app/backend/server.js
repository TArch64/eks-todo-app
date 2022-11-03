import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {todoRouter} from "./todo-router.js";
import cors from "cors";

const routers = [
    todoRouter
];

await mongoose.connect(process.env.MONGO_URL);

const app = express();

app.use(bodyParser.json());
app.use(cors());

for (const router of routers) {
    app.use(router.basePath, router.middleware)
}

app.listen(3000, '0.0.0.0', () => {
    console.log(`Started at http://0.0.0.0:3000`)
});
