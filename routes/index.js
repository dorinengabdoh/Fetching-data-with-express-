'use strict'
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { BICYCLE_SERVICE_PORT = 4040, BRAND_SERVICE_PORT = 5050 } = process.env;

const bicycleService = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;
router.get('/:id', async function (req, res, next){
  const { id } = req.params;
  const noop = Function.prototype;
  const signal = AbortSignal.timeout(3000);
  const bicycleReq = await fetch(`${bicycleService}/${id}`, { signal});
  const brandReq = await fetch(`${brandSrv}/${id}`, { signal });
  const bicycleProm = bicycleReq.json();
  const brandProm = brandReq.json();
  bicycleProm.catch(noop);
  brandProm.catch(noop)
  const results = await Promise.allSettled([bicycleProm, brandProm])
  for (const {reason} of results) if (reason) console.log(reason);
  const [bicycle, brand] = results.map(({ value }) => value);
  if (bicycle && brand) {
    res.setHeader('content-type', "application/json");
    res.send({
      id: bicycle.id,
      color: bicycle.color,
      brand: brand.name,
    })
  }
})


module.exports = router;
