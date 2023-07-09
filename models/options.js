const mongoose=require('mongoose')

const optionSchema=new mongoose.Schema({

    option:{
        type:String,
        required:true,
    },
    question:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
    },
    vote:{
        type:Number,
        default:0
    },
    add_vote:{
        type:String,
    },
}

);

module.exports = mongoose.model('Option', optionSchema);
