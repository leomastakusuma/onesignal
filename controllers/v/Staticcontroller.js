const Push = require('../../library/pushNotif')

module.exports = {
  
    pushtoAll : (req,res)=>{
        Push.pushTime();
       res.json("send")
    }

   
};
