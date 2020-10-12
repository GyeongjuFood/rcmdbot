import Express from 'express';
import {wrapper} from './utils';
import * as openbuilder from 'openbuilder-node';
import service from './service';

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

const random = wrapper(
  'random', 
  async(_req:Express.Request, res:Express.Response) => {
    const search = await service.readItem({region: '', foodtype: '', isRandom: true});
    const skillRes = new openbuilder.SkillResponse();
    const output = new openbuilder.Output.Carousel('basicCard');

    search.forEach(item => {
      const card = new openbuilder.Card.BasicCard(item.name, item.desc, item.imgUrl);
      const linkbtn = openbuilder.Cmpnts.Button('webLink', {label: "자세히 보기", link: item.link});
      const mapbtn = openbuilder.Cmpnts.Button('webLink', {label: "위치 보기", link: item.map});
      const phonebtn = openbuilder.Cmpnts.Button('phone', {label: "매장 주문 연결 번호", phoneNumber: "01026101286"});
      card.addBtn(linkbtn);
      card.addBtn(mapbtn);
      card.addBtn(phonebtn);
      output.addItem(card);
    });

    skillRes.template.addOutput(output);
    const ans = skillRes.json();
    return res.status(200).json(ans);
  }
);

const rate = wrapper(
  'random', 
  async(_req:Express.Request, res:Express.Response) => {
    const search = await service.readItem({region: '', foodtype: '', isRandom: false});
    const skillRes = new openbuilder.SkillResponse();
    const output = new openbuilder.Output.Carousel('basicCard');

    search.forEach(item => {
      const card = new openbuilder.Card.BasicCard(item.name, item.desc, item.imgUrl);
      const linkbtn = openbuilder.Cmpnts.Button('webLink', {label: "자세히 보기", link: item.link});
      const mapbtn = openbuilder.Cmpnts.Button('webLink', {label: "위치 보기", link: item.map});
      const phonebtn = openbuilder.Cmpnts.Button('phone', {label: "매장 주문 연결 번호", phoneNumber: "01026101286"});
      card.addBtn(linkbtn);
      card.addBtn(mapbtn);
      card.addBtn(phonebtn);
      output.addItem(card);
    });
    
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
    const skillRes = new openbuilder.SkillResponse();
    const output = new openbuilder.Output.Carousel('basicCard');

    search.forEach(item => {
      const card = new openbuilder.Card.BasicCard(item.name, item.desc, item.imgUrl);
      const linkbtn = openbuilder.Cmpnts.Button('webLink', {label: "자세히 보기", link: item.link});
      const mapbtn = openbuilder.Cmpnts.Button('webLink', {label: "위치 보기", link: item.map});
      const phonebtn = openbuilder.Cmpnts.Button('phone', {label: "매장 주문 연결 번호", phoneNumber: "01026101286"});
      card.addBtn(linkbtn);
      card.addBtn(mapbtn);
      card.addBtn(phonebtn);
      output.addItem(card);
    });
    
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
    const skillRes = new openbuilder.SkillResponse();
    const output = new openbuilder.Output.Carousel('basicCard');

    search.forEach(item => {
      const card = new openbuilder.Card.BasicCard(item.name, item.desc, item.imgUrl);
      const linkbtn = openbuilder.Cmpnts.Button('webLink', {label: "자세히 보기", link: item.link});
      const mapbtn = openbuilder.Cmpnts.Button('webLink', {label: "위치 보기", link: item.map});
      const phonebtn = openbuilder.Cmpnts.Button('phone', {label: "매장 주문 연결 번호", phoneNumber: "01026101286"});
      card.addBtn(linkbtn);
      card.addBtn(mapbtn);
      card.addBtn(phonebtn);
      output.addItem(card);
    });
    
    skillRes.template.addOutput(output);
    const ans = skillRes.json();
    return res.status(200).json(ans);
  }
);

export default {
  newVenue,
  random,
  rate,
  foodtype,
  region
}