import Express from 'express';
import {wrapper} from './utils';
import * as openbuilder from 'openbuilder-node';
import service from './service';
import {carousel} from './carousel';

const menublock = "5f84fccc5541650cdef803bd";
const keywordblock = "5f84fcb25541650cdef803ab";

const newVenue = wrapper(
  'newVenue',
  async(req:Express.Request, res:Express.Response) => {
    const params = {
      name: req.body.name as string,
      region: req.body.region as string,
      foodtype: req.body.foodtype as string,
      rate: Number(req.body.rate),
      desc: req.body.desc as string,
      imgUrl: req.body.imgUrl as string,
      link: req.body.link as string,
      map: req.body.map as string,
      menu: [],
      keywords: []
    };
    console.log(params);
    const ans = await service.createItem(params);
    return res.status(200).json(ans);  
  }
);

const newKeyword = wrapper(
  'newKeyword',
  async(req, res) => {
    const ans = await service.addKeyword(req.body.keyword);
    return res.status(200).json(ans);
  }
)

const menu = wrapper(
  'random',
  async(req: Express.Request, res: Express.Response) => {
    const name = String(req.body.action.clientExtra.name) as string;
    const item = await service.getItem(name);
    if(item === null) {
      return res.status(200).json({});
    }
    const card = new openbuilder.Card.BasicCard(item.name, item.menu.join('\n'), item.imgUrl);
    const output = new openbuilder.Output.Bare(card);
    const ans = output.json();
    return res.status(200).json(ans);
  }
);

const detail = wrapper(
  'random',
  async(req: Express.Request, res: Express.Response) => {
    const name = String(req.body.action.clientExtra.name) as string;
    const item = await service.getItem(name);
    if(item === null) {
      return res.status(200).json({});
    }
    
    const card = new openbuilder.Card.BasicCard(item.name, item.desc, item.imgUrl);
    const linkbtn = openbuilder.Cmpnts.Button('webLink', {label: "가게 소개", link: item.link});
    const mapbtn = openbuilder.Cmpnts.Button('block', {label: "메뉴 보기", blockId: menublock, extra: {name: item.name}});
    card.addBtn(linkbtn);
    card.addBtn(mapbtn);
    const output = new openbuilder.Output.Bare(card);
    const ans = output.json();
    return res.status(200).json(ans);

  }
)

const random = wrapper(
  'random', 
  async(_req:Express.Request, res:Express.Response) => {
    const search = await service.readItem({region: '', foodtype: '', isRandom: true});
    const output = carousel(search);
    
    const skillRes = new openbuilder.SkillResponse();
    skillRes.template.addOutput(output);
    
    const ans = skillRes.json();
    return res.status(200).json(ans);
  }
);

const keyword = wrapper(
  'keyword',
  async(req: Express.Request, res: Express.Response) => {
    const keyword = String(req.body.action.clientExtra.keyword) as string;
    const skillRes = new openbuilder.SkillResponse();

    if(keyword !== '') {
      const search = await service.keywordItem(keyword);
      const output = carousel(search);
    
      skillRes.template.addOutput(output);
    }
    const words = await service.keywordList();
    words.forEach(it => {
      const reply = openbuilder.QuickReply(it.keyword, 'block', it.keyword, keywordblock, {keyword: it.keyword});
      skillRes.template.addQuickReply(reply);
    });

    return res.status(200).json(skillRes.json());
  }
);

const rate = wrapper(
  'random', 
  async(_req:Express.Request, res:Express.Response) => {
    const search = await service.readItem({region: '', foodtype: '', isRandom: false});
    const output = carousel(search);
    
    const skillRes = new openbuilder.SkillResponse();
    skillRes.template.addOutput(output);
    
    const ans = skillRes.json();
    return res.status(200).json(ans);
  }
);

const foodtype = wrapper(
  'random', 
  async(req:Express.Request, res:Express.Response) => {
    const foodtype = req.body.action.params['foodtype'];
    const search = await service.readItem({region: '', foodtype: foodtype, isRandom: false});
    const output = carousel(search);
    
    const skillRes = new openbuilder.SkillResponse();
    skillRes.template.addOutput(output);
    
    const ans = skillRes.json();
    return res.status(200).json(ans);
  }
);

const region = wrapper(
  'random', 
  async(req:Express.Request, res:Express.Response) => {
    const region = req.body.action.params['region'];
    const search = await service.readItem({region: region, foodtype: '', isRandom: false});
    const output = carousel(search);
    
    const skillRes = new openbuilder.SkillResponse();
    skillRes.template.addOutput(output);
    
    const ans = skillRes.json();
    return res.status(200).json(ans);
  }
);

export default {
  newVenue,
  newKeyword,
  menu,
  detail,
  keyword,
  random,
  rate,
  foodtype,
  region
}