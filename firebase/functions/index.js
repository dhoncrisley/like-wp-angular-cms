const functions = require('firebase-functions');
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')();
var FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor.js');

// res.header("Access-Control-Allow-Origin", "http://localhost:4200");
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
exports.uploadImage =
  functions.https.onRequest((req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    console.log("request ", req.body);
    //gcs.Bucket()
    res.status(200).json({ message: req.body });

  });
exports.deleteImage = functions.https.onRequest((req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    console.log("request ", req.body);
    admin.firestore().collection('postMedia').doc(req.body.id).delete().then(
      cb =>{
        console.log('file deleted');
        res.status(200).json({ message: true });
      }, err =>{
        console.log("something's wrong")
        res.status(200).json({ message: false });
      }
    )

  });
exports.loadImages = functions.https.onRequest((req, res) => {

  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");

  var respArr = [];
  var db = admin.firestore();
  
  var citiesRef = db.collection('postMedia');
  var allCities = citiesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        respArr.push(doc.data())
      });
      res.status(200).json(respArr);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "algo deu errado! " + err.message });
    });

});
