const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(express.static('css'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});
app.listen(8080);

const url = 'http://localhost:8080';

describe('My portfolio', function() {
  this.timeout(12000);
  this.slow(4000);
  beforeEach(() => {
    let nightmare = new Nightmare({ show: true });
    // nightmare = new Nightmare({
    //   openDevTools: {
    //     mode: 'detach'
    //   },
    //   show: true
    // });
  });

  it('should load successfully', () => axios.get(url).then(r => expect(r.status === 200)));
});