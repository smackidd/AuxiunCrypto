const router = require("./users");

// Users lists an asset on the marketplace

router.route("/list").post(async (req, res) => {

    //Check database for login username
    const user = await User.findOne({
    username: req.body.username,
    });
    if (!user) return res.status(400).send("Username does not exist");

    const itemPrice = req.body.itemPrice;
    
    const newAsset = Marketplace({
        tokenid,
        price,
        listdate,
    });

    // Inform if the item was successfully listed
    
})

// Get information on all available items from the marketplace
  
router.route("/assets").get(async (req, res) => {

    //Check database for login username
    const user = await User.findOne({
    username: req.body.username,
    });
    if (!user) return res.status(400).send("Username does not exist");

    // Return all assets on the marketplace

})