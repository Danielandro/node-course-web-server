const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
// key-value pair. Key = value to be set, value = value to use 
app.set('view engine', 'hbs');
// static assets e.g html, css, js files
app.use(express.static(__dirname + '/public')); // Express middleware
app.use((req, res, next) => { 
    let now = new Date().toString()
    let log = `${now}: --${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to add to log');
        }    
        next();    
    });   
    
});

app.use((req, res, err) => {    
    res.render('maintenance');
    
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {    

    res.render('home', {
        pageTitle: 'Homepage',        
        welcomeMessage: 'Welcome to the Playing Field'
    });
});

app.get('/about', (req, res) => {
    
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to complete request'
    });
});

app.listen(3000, () => {
    console.log('Server is running on Port 3000');
});