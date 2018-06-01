const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const parser = require('body-parser')
const port = 8080
const db = require('./config/db')

app.use(morgan('short'))
app.use(parser.urlencoded({extended: true}))

const connection = mysql.createConnection(db)
	
	app.listen(port, () => {
		console.log("Server is up and listening on 8080...")
	})
	
connection.connect(function(err) {
  if (err) throw err;
  
  
app.get('/cafes', (req, res) => {
connection.query("SELECT * FROM cafe", function (err, rows, result) {
    if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      }
	  else{
    res.send(rows);
	  console.log(rows);
	  }
	});
});


})