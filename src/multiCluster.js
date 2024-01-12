const cluster = require('cluster');
const os = require('os');
const app = require('./index');

if (cluster.isMaster) {
  const numWorkers = os.cpus().length - 1;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    const worker = cluster.fork();
    console.log(`Worker ${worker.id} is running`);
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.id} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.id} exited with code ${code} and signal ${signal}`);
    console.log('Starting a new worker...');
    const newWorker = cluster.fork();
    console.log(`Worker ${newWorker.id} is running`);
  });
} else {
  // Worker process
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} is running on port ${PORT}`);
  });
}
