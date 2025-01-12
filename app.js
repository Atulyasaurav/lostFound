const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const itemRouter = require('./routes/items');
const adminRouter = require('./routes/admin');

const mongoConnect = require("./utils/database").mongoConnect;
const cookieParser = require('cookie-parser');


const errorController = require('./controller/error');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use("/admin",adminRouter)
app.use(itemRouter)

app.use("/",errorController.error)


mongoConnect(client => {
    app.listen(7890);
});
