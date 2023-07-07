const express=require('express')
const Router=express.Router()

// this is the entry point of all the api named url's
console.log("Yes I am Enter")
Router.use('/api',require('./api/index'));

module.exports=Router