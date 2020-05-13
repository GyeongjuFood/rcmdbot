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
Router.post('/newVenue', controller.newVenue);

export default Router;
