const express=require('express')
const Router=express.Router()

// this is the entry point of all the api/v1 named url's
Router.use('/v1',require('./v1/index'));

module.exports=Router