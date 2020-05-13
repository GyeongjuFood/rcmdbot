import {VenueModel, venueParams} from './model/venue';

const createItem = async (item: venueParams) => {
  await VenueModel.create(item);
};

// TODO: update searchParam
interface searchParam {
  region: string,
  foodtype: string,
  isRandom: boolean
}

const readItem = async (search: searchParam) => {
  let ans: venueParams[];
  if(search.isRandom === true) {
    ans = await VenueModel.aggregate().sample(10) as venueParams[];
  } else if(search.region !== '') {
    ans = await VenueModel.find({region: search.region}).limit(10).sort({rate: "desc"});
  } else if(search.foodtype !== '') {
    ans = await VenueModel.find({foodtype: search.foodtype}).limit(10).sort({rate: "desc"});
  } else {
    ans = await VenueModel.find().limit(10).sort({rate: "desc"});
  }
  return ans;
};

const updateItem = () => {};

const deleteItem = () => {};

export default {
  createItem,
  readItem,
  updateItem,
  deleteItem
};
