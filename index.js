import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import userRouter from "./router/user.js"
import searchRouter from "./router/search.js"
import HistoryRouter from "./router/History.js"
import companyRouter from "./router/company.js"

const port = 4000;

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(res)=>{
    res.send("Hello World!");
});

app.use("/user", userRouter)
app.use("/search", searchRouter);
app.use("/History", HistoryRouter);
app.use("/company", companyRouter);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});