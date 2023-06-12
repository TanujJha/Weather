const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "4f1286dfaf0d5ac9bf67e76c616e7e81";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            console.log(temp)
            console.log(weatherDescription)
            console.log(weatherData)
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>the temp is " + temp + " degree</h1>");
            res.write("<h1>the weather is " + weatherDescription + "</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send()

        })
    })
})




app.listen(3000, function () {
    console.log("server running!");
})