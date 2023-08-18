const mongoose=require("mongoose")

const main=async()=>{
    try {
        return mongoose.connect("mongodb+srv://edverse1542:Edverse%4029@edverse.vxl2vnw.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        //return mongoose.connect("mongodb+srv://r:lo@cluster0.3507kfr.mongodb.net/?retryWrites=true&w=majority")

        .then(()=>console.log('connected to database'))
    .catch((e)=>console.log(e))
    ///conn.disconnect()

    } catch (error) {
        console.log(error);
    }
    
   // console.log("conneted")
   // conn.disconnect()
}

module.exports=main