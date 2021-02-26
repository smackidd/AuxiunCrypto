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
            user.coinbalance += req.body.coinAmount;
            user
                .save()
                .then(() => res.json({
                    success: true,
                    msg: `Successfully purchased ${req.body.coinAmount} Auxiun coin.`,
                    newBalance: user.coinbalance
                }))
                .catch((err) => res.status(400).json("Error: " + err))
        })
        .catch((err) => res.status(400).json("Error: " + err));
})

// Transaction via auxiun coin
  
router.route("/asset").post(async (req, res) => {

    //Check database for login username
    const user = await User.findOne({
    username: req.body.username,
    });
    if (!user) return res.status(400).send("Username does not exist");

    const coinAmount = req.body.coinAmount;

    const newToken = AssetsToken({
        token,
        owner,
        inmarketplace,
        price,
    });

    // Post the new coinAmount to the DB
    // Return the updated amount

})

module.exports = router;