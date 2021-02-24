const router = require("./users");

// Transaction via fiat currency

router.route("/coin").post(async (req, res) => {

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

    // newInput.save().then(async)

    // Post the new coinAmount to the DB
    // Return the updated amount
    
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