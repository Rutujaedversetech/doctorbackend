const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    
    
    name:{type:String},
    oemail:{type:String},
    password:{type:String},
    age:{type:Number},
    date:{type:String},
    mobileNo:{type:String},
    Appofees:{type:String},
    AppoDesc:{type:String},
    status:{type:Boolean,required:true,default:false},
    visited:{type:Boolean,required:true,default:false},

     
    },
    {
        versionKey:false,
        timestamps:true
    }
    )

    //blogSchema.index({ name: 1, oemail: 1 ,date:1,mobileNo:1,Appofees:1,});

     const Blog=mongoose.model("blog",blogSchema)
     module.exports=Blog