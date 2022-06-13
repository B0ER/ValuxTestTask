import mongoose from 'mongoose';
import * as config from '../configs';


mongoose.connect(config.mongo.connectionLink, {
  dbName: config.mongo.collection,
  authSource: config.mongo.authCollection,
}).then(() => {
  console.log('Db was connected');
}).catch(err => {
  console.log('Db was not connected');
  console.error(err);
  process.exit(1);
});
