const SERVER_PORT   = process.env.PORT || 8080;
const express       = require("express");
const exphbs        = require("express-handlebars");
const bodyparser    = require("body-parser");
const fs            = require("fs");
const apiRouter     = require("./api");
const app           = express();
const router        = express.Router();
const invoicesPath  = __dirname + "/public/data/invoices.json";
const customersPath = __dirname + "/public/data/customers.json";

app.engine("hbs", exphbs({
    defaultLayout: "main",
    extname: "hbs"
}));
app.use(bodyparser());
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
app.get('/customers/:id', (req, res, next) => {
    fs.readFile(customersPath, (error, file) => {
        const fileData = file.toString();
        const parsedFile = JSON.parse(fileData);
        res.render('customers', {
            objJson: parsedFile.filter(customer => customer.id === parseInt(req.params.id))
        });
    });
});

// Render invoice page
app.get('/invoices/', (req, res) => {
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

//Render invoices id page
app.get('/invoices/:id', (req, res, next) => {
    fs.readFile(invoicesPath, (error, file) => {
        const fileData = file.toString();
        const parsedFile = JSON.parse(fileData);
        res.render('invoices', {
            objJson: parsedFile.filter(invoice => invoice.id === parseInt(req.params.id))
        });
    });
});

// PUT CODE FOR RENDERING INVOICE ID PAGE HERE
app.post("/invoices", function(req, res) {
	if (req.body.id && req.body.reservationId && req.body.total &&  req.body.surcharges && req.body.invoiceDateTime){
	    fs.readFile(__dirname + '/public/data/invoices.json', function(error, file) {
	        var parsedFile = JSON.parse(file);
	        parsedFile.push(req.body);
	    	fs.writeFile(__dirname +'/public/data/invoices.json', JSON.stringify(parsedFile, null, 2), function(error) {
	  		});
	  		res.redirect("/invoices");
	  	});
	};
});
   
       // res.end(JSON.stringify(req.body))
   

app.listen(SERVER_PORT, () => {
    console.info(`Server started at http://localhost:${SERVER_PORT}`);
});





// https://programmingmentor.com/post/save-form-nodejs-mongodb/