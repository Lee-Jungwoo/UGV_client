const express = require('express');
const route = require('route');
const app = express();
const port = 3000; //port num




app.route('/')
    .get('/', (req, res) => {
    res.send('Hello World!');
}).post((req, res) => {
    res.send('post');
}).put((req, res) => {
    res.send('put');
}).delete((req, res) => {
    res.send('del');
})

app.listen(port, ()=> {
    console.log(`server running..  localhost:${port}`);
});

