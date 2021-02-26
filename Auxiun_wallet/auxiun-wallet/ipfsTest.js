const express = require("express");
const ipfsClient = require("ipfs-http-client");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const app = express();
const ipfs = ipfsClient("http://localhost:5001");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

const authedKeys = ["fake1", "fake2", "fake3"];

const isAuth = (req, res, next) => {
  if (authedKeys.includes(req.body.authKey)) next();
  else
    res.json({
      success: false,
      msg: "Invalid or expired authKey"
    });
};

app.get("/upload", (req, res) => {
  const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>IPFS test</title>
        </head>
        <body>
            <h1>Upload File to IPFS</h1>
            <form action="/file/upload" method="post" enctype="multipart/form-data">
            <label>Upload File:</label>
            <input type="file" name="file" />
            <br /><br />
            <input type="submit" value="Submit" />
            </form>
        </body>
        </html>
    `;

  res.send(html);
});

app.post("/file/upload", async (req, res) => {
  const file = req.files.file;
  console.log(file);

  const fileAdded = await ipfs.add(file.data);
  console.log(fileAdded);
  res.send(file.name);
  //const fileName = req.body.fileName;
  //const filePath = "files/" + fileName;

  // file.mv(filePath, async (err) => {
  //   if (err) {
  //     console.log("Error: Failed to download the file.");
  //     return res.status(500).send(err);
  //   }

  //   const fileHash = await addFile(filePath);
  //   fs.unlink(filePath, (err) => {
  //     if (err) console.log(err);
  //   });

  //   const html = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="UTF-8" />
  //       <title>IPFS Test</title>
  //     </head>
  //     <body>
  //       <h1>File Uploaded!</h1>
  //       <p>Link: <a href="http://127.0.0.1:8080/ipfs/${fileHash}">${fileHash}</a></p>
  //     </body>
  //   </html>
  //   `;
  //   res.send(html);
  // });
});

const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath);
  const fileAdded = await ipfs.add(file);
  console.log(fileAdded.cid);
  const fileHash = fileAdded.cid;
  return fileHash;
};

const addJson = async (data) => {
  const jsonAdded = await ipfs.add(JSON.stringify(data));
  return jsonAdded.cid;
};

const catFile = async (cid) => {
  let chunkedData = [];
  let length = 0;
  for await (const chunk of ipfs.cat(cid)) {
    length += chunk.length;
    chunkedData.push(chunk);
  }
  const data = new Uint8Array(length);
  let offset = 0;
  chunkedData.forEach((chunk) => {
    data.set(chunk, offset);
    offset += chunk.length;
  });
  console.log(data);
  fs.writeFileSync("./files/new.jfif", data);
};

const catJson = async (cid) => {
  let stringified = "";
  for await (const chunk of ipfs.cat(cid)) {
    stringified += chunk.toString();
  }
  return JSON.parse(stringified);
};

app.post("/add/asset", isAuth, async (req, res) => {
  const price = req.body.price;
  const newAsset = {
    title: req.body.details.title,
    desc: req.body.details.desc,
    game: req.body.details.game
  };
  const newAssetCID = await addJson(newAsset);

  console.log(`Web3 call to add new asset to blockchain: ${newAssetCID}`);
  console.log(`DB call to add new asset: ${newAssetCID} with price: ${price}`);

  res.json({
    success: true,
    msg: `Successfully added '${newAsset.title}' to marketplace`,
    assetCID: newAssetCID.toString()
  });
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

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
