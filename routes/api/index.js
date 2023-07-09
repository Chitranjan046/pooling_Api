const express=require('express')
const Router=express.Router()

// this is the entry point of all the api/v1 named url's
Router.use('/version',require('./version/index'));

module.exports=Router