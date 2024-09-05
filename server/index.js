const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.VITE_SECRET_KEY)
const port = process.env.PORT || 8000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174',
    'https://yusuf-agro.web.app', 
    'https://yusuf-agro.firebaseapp.com'],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: 'unauthorized access' });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ziugtg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const categoryCollection = client.db('yusufagrodb').collection('category');
    const allCollection = client.db('yusufagrodb').collection('animal')
    const buyCollection = client.db('yusufagrodb').collection('buy-now')
    const bookingCollection = client.db('yusufagrodb').collection('bookingItem')
   
    
    

    // Auth related API
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '365d',
      });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true });
        console.log('Logout successful');
      } catch (err) {
        res.status(500).send(err);
      }
    });



    // Get all animals from db
    app.get('/category', async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });



    //Get All Category
    app.get('/allanimal/:category',async(req,res)=>{
      const animalCategory = req.params.category;
      try{
        const categoryAnimal = await allCollection.find({category: animalCategory}).toArray();
        res.json(categoryAnimal);
      }
      catch(error){
        console.log('Error Fetching' , error)
      }
    })


    //Get All Category
    app.get('/all',async(req,res)=>{
      try{
        const categoryAnimal = await allCollection.find().toArray();
        res.json(categoryAnimal);
      }
      catch(error){
        console.log('Error Fetching' , error)
      }
    })


     // Get buy Details by ID
    app.get('/buy-details/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await allCollection.findOne(query)
      res.send(result)
    })


    app.post('/buyNow', verifyToken, async (req, res) => {
      const buyData = req.body;
      try {
        // Save products booking info
        const result = await buyCollection.insertOne(buyData);
    
        // Change animal status
        const animalId = buyData?.animalId;
        const query = { _id: new ObjectId(animalId) };
        const updateDoc = {
          $set: { status: 'sold out' },
        };
        const updateProducts = await allCollection.updateOne(query, updateDoc);
        console.log(updateProducts);
    
        res.send({ result, updateProducts });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing the request.' });
      }
    });

    // My buying
app.get('/myPurchase/:email', async (req, res) => {
  console.log(req.params.email);   
  try {
      const result = await buyCollection.find({ userEmail: req.params.email }).toArray();           
      res.send(result);
  } catch (error) {
      console.error('Error fetching purchases:', error);
      res.status(500).send('Internal Server Error');
  }
});

  //-----user payment -------
      // create-payment-intent
      app.post('/create-payment-intent', verifyToken, async (req, res) => {
        const price = req.body.price
        const priceInCent = parseFloat(price) * 100
        if (!price || priceInCent < 1) return
        // generate clientSecret
        const { client_secret } = await stripe.paymentIntents.create({
          amount: priceInCent,
          currency: 'usd',
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          automatic_payment_methods: {
            enabled: true,
          },
        })
        // send client secret as response
        res.send({ clientSecret: client_secret })
      })

      //Booking To Database--------
    app.post('/bookingNow', async (req, res) => {
      const cartItem = req.body;
      const result = await bookingCollection.insertOne(cartItem);
      res.send(result);
    });
    app.get('/bookingItem/:email', async (req, res) => {  
      try {
          const result = await bookingCollection.find({ email: req.params.email }).toArray(); // Changed userEmail to email           
          res.send(result);
      } catch (error) {
          console.error('Error fetching bookings:', error);
          res.status(500).send('Internal Server Error');
      }
    });
  //delete booking
  app.delete('/bookingItemDelete/:id',verifyToken ,async (req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result =await bookingCollection.deleteOne(query);
    res.send(result)
  })    

  //------Discount products get on ui
  app.get('/discountItems', async (req, res) => {
    try {
        // Filter for products with a discount greater than 0
        const discountProducts = await allCollection.find({ discount: { $gt: 0 } }).toArray();
        res.json(discountProducts);
    } catch (error) {
        console.log('Error Fetching', error);
        res.status(500).send('Error fetching discount products');
    }
});
  //-------discount products-----
   app.get('/discountProducts/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await allCollection.findOne(query)
    res.send(result)
  })


    // Send a ping to confirm a successful connection
    //await client.db('admin').command({ ping: 1 });
   // console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from Yusuf Agro..');
});

app.listen(port, () => {
  console.log(`Yusuf Agro is running on port ${port}`);
});
