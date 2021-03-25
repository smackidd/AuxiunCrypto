const router = require("express").Router();
let AssetsToken = require("../models/assetsTokenSchema.js");
let Marketplace = require("../models/marketplaceSchema.js");
const verify = require("./verify-token");
// Dev adds a new item on the marketplace

router.route("/new").post(verify, async (req, res) => {
    const itemPrice = req.body.itemPrice;
    //const details = { name: req.body.itemName, description: req.body.itemDescription };
    const assetHash = "QmSQwrhrhJKLUWo2oEBkhtdNN9k6S7o5eAyQNFWAb62QZK";
    const listDate = new Date();

    /**
     * Brad's IPFS code goes here
     * it will return an assetHash which I will use in the following lines
     * I am hard coding an assetHash for testing purposes for now
     */




    
    
    
    const newItem = AssetsToken({
        token: assetHash,
        owner: req.user,
        inmarketplace: true,
        price: itemPrice
    });

    //save the newAsset to assetsToken database 
    newItem.save()
        .catch((err) => res.json({"success": false, "Error": err}))

    //save the new _id, price, and listdate to marketplace database
    const marketplaceItem = Marketplace({
        tokenid: assetHash,
        price: itemPrice,
        listdate: listDate
    })

    marketplaceItem.save()
        .then((response) => res.json({"success": true, "msg": "Successfully added " + assetHash + " to the blockchain and marketplace", assetHash}))
        .catch((err) => res.json({"success": false, "Error": err}))
    // Inform if the item was successfully added to the blockchain and DB
    
})

// Verify all items owned by a user
  
router.route("/verify").get(verify, async (req, res) => {

    AssetsToken.find({owner: req.user})
        .then((foundUserAssets) => res.json(foundUserAssets))
        .catch(() => res.json("Error could not find assets for userId: " + req.params.userId));

    // Return all assets owned by the req.params.userID in the assetsToken database 

})

module.exports = router;