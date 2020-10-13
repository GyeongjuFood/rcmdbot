import mongoose from 'mongoose';

export interface menu {
  restaurant: string,
  imgurl: string,
  title: string,
  desc: string
}

export interface menuEntity extends mongoose.Document, menu {};

const schema = new mongoose.Schema({
  restaurant: { type: String },
  imgurl: { type: String },
  title: { type: String },
  desc: { type: String },
});

export const MenuModel = mongoose.model<menuEntity>('menus', schema);
