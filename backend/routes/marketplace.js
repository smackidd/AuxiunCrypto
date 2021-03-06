const router = require("express").Router();
// const router = require("./users");
const AssetsToken = require("../models/assetsTokenSchema.js");
const Marketplace = require("../models/marketplaceSchema.js");
const jwt = require("jsonwebtoken");
const verify = require("./verify-token");

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient("http://localhost:5001");

const catJson = async (cid) => {
  let stringified = "";
  for await (const chunk of ipfs.cat(cid)) {
    stringified += chunk.toString();
  }
  return JSON.parse(stringified);
};

// Users lists an asset on the marketplace
// requires req.body.userId and req.body.itemPrice
router.route("/asset/list/:assetId").post(verify, async (req, res) => {
  const itemPrice = req.body.itemPrice;
  //Get current date for list date
  const listDate = new Date();

  //Find asset in assetTokenSchema through passed asset Id
  const asset = await AssetsToken.findOne({ token: req.params.assetId })
    .exec()
    .then((foundAsset) => {
      //Then compare the ownerId in found asset with the userId passed in request
      //If successful set inmarketplace to true
      if (foundAsset.owner == req.body.userId) {
        foundAsset.inmarketplace = true;
        foundAsset.price = itemPrice;
        //save foundAsset in asset database
        foundAsset.save();
      }
      //else throw error because userId does not match ownerId
      else {
        res.json({
          success: false,
          msg: "User does not own asset:" + req.params.assetId
        });
      }
    })
    //If assetId could not be found throw error message assetId could not be found
    .catch(() =>
      res.json({ success: false, msg: "assetId could not be found" })
    );

  const newAsset = Marketplace({
    tokenid: req.params.assetId,
    price: itemPrice,
    listdate: listDate
  });

  //Save new asset in marketplace database
  newAsset
    .save()
    //If successful respond with success json as per Brads API Schema
    .then(() =>
      res.json({
        success: true,
        msg: "Successfully listed" + req.params.assetId
      })
    )
    //On Fail respond with failure json as per Brads API Schema
    .catch((err) => res.json({ success: false, Error: err }));
});

// Get information on all available items from the marketplace

router.route("/assets").get((req, res) => {
  // Return all assets on the marketplace
  AssetsToken.find()
    .then(async (assets) => {
      //TODO grab ipfs URI from the blockchain token id

      cidList = [];
      for (let i = 0; i < assets.length; i++) {
        const tokenObject = await catJson(assets[i].token);
        cidList.push(tokenObject);
      }

      res.json(cidList);
    })
    .catch((err) => res.status(400).json(err));
});

// ? is this necessary

router.route("/add").post((req, res) => {
  const asset = AssetsToken({
    token: req.body.token,
    owner: req.body.owner,
    inmarketplace: false,
    price: req.body.price
  });

  asset.save().then(() =>
    res.json({
      success: true,
      msg: "Successfully added " + asset.token
    })
  );
});

module.exports = router;
