const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
  
app.post('/thanks', (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: 'blipco619@gmail.com',
    from: req.body.email,
     subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    res.render('thanks', { contact: req.body })
});

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});