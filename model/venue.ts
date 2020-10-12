import mongoose from 'mongoose';

export interface venueParams {
  name: string,
  region: string,
  foodtype: string,
  rate: number,
  desc: string,
  imgUrl: string,
  link: string,
  map: string,
  menu: string[],
  keywords: string[]
}

export interface venue extends mongoose.Document, venueParams {};

const schema = new mongoose.Schema({
  name: { type: String },
  region: { type: String },
  foodtype: { type: String },
  rate: { type: Number },
  desc: { type: String },
  imgUrl: { type: String },
  link: { type: String },
  map: { type: String },
  menu: [{ type: String }],
  keywords: [{ type: String }]
});

export const VenueModel = mongoose.model<venue>('venus', schema);
