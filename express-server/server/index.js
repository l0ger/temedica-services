const express = require('express')
const drugRoutes = require('./routes/v1/drug.routes');
const app = express()
const cors = require('cors');
const port = process.env.SERVER_PORT || 3005

app.use(cors());

app.get('/', (req, res) => res.send('Hi there!'));
app.use('/drug', drugRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`))