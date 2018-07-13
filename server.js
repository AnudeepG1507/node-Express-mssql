//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const app = express();


// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function(req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//databaseconfig
var dbConfig = {
    user: "JavaTest",
    password: "abcd1234",
    server: "SCUITEC726",
    database: "JavaTest"
};

//Setting up server
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});

var executeQuery = function(req, res) {
    sql.connect(dbConfig, function(err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        } else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(req, function(err, response) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                } else {
                    console.log(response);
                    res.send(response);
                }
            });
        }
    });
}

app.get('/', (req, res) => {
    console.log("get method")
    var query = "select * from Persons";
    console.log(query);
    executeQuery(query, res);
});


app.post('/post', (req, res) => {
    console.log("post method")
    var query = "INSERT INTO Persons VALUES (7,'smitha','sompalli')";
    console.log(query);
    executeQuery(query, res);
});

app.put("/api/user/1", function(req, res) {
    var query = "UPDATE Persons SET FirstName= 'Rinny' WHERE PersonID = 1";
    executeQuery(query, res);
});

app.delete("/api/user/7", function(req, res) {
    var query = " DELETE FROM Persons WHERE PersonID = 7 ";
    executeQuery(query, res);
});