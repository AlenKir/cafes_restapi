const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const parser = require('body-parser')
const port = 8080
const db = require('./config/db')

app.use(express.static("./public"))
app.use(parser.urlencoded({extended: false}))
app.use(morgan('short'))
app.use(parser.urlencoded({extended: true}))

const connection = mysql.createConnection(db)
	
	app.listen(port, () => {
		console.log("Server is up and listening on 8080...")
	})
	
connection.connect(function(err) {
  if (err) throw err;
  
app.get('/cafes', (req, res) => {
	const q = "SELECT * FROM cafe";
connection.query(q, function (err, rows, result) {
    if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      }
	  else{
    res.send(rows);
	  console.log(rows);
	  }
	});
});

app.get('/cafebyid/:id', (req, res) => {
	const q = "SELECT * FROM cafe WHERE cafe_id = ?";
	const cafeId = req.params.id;
	console.log("request cafe with id = " + cafeId);
	connection.query(q, [cafeId], function (err, rows, result) {
    if (err) { 
		res.send(err)
        //res.send({ 'error': 'An error has occurred' }); 
      }
	  else{
		res.send(rows);
	  console.log(rows);
	  }
	});
});

app.get('/cafebyname/:name', (req, res) => {
	const q = "SELECT * FROM cafe WHERE cafe_name = ?";
	const cafeName = req.params.name;
	console.log("request cafe with cafe_name = " + cafeName);
	connection.query(q, [cafeName], function (err, rows, result) {
    if (err) { 
		res.send(err)
        //res.send({ 'error': 'An error has occurred' }); 
      }
	  else{
		res.send(rows);
	  console.log(rows);
	  }
	});
});

app.post('/cafe_add', (req, res) => {
	
	console.log("Trying to add cafe...");
	const name = req.body.add_name
	const note = req.body.add_note
	const address = req.body.add_address
	
	const q = "INSERT INTO cafe (cafe_name, cafe_note, cafe_address) VALUES (?, ?, ?)";
	connection.query(q, [name, note, address], function (err, results, fields) {
    if (err) { 
		res.send(err)
        //res.send({ 'error': 'An error has occurred' }); 
      }
	  else
	  {
	    console.log("Adding " + name + " " + " " + note + " " + address + "id = " + results.insertId);
		res.end()
	  }
	})	
});


})