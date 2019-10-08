const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	const app = express();
	app.get('/test/:value', (req, res) => {
		const value = req.params.value;
		res.send(`this is my value : ${value} & used process ${process.pid}` );
    });
    
    app.listen(8080);

	console.log(`Worker ${process.pid} started`);
}
