const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//criando a aplicaçao
const app = express();

mongoose.connect('mongodb+srv://omnidevradar:omnidevradar@cluster0-i73wz.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);


// endereço de acesso para a aplicação. no caso localhost:5000
app.listen(5000);
