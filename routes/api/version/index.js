const express=require('express')
const Router=express.Router()

// this is the entry point of all the api/v1/questions named url's
Router.use('/question',require('./questions'));
Router.use('/options',require('./options'))

module.exports=Router