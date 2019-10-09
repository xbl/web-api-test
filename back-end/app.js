const express = require('express');
const app = express();
const port = 8083;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/orders', require('./src/orders'));

app.get('/', (req, res) => res.send('Hello World!'));

app.use((err, req, res) => {
    console.log(err.stack);
    res.status(500).json({ message: err.message});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));