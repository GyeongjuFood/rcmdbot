import { KeywordModel, keyword } from './model/keyword';
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

const keywordItem = async (keyword: string) => {
  const ans = await VenueModel.find({keywords: keyword }).limit(10);
  return ans;
}

const getItem = async (name: string) => {
  const val = await VenueModel.findOne({name: name});
  return val;
};

const keywordList = async() => {
  const val = await KeywordModel.aggregate().sample(10) as keyword[];
  return val;
}

const addKeyword = async (str: string) => {
  await KeywordModel.create({keyword: str});
  return {success: true};
}

const updateItem = () => {};

const deleteItem = () => {};

export default {
  createItem,
  readItem,
  getItem,
  keywordItem,
  keywordList,
  addKeyword,
  updateItem,
  deleteItem
};
