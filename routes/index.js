var express = require('express');
var router = express.Router();
var axios = require('axios');
const { BICYCLE_SERVICE_PORT = 4040 } = process.env;
const bicycleService = 'http://localhost:${BICYCLE_SERVICE_PORT}';


/* GET home page. */
router.get('/', async function(req, res, next) {
  const { id } = req.params;
  const { data: bicycle } = await axios.get('${bicycleService}/${id}')
  res.setHeader("Content-type", "application/json");
  res.send({
    id: bicycle.id,
    color: bicycle.color
  })
});

module.exports = router;
