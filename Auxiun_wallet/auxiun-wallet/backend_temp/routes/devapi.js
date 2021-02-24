const router = require("./users");

// Dev adds a new item on the marketplace

router.route("/new").post(async (req, res) => {

    //Check database for login username
    const user = await User.findOne({
    username: req.body.username,
    });
    if (!user) return res.status(400).send("Username does not exist");

    const itemPrice = req.body.itemPrice;
    const details = { name: req.body.itemName, description: req.body.itemDescription };
    
    const newItem = Devs({
        email,
        password,
        companyname,
        authkey,
    });

    // Inform if the item was successfully added to the blockchain and DB
    
})

// Verify all items owned by a user
  
router.route("/verify").post(async (req, res) => {

    //Check database for login username
    const user = await User.findOne({
    username: req.body.username,
    });
    if (!user) return res.status(400).send("Username does not exist");

    const coinAmount = req.body.userEmail;

    // Return all assets owned by the email which the owner verified

})