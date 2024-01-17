'use strict'
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { BICYCLE_SERVICE_PORT = 4040, BRAND_SERVICE_PORT = 5050 } = process.env;

const bicycleSrv= `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`
router.get('/:id', async function (req, res, next){
  
})


module.exports = router;
