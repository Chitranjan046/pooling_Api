const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    options:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Option'
        },
    ],

},
{
    timestamps: true,// for getting the created , update at fields
}
)

module.exports = mongoose.model('Question', questionSchema);


