import express from "express";
import cors from "cors";

import configureApp from "./app";


const main = async () => {
    const app = express();
    const PORT = 3000;

    configureApp(app);
    app.listen(PORT, () => {
        console.log(`======= App running on port ${PORT} =======`);
    })
}