import mongoose from 'mongoose';

export interface keyword {
  keyword: string
}

export interface keywordEntity extends mongoose.Document, keyword {};

const schema = new mongoose.Schema({
  keyword: { type: String }
});

export const KeywordModel = mongoose.model<keywordEntity>('keywords', schema);
