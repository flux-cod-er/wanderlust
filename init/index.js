const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing.js');
const { object } = require('joi');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log('Connected to MongoDB');
    } )
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj , owner: "688d299f5d8d2ed6d405fe95"}));
  
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();
    

    //({...obj, owner : "652d0081ae547c5d37e56b5f"}));