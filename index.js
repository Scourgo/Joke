import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post ("/", async (req, res) => {
    const lastNameChar = req.body.lastName.length;
    console.log(lastNameChar)

    const totalchar = req.body.firstName.length + req.body.lastName.length + 305;
    console.log(totalchar);
    try{
    const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?type=single&idRange=${lastNameChar}-${totalchar}&amount=1`);
    const result = response.data;
    const randomgif = Math.floor(Math.random()*2);
    console.log(result);
    res.render("index.ejs", {data : result, giff : randomgif });
    }
    catch(error){
        res.statusCode(404).render("index.ejs");
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
