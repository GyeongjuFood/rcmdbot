import Express from 'express';
import controller from './controller';

const Router = Express.Router();

Router.get("/", (_req, res) => {
  return res.status(200).send("sd");
})
Router.post('/random', controller.random);
Router.post('/toprate', controller.rate);
Router.post('/foodtype', controller.foodtype);
Router.post('/region', controller.region);
Router.post('/keyword', controller.keyword);

Router.post('/newVenue', controller.newVenue);
Router.post('/newKeyword', controller.newKeyword);
Router.post('/newMenu', controller.newMenu);

Router.post('/menu', controller.menu);
Router.post('/detail', controller.detail);

export default Router;
