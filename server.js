let express = require('express');
let app = express();
let morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(7000, () => {
    console.log('listening on port 7000');
});