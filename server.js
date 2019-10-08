const express = require('express');





const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());


//Routers
const routerTest = require("./router/test");
const routerMongo = require("./router/mongo");
app.use("/test", routerTest);
app.use("/mongo", routerMongo);


var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '192.168.99.101',
	user: 'root',
	password: 'mypass123',
	database: 'my_database'
});

try {
	connection.connect((err) => {
		if (err) throw err;

		app.get('/', (req, res) => {
			connection.query('select username from users', function(error, results, fields) {
				if (error) throw error;
				console.log('The solution is: ', results[0]);
				let table = '';
				table += '<table>';
				table += '<tr><td>users</td></tr>';
				Array.from(results).forEach((row) => {
					table += `<tr><td>${row.username}</td></tr>`;
				});

				table += '</table> <h1>dsfsdfsdf</h1>';

				res.send(table);
			});
		});

		app.get('/add', (req, res) => {
			connection.query(
				"insert into users (username,password) values ('simple_user','123456789hashed')",
				(error, results, fields) => {
					if (error) throw error;
					console.log('added ! ');
					res.sen('success');
				}
			);
		});

		app.listen(3000);
	});
} catch (err) {
    console.log('error connection to database');

}
