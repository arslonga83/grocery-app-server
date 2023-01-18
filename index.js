const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const api = require('./api');

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`list server is running on port ${port}.`)
});

app.get('/', api.getList);
app.post('/', api.addItem);
app.put('/:id', api.editItem);
app.delete('/:id', api.deleteItem);