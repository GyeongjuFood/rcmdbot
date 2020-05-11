import openbuilder from 'openbuilder-node';
import Express from 'express';

const app = Express();

app.listen(3000, () => {
  console.log("test generator");
  const it = openbuilder.responseWrapper([]);
  console.log(it);
  console.log("server on");
});

export default app;
