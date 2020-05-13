import Express from 'express';
import {wrapper} from './utils';
import openbuilder from 'openbuilder-node';
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
      link: req.body.link as string
    };
    console.log(params);
    const ans = await service.createItem(params);
    return res.status(200).json(ans);  
  }
);

const random = wrapper(
  'random', 
  async(_req:Express.Request, res:Express.Response) => {
    const ans = await service.readItem({region: '', foodtype: '', isRandom: true});
    const cells = ans.map(item => {
      const buttons = [{
        "action": "webLink",
        "label": "자세히 보기",
        "webLinkUrl": item.link
      }];
      return openbuilder.basicCard(item.name, item.desc, item.imgUrl, buttons).basicCard;
    });
    const carousel = openbuilder.basicCardCarousel(cells);
    return res.status(200).json(carousel);
  }
);

const rate = wrapper(
  'random', 
  async(_req:Express.Request, res:Express.Response) => {
    const ans = await service.readItem({region: '', foodtype: '', isRandom: false});
    const cells = ans.map(item => {
      const buttons = [{
        "action": "webLink",
        "label": "자세히 보기",
        "webLinkUrl": item.link
      }];
      return openbuilder.basicCard(item.name, item.desc, item.imgUrl, buttons).basicCard;
    });
    const carousel = openbuilder.basicCardCarousel(cells);
    return res.status(200).json(carousel);
  }
);

const foodtype = wrapper(
  'random', 
  async(req:Express.Request, res:Express.Response) => {
    const foodtype = req.body.action.params['foodtype'];
    const ans = await service.readItem({region: '', foodtype: foodtype, isRandom: false});
    console.log(foodtype, ans);
    const cells = ans.map(item => {
      const buttons = [{
        "action": "webLink",
        "label": "자세히 보기",
        "webLinkUrl": item.link
      }];
      return openbuilder.basicCard(item.name, item.desc, item.imgUrl, buttons).basicCard;
    });
    const carousel = openbuilder.basicCardCarousel(cells);
    return res.status(200).json(carousel);
  }
);

const region = wrapper(
  'random', 
  async(req:Express.Request, res:Express.Response) => {
    const region = req.body.action.params['region'];
    const ans = await service.readItem({region: region, foodtype: '', isRandom: false});
    console.log(region, ans);
    const cells = ans.map(item => {
      const buttons = [{
        "action": "webLink",
        "label": "자세히 보기",
        "webLinkUrl": item.link
      }];
      return openbuilder.basicCard(item.name, item.desc, item.imgUrl, buttons).basicCard;
    });
    const carousel = openbuilder.basicCardCarousel(cells);
    return res.status(200).json(carousel);
  }
);

export default {
  newVenue,
  random,
  rate,
  foodtype,
  region
}