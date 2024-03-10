import { promisify } from 'util';
import express from 'express';
import { createClient } from 'redis'


const client = await createClient();
client.on('connect', () => {
 console.log('Redis client connected to the server'); 
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server ${err}`);
});

const listProducts = [
  {id: 1, name: 'Suitcase 250', price: 50, stock: 4},
  {id: 2, name: 'Suitcase 450', price: 100, stock: 10},
  {id: 3, name: 'Suitcase 650', price: 350, stock: 2},
  {id: 4, name: 'Suitcase 1050', price: 550, stock: 5}
]

const getItemById = (id) => {
  for (const product of listProducts) {
    if (product.id === id) return product
  }
}

const reserveStockById = (itemId, stock) => {
  const asyncSet = promisify(client.set).bind(client)
  asyncSet(`item.${itemId}`, stock);
}

const getCurrentReservedStockById = async (itemId) => {
  const asyncGet = promisify(client.get).bind(client)
  asyncGet(`item.${itemId}`)
}


const app = express();

app.get('/list_products', (req, res) => {
  const products = []
  for (const product of listProducts) {
    const new_product = {
      'itemId': product.id, 'itemName': product.name, 'price': product.price,
      'initialAvailableQuantity': product.stock
    }
    products.push(new_product)
  }
  res.json(products)
})

app.get('/list_products/:itemId(\\d+)', (req, res) => {
  const id = Number.parseInt(req.params.itemId)
  const product = getItemById(id);
  if (!product) {
    res.json({'status': 'Product not found'})
    return;
  }

  getCurrentReservedStockById(id)
    .then((stock) => Number.parseInt(stock || 0))
    .then((restock) => {
      const products = {
        'itemId': product.id, 'itemName': product.name,
	'price': product.price, 'initialAvailableQuantity': product.stock,
	'currentQuality': product.stock - restock
      }
      res.json(products)
    })
});

app.get('/reserve_product/:itemId(\\d+)', (req, res) => {
  const id = Number.parseInt(req.params.itemId);
  const product = getItemById(id);
  if (!product) {
    res.json({'status': 'Product not found'});
    return;
  }

  getCurrentReservedStockById(id)
    .then((stock) => Number.parseInt(stock || 0))
    .then((restock) => {
      if (product.stock - restock < 1) {
        res.json({'status': 'Not enough stock available', 'itemId': 1})
	return
      }

      reserveStockById(id, restock + 1)
      res.json({'status': 'Reservation confirmed', 'itemId': id})
    })
})


app.listen(1245);
