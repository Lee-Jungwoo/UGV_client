const express = require('express');
const route = require('./route');
const app = express();
const port = 3000; //port num


app.use(express.static("./"));


app.get('', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

// app.get('/cam', (req, res) => {
//     res.sendFile(__dirname + "/phone_index.html");
// });

app.listen(port, ()=> {
    console.log(`server running... localhost:${port}`);
});

