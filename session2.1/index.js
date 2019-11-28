const express = require("express"),
    app = express();

const metrics = require('./metrics')

path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('menu.ejs', {name: req.params.name})
});

app.get("/hello", (req, res) => {
    res.render('hello.ejs', {name: req.params.name})
});

app.post("/metrics",(req,res) => {
    metrics.get((err, data) => {
        if(err) throw err
        res.status(200).json(data)
      })
})

app.listen(4002, () => 
    console.log("express is listenning on http://localhost:4002")
);