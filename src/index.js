import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'


const app = express();
const { PORT = 3000 } = process.env;

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  res.json("Hello world")
});


  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });


export default app;