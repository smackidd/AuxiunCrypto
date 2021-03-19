const express = require("express");
const ipfsClient = require("ipfs-http-client");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const ipfs = ipfsClient("http://localhost:5001");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

const corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

const authedKeys = ["fake1", "fake2", "fake3"];
const tempAssets = [
  "QmVqPXY3Tu5tBhmnA4SFB24GrCH3ExnPGgZgqMVYGSnaJE",
  "QmSQwrhrhJKLUWo2oEBkhtdNN9k6S7o5eAyQNFWAb62QZK"
];

const isAuth = (req, res, next) => {
  if (authedKeys.includes(req.body.authKey)) next();
  else
    res.json({
      success: false,
      msg: "Invalid or expired authKey"
    });
};

app.get("/dev/asset/new", (req, res) => {
  const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Asset creation IPFS test</title>
        </head>
        <body>
            <h1>Fill in Asset Details to IPFS</h1>
            <form action="/api/asset/new" method="post" enctype="multipart/form-data">
            <label>Asset Name:</label>
            <input type="text" name="name" required/>
            <br /><br />
            <label>Asset Description:</label>
            <input type="text" name="description" required/>
            <br /><br />
            <label>Asset Game:</label>
            <input type="text" name="game" required/>
            <br /><br />
            <label>Upload Image:</label>
            <input type="file" name="file" required/>
            <br /><br />
            <input type="submit" value="Submit" />
            </form>
        </body>
        </html>
    `;

  res.send(html);
});

app.post("/api/asset/new", async (req, res) => {
  const file = req.files.file;
  const body = req.body;
  //console.log(body);

  const fileAdded = await ipfs.add(file.data);
  //console.log(fileAdded);

  const newAsset = {
    name: body.name,
    description: body.description,
    game: body.game,
    image: fileAdded.cid.toString()
  };

  const newAssetCid = await addJson(newAsset);
  //replace this with call to DB
  tempAssets.push(newAssetCid);
  console.log(newAssetCid);
  res.json({ msg: "Added new asset!", cid: newAssetCid });
});

const addJson = async (data) => {
  const jsonAdded = await ipfs.add(JSON.stringify(data));
  return jsonAdded.cid.toString();
};

const catJson = async (cid) => {
  let stringified = "";
  for await (const chunk of ipfs.cat(cid)) {
    stringified += chunk.toString();
  }
  return JSON.parse(stringified);
};

app.get("/api/marketplace/assets", async (req, res) => {
  //call db to get list of asset cids instead of hard coding
  const assets = [];
  for (let i = 0; i < tempAssets.length; i++) {
    const item = tempAssets[i];
    // console.log(item);
    const resItem = await catJson(item);
    assets.push(resItem);
  }
  res.json(assets);
});

app.get("/asset/json/:cid", async (req, res) => {
  const cid = req.params.cid;
  const retrievedJson = await catJson(cid);
  res.json(retrievedJson);
});

app.get("/asset/file/:cid", async (req, res) => {
  const cid = req.params.cid;
  const retrievedFile = await catFile(cid);
  res.send("Look at the node console.");
});

app.listen(3005, () => {
  console.log("Server listening on port 3005");
});
