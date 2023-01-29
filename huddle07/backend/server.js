

require("dotenv").config();
const textgears =require ('textgears-api');
const connectDB=require('./db');
var multipart = require('connect-multiparty');
const fetch = require('node-fetch');

const express = require("express");
const app = express();
const cors = require("cors");
const { create } = require("ipfs-http-client");
var bodyParser = require('body-parser');
const User = require("./model");
const fs = require('fs');

connectDB();


app.use(cors({
    origin: [`http://127.0.0.1:5173`],
    optionsSuccessStatus: 200,
    credentials: true
  }
));

app.use(function async(req, res, next) {
	res.header('Content-Type', 'application/json;charset=UTF-8')
	res.header('Access-Control-Allow-Credentials', true)
	res.header(
	  'Access-Control-Allow-Headers',
	  'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
  });

//   app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(express.json());
app.use(multipart());

// async function ipfsClient() {
//   const ipfs = await create(
//       {
//           host: "ipfs.infura.io",
//           port: 5001,
//           protocol: "https"
//       }
//   );
//   return ipfs;
// }

// async function saveFile() {

//   let ipfs = await ipfsClient();

//   let data = {
//     walletaddress:"!23",
//     accuracy:["1","2","3"]
//   }
//   let options = {
//       warpWithDirectory: false,
//       progress: (prog) => console.log(`Saved :${prog}`)
//   }
//   let result = await ipfs.add(data, options);
//   console.log(result)
// }

//   saveFile()

// async function getData(hash) {
//     let ipfs = await ipfsClient();

//     let asyncitr = ipfs.cat(hash)

//     for await (const itr of asyncitr) {

//         let data = Buffer.from(itr).toString()
//         console.log(data)
//     }
// }

// getData("QmQbA7BrBNkh1bbSgtUYdUJYsHRfvRN6k5vocxHgjadUjr")

app.post("/rec/getrec", async(req, res) => {
console.log("script",req.body);

const script = req.body.data
 var totalSoFar = script.split(' ').length
 console.log("total words in string", totalSoFar)

 

var totalSoFarError = 0;

const textgearsApi = textgears('TMvt6WKwtoYLW5BO', {language: 'en-US', ai: false});
textgearsApi.checkGrammar(script)
    .then((data) => {
        for (const error of data.response.errors) {
             totalSoFarError++;
            console.log('Error: %s. Suggestions: %s', error.bad, error.better.join(', '));
        }
        console.log("total error words",totalSoFarError)
    })
    .catch((err) => {});


    const percentage_calc=(totalSoFar-totalSoFarError)/totalSoFar*100;
    const  Wallet_Address=req.body.Wallet_Address
    
    const Accuracy=[{percentage:percentage_calc}]
    const userExists = await User.findOne({  Wallet_Address });
   if (userExists) {

    const added = await User.findByIdAndUpdate(
      userExists._id,
      {
        $push: {Accuracy},
      },
      {
        new: true,
      }
    )
    res.status(200).json(added);

   
    }
    else{
      try {
        const user = await User.create({
           Wallet_Address,
           Accuracy
          });
      res.status(200).json(user);
  
        }catch{
          res.status(400);
          throw new Error(error.message);
        }
    }
    
    const wavUrl = req.body.image
const buffer = Buffer.from(
  wavUrl.split('base64,')[1],  // only use encoded data after "base64,"
  'base64'
)
fs.writeFileSync('cat.jpeg', buffer)
      const data = fs.readFileSync('cat.jpeg');
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Rajaram1996/FacialEmoRecog",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      console.log(result);
      var sum=0;
      if(!result.error){
    if(result[0].label!='happy' || result[1].label!='happy' ||  result[0].label!='surprise' ||  result[1].label!='surprise'){
         sum=40;
    }
  else{
    sum=(result[0].score+result[1].score-2)/2
  }}
else{
  sum=60;
}
  console.log("sum",sum)
    
    



});




const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
