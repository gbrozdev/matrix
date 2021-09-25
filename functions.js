const bcrypt = require('bcrypt')
var db = require('./connection')


module.exports={
    doSignup:(userdata)=>{
        return new Promise(async(resolve,reject)=>{
            userdata.password=await bcrypt.hash(userdata.password,10)
            db.get().collection('user').insertOne(userdata).then(async (data)=>{
                let id = data.insertedId
                let user = await db.get().collection('user').findOne({_id:id})
                resolve(user)
            })
        })
    }, 
    doLogin:(userdata)=>{
        return new Promise(async(resolve,reject)=>{
            const user= await db.get().collection('user').findOne({email:userdata.email})
            validPassword= await bcrypt.compare(userdata.password,user.password)

                if(!validPassword){
                    console.log('login failed');
                }else {
                    console.log('login success');
                    
                    resolve()
                }
            })  
    }

}