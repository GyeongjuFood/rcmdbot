import * as openbuilder from 'openbuilder-node';
import {venueParams} from './model/venue';

const detailblock = "5f84fcf474bb75402bdb09ed";

export const carousel = (src: venueParams[]) => {
  const output = new openbuilder.Output.Carousel('basicCard');

  src.forEach(item => {
    const card = new openbuilder.Card.BasicCard(item.name, item.desc, item.imgUrl);
    const linkbtn = openbuilder.Cmpnts.Button('block', {label: "자세히 보기", blockId: detailblock, extra: {name: item.name}});
    const mapbtn = openbuilder.Cmpnts.Button('webLink', {label: "위치 보기", link: item.map});
    const phonebtn = openbuilder.Cmpnts.Button('phone', {label: "매장 주문 연결 번호", phoneNumber: "01026101286"});
    card.addBtn(linkbtn);
    card.addBtn(mapbtn);
    card.addBtn(phonebtn);
    output.addItem(card);
  });

  return output;
}
