const Store = require('../models/storeModel');
const User = require('../models/User');



// create_store

 const create_store = async (req,res) => {
    try {
        const userData = await User.findOne({_id:req.body.vendor_id});
        if(userData){
               if(!req.body.latitude || !req.body.longitude){
                res.status(200).send({success:false,msg:"lat and long is not found!"});
               }
               else{
                const vendorData = await Store.findOne({vendor_id:req.body.vendor_id});
                if(vendorData){
                    res.status(200).send({success:false,msg:" this vindor is already created a stroe"});
                }
                else{
                          const store = new Store ({
                            vendor_id:req.body.vendor_id,
                            address:req.body.address,
                            logo:req.file.filename,
                            business_email:req.body.ness_email,
                            pin:req.body.pin,
                            location:{
                                type:"Point",
                                coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
                                
                            }
                          });
                          const storeData = await store.save();
                          res.status(200).send({success:true,msg:"store data",data:storeData});
                }
               }
        }
        else{
            res.status(200).send({success:false,msg:"Vindor Id does not exists"});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
} 


const get_store = async (req,res)=>{
    try {
        return Store.findOne({_id:id});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// // find nearest store
// const find_store = async(req,res)=>{
//     const latitude = req.body.latitude;
//     const longitude = req.body.longitude;
//     try {
//         const store_data = await Store.aggregate([
//             {
//                 $geoNear:{
//                     near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
//                     key:"location",
//                     maxDistance:parseFloat(1000)*1609,
//                     distanceFeild:"dist.calculated",
//                     spherocal:true
//                 }
//             }
//         ])
//         res.status(200).send({success:true,message:"store deatils",data:store_data});
//     } catch (error) {
//         res.status(400).send({success:false,message:error.message});
//     }

// }
const find_store = async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).send({ success: false, message: "Latitude and longitude are required" });
    }

    try {
        const store_data = await Store.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                    key: "location",
                    maxDistance: 1000 * 1609, // 1000 miles in meters
                    distanceField: "dist.calculated",
                    spherical: true
                }
            }
        ]);

        res.status(200).send({ success: true, message: "Store details", data: store_data });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};
module.exports = {
    create_store,
    get_store,
    find_store
}