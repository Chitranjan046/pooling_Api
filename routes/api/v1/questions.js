
const express=require('express')
const Router=express.Router()
const question_controller=require('../../../controller/QuestionsController')

Router.post('/create',question_controller.create)
Router.get('/view/:id',question_controller.showDetails)
Router.delete('/delete/:id',question_controller.deleteQues)
Router.use('/options',require('./options'))


module.exports=Router