const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(cors());

const port = (process.argv[2] | 0) || 8001;

app.post('/log', (req, res) => {
  console.log(
    util.inspect(
      req.body,
      {
        showHidden: false,
        depth: null,
        colors: true
      }
    )
  );
  res.send();
});

app.listen(port, () => {
  console.log(`Listening for logs on 0.0.0.0:${port}/log`);
});
