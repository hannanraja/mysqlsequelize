const express = require('express')
const app = express();
const cors = require('cors')
var http = require('http');
const port = 3000;
app.use(express.json());
app.use(cors());
app.set('port', port);
var server = http.createServer(app);
const sequelize = require('./config.js')
const User = require('./models/table2');
const User1 = require('./models/table1');
const router = require('./services/userServices')
const productservices = require('./services/productService')
const models = require('./models/index')
app.use(express.urlencoded({ extended: true }));
sequelize.sync().then(() => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});

function onError() {
	console.log('error encountered')
	}
function onListening() {
console.log('Listening')
}


app.get('/', (req, res) => {
    res.status(200).send({
        message: "Working Fine",
        status: 200, 
        data: {}
        })
})

app.use('/apis/crud', router)
app.use('/apis/crud/products', productservices)