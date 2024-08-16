const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
  ],
  credentials: true
}));
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDb() {
  try {
    // await client.connect();
    db = client.db('filterFlowDB');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    // process.exit(1);
  }
}

connectDb();

app.get('/products', async (req, res) => {
  const { page = 1, limit = 10, search = '', sortBy = 'creationDate', order = 'desc', category, brand, minPrice, maxPrice } = req.query;

  let query = {
    name: { $regex: search, $options: 'i' },
    ...(category && { category }),
    ...(brand && { brand }),
    ...(minPrice && maxPrice && { price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) } }),
  };

  let sort = { [sortBy]: order === 'desc' ? -1 : 1 };

  try {
    const products = await db.collection('products')
      .find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .toArray();

    const total = await db.collection('products').countDocuments(query);

    res.json({ products, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Failed to fetch products', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));