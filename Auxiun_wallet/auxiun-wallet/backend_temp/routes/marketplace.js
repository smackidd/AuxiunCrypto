const router = require("./users");
let AssetsToken = require("../models/assetsTokenSchema.js");
let Marketplace = require("../models/marketplaceSchema.js");

// Users lists an asset on the marketplace
router.route("/list/:assetId").post(verify, async (req, res) => {

    //Find asset in assetTokenSchema through passed asset Id
    AssetsToken.findById(req.params.assetId
        .then((foundAsset) => {
            //Then compare the ownerId in found asset with the userId passed in request
            //If successful set inmarketplace to true
            if(foundAsset.owner == req.body.userId){
                foundAsset.inmarketplace = true;
                //save foundAsset in asset database
                foundAsset.save()
            }
            //else throw error because userId does not match ownerId
            else{res.json({"success": false, "msg": "User does not own asset:" + req.params.assetId})}
        })
        //If assetId could not be found throw error message assetId could not be found
        .catch(() => res.json({"success": false, "msg": "assetId could not be found"})));

    const itemPrice = req.body.itemPrice;
    //Get current date for list date
    const listDate = new Date();

    const newAsset = Marketplace({
        tokenid: req.params.assetId,
        price: itemPrice,
        listdate: listDate,
    });

    //Save new asset in marketplace database
    newAsset.save()
        //If succesful respond with success json as per Brads API Schema
        .then(() => res.json({"success": true, "msg": "Successfully listed" + req.params.assetId}))
        //On Fail respond with failure json as per Brads API Schema
        .catch((err) => res.json({"success": false, "msg": err}));
})

// Get information on all available items from the marketplace
  
router.route("/assets").get(verify, async (req, res) => {

    // Return all assets on the marketplace
    Marketplace.find()
        .then((assets) => res.json(assets))
        .catch((err) => res.status(400).json(err));
})