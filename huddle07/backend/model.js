const mongoose = require('mongoose');
const usermodelproj = mongoose.Schema(
    {
        Wallet_Address: {
            type: String,
            required: true,
            unique:true
        },
        
         Accuracy:[
            {
                percentage:String,
                
            }
        ]
    }
);

const User = mongoose.model("User", usermodelproj);
module.exports = User;

