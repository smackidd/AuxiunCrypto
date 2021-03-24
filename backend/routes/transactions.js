const router = require("express").Router();
let User = require("../models/userSchema");
let AssetsToken = require("../models/assetsTokenSchema");
const jwt = require("jsonwebtoken");
const verify = require("./verify-token");

// Transaction via fiat currency
// Verify the token in middleware
// then grab the balance for the user, add the req.body.coinAmount
// and save the updated balance to the database
router.route("/coin/").post(verify, async (req, res) => {
  //Check database for _id
  //_id is contained in req.user which was passed from the token verification
  const user = await User.findById(req.user)
    .then((user) => {
      console.log(user);
      console.log(req.body.coinAmount);

      //TODO pull coinBalance from blockchain
      //TODO mint new coins to blockchain

      //update coinAmount in db
      user.coinbalance += req.body.coinAmount;
      user
        .save()
        .then(() =>
          res.json({
            success: true,
            msg: `Successfully purchased ${req.body.coinAmount} Auxiun coin.`,
            newBalance: user.coinbalance
          })
        )
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Buy asset with Auxiun coin
// First verify auth-token
// find balance of user with req.user returned from auth-token verify
// find asset from assetsToken and confirm it is listed on marketplace
// check price of asset to balance of user, catch error: insufficient funds
// reduce user balance and save, unlist asset from marketplace and save
// return asset hash and new balance of user.
router.route("/asset").post(verify, async (req, res) => {
  let balance = 0.0;
  const assetHash = req.body.assetHash;

  //TODO possibly drop this database call and get user blockchain account id from JWT
  //Check database for user
  const user = await User.findById(req.user).catch((err) =>
    res.status(400).json("Error: " + err)
  );

  //asset info from db is Price, and if listed in marketplace
  //Check database for asset
  const asset = await AssetsToken.findOne(assetHash).catch((err) =>
    res.status(400).json("Error: " + err)
  );
  if (!asset.inmarketplace)
    res.status(400).send("Asset is not available in the marketplace");

  //check price of asset to balance of user
  if (asset.price > user.coinbalance)
    res.status(400).send("Insufficient Funds");

  //TODO preform web3 transfer
  //TODO update owner's coinBalance
  //TODO update assets table to not list in marketplace

  //complete transaction in respective databases
  await User.findById(req.user)
    .then((user) => {
      user.coinbalance -= asset.price;
      balance = user.coinbalance;

      user.save().catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));

  ////
  //
  // remove from marketplace database too
  //
  ////

  await AssetsToken.findOne(assetHash)
    .then((asset) => {
      asset.inmarketplace = false;

      asset.save().then((res) => {
        res.json({
          success: true,
          msg: `Successfully purchased ${assetHash} for ${asset.price}`,
          newBalance: balance
        });
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
