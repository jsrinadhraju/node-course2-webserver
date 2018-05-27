const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();
app.set('view-engine', 'hbs');
app.use((req,res,next) => {
  var date = new Date();
  var log = `${date}: ${req.method}  ${req.path}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log(`${err} is printed on the screen`);
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  res.render('home.hbs', {
    hometitle: "Hello Home Title",
    welcomemessage: "Welcome to the home",
    year: new Date()
  })
})

app.get("/about", (req, res) => {
  // res.send("About Page");
  res.render('about.hbs', {
    title: "About Title app",
    year: new Date().getFullYear()
  });
})

app.get("/list", (req, res) => {
  // res.send("About Page");
  res.render('list.hbs', {
    title: "List App",
    year: new Date().getFullYear()
  });
})

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Couldn't load the page due to network error"
  });
})
app.listen(port, () => {
  console.log(`Service is up and running. on ${port}`);
});
