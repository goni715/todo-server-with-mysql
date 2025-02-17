import app from "./app";
import config from "./config";

const port = config.port || 5000;

app.listen(5000, ()=> {
    console.log(`Server running at @${port}`);
})