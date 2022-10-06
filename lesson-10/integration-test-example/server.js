const app = require('./app');
const { connect } = require('mongoose');
const { mongoURL, port } = require('./config');

connect(mongoURL)
    .then(() => {
        console.log('MongoDB connected');

        app.listen(port, () =>
            console.log(`Server started on http://localhost:${port}`)
        );
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });
