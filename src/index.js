import express from 'express';
import api from './api';
import cors from 'cors';
import bodyParser from 'body-parser'
import {Product, Customer} from './models/'


const app = express();
const { PORT = 3000 } = process.env;

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', api);

app.get('/', async (req, res) => {
   try {
       const response = await Product.findOne({
           where:{
               name:"Alsace"
           },
           include:['productAttributes']
       })
       res.json({
           data:response.productAttributes
       })
   } catch (error) {
       console.log(error)
   }

});


  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });


export default app;