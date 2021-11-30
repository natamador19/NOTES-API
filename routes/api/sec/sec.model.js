var conn= require('../../../utils/dao');
var ObjectID= require('mongodb').ObjectId;
const bcrypt=require("bcryptjs");

var _db; 
class Sec{
    secColl =null; 
    constructor(){
        this.initModel();
    }
    async initModel(){
        try {
            _db=await conn.getDB();
            this.secColl= await _db.collection("usuarios");
        } catch (ex) {
            console.log(ex);
            process.exit(1);
            
        }
    }

    async newUser(email,password){
        try {
            let user={
                email:email,
                password:await bcrypt.hash(password,10),
                lastlogin:null,
                lastpasswordchange:null,
                oldpasswords:[],
                roles:["public"]
            }
            let result = await this.secColl.insertOne(user);
            return result;
        } catch (ex) {
            console.log(ex);
            throw(ex);
            
        }
    }

    async getByEmail(email){
        const filter={"email":email};
        return await this.secColl.findOne(filter);
    }

    async comparePassword(rawPassword,dbPassword){
        return await bcrypt.compare(rawPassword,dbPassword);
    }
}

module.exports=Sec;
