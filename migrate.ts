import {mongoinit} from './utils';
import {VenueModel} from './model/venue';

const run = async () => {
  await mongoinit();
  
  const vals = await VenueModel.find();
  for(var x of vals) {
    x.keywords = [];
    x.menu = [];
    console.log(x);
    await x.save();
  }
}

run()
