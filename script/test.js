
// module.exports = async function(req, res){
//     const users = require('../models/model')
//     try{
//         let user = await users.find({});
//     if(!user){
//         console.log('user not found==-=-=-=-=-=');
//     }else{
//         console.log('user -----==',user);
//     }
//     }catch(err){
//         console.log(err);
//     };
// };


// module.exports = async function (req, res) {
//     const users = require('../models/todoSchema')
//     try {
//         let userId = '63353febdb5d21ef266db6cf';
//         let user = await users.findByIdAndUpdate({ '_id': userId },{ $set:{'heading':'userSKU1232'}},{new:true});
//         if (!user) {
//             console.log('user not found==-=-=-=-=-=');
//         } else {
//             console.log('user -----==', user);
//             // user.heading = "userSKU";
//         }
//     } catch (err) {
//         console.log(err);
//     };
// };

module.exports = async function (req, res) {
    const users = require('../models/model')
    try {
        let userEmail = 'harry@gmail.com';
        let user = await users.findOneAndUpdate({ 'email': userEmail },{ $set:{'name':'harry-SKU123'}},{new:true});
        if (!user) {
            console.log('user not found==-=-=-=-=-=');
        } else {
            console.log('user -----==', user);
            // user.heading = "userSKU";
        }
    } catch (err) {
        console.log(err);
    };
};