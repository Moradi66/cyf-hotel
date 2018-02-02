const SERVER_PORT = process.env.PORT || 8080;

const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const fs = require("fs");

const apiRouter = require("./api");

const app = express();
const router = express.Router();
const invoicesPath = __dirname + "/public/data/invoices.json";
const customersPath = __dirname + "/public/data/customers.json";

const filePath = `${__dirname}/public/data/reservations.json`;

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.static("assets"));

app.use("/api", apiRouter);

// handle HTTP POST requests
app.use(bodyparser.json());

app.get("/", function(req, res, next) {
  res.render("home");
});

//Render customers page
app.get('/customers/', (req, res) => {
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const parsedFile = JSON.parse(fileData);
    // send the json to the Template to render
    res.render('customers', { 
      objJson: parsedFile
    });
  };
  fs.readFile(customersPath, callbackFunction);
});

//Render customers id page
app.get('/customers/:id', (req,res,next) => {
	fs.readFile(customersPath, (error,file) => {
		const fileData = file.toString();
    	const parsedFile = JSON.parse(fileData);
    	res.render('customers', {objJson: parsedFile.filter(customer => customer.id === parseInt(req.params.id)) });
	});
});

// Shoter code (customers + customers id pages)
// app.get('/customers/:id?', (req,res,next) => {
// 	fs.readFile(customersPath, (error,file) => {
// 		const fileData = file.toString();
//     	const parsedFile = JSON.parse(fileData);
//     	if (req.params.id) {
//     		res.render('customers', {objJson: parsedFile.filter(customer => customer.id === parseInt(req.params.id)) });
//     	} else {
//     		res.render('customers', {objJson: parsedFile});
//     	};
// 	});
// });

// Render invoice page
app.get('/invoices/:id?', (req, res) => {
  const callbackFunction = (error, file) => {

    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const parsedFile = JSON.parse(fileData);
    // send the json to the Template to render
    res.render('invoices', { 
      objJson: parsedFile
    });
  };
  fs.readFile(invoicesPath, callbackFunction);
});

app.get('/:id', (req,res,next) => {
	fs.readFile(invoicesPath, (error,file) => {
		const fileData = file.toString();
    	const parsedFile = JSON.parse(fileData);
    	res.render('invoices', {objJson: parsedFile.filter(invoice => invoice.id === parseInt(req.params.id)) });
	});
});

			// PUT CODE FOR RENDERING INVOICE ID PAGE HERE


app.listen(SERVER_PORT, () => {
  console.info(`Server started at http://localhost:${SERVER_PORT}`);
});
