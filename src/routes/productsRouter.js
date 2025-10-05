const {Router} = require("express")
const ProductsManager = require("../dao/ProductsManager.js");

const productsRouter=Router()


productsRouter.get("/", async (req, res) => {

  try{

    let products = await ProductsManager.getProducts();

    if (!products || products.length === 0) {
      return res.status(404).send("No existen productos");
    }

    let productos = JSON.stringify(products, null, 1)

    res.status(200).send(
      productos
    );

  }

  catch(error){

    console.log(error)

    res.status(500).send("Internal Server Error");

  }

});



productsRouter.get("/:pid", async (req, res) => {

  try{

      let pid = req.params.pid;
      let product = await ProductsManager.getProductById(pid);

    if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

      let respuesta = JSON.stringify(product, null, 1);
      res.status(200).send(respuesta);

  }

  catch(error){

    console.log(error)

    res.status(500).send("Internal Server Error");

  }

});



productsRouter.post("/:pid", async (req, res) => {

  try{


    let {pid, title, description, code, price, status, stock, category, thumbnails} = req.body;


    if (!title || !description || !code || price == null || status == null || stock == null || !category) {
      return res.status(400).send("Falta información");
    }

    let product = await ProductsManager.getProductById(pid);
    if (product) return res.status(400).send("Ya existe un producto con ese id");
    
    
    let newProduct = await ProductsManager.addProductById(pid, title, description, code, Number(price), Boolean(status), Number(stock), category, thumbnails);


    if (!newProduct) {
      return res.status(400).send("No se pudo crear el producto");
    }

    let listaProductos = await ProductsManager.getProducts();
    req.socket.emit("listaProductos", listaProductos);
    
    res.status(200).json(newProduct);

    }

  catch(error){

    console.log(error)

    res.status(500).send("Internal Server Error");

  }

});



productsRouter.post("/", async (req, res) => {

  try{

    let {title, description, code, price, status, stock, category, thumbnails} = req.body;

    let newProduct = await ProductsManager.addProduct(
      title, description, code, Number(price), Boolean(status), Number(stock), category, thumbnails);

    if (!title || !description || !code || price == null || status == null || stock == null || !category) {
      return res.status(400).send("Falta información");
    }
    
    if (!newProduct) {
      return res.status(400).send("Ya existe un producto con ese código");
    }

    let listaProductos = await ProductsManager.getProducts();
    req.socket.emit("listaProductos", listaProductos);
    
    res.status(200).json(newProduct);

    }

  catch(error){

    console.log(error)

    res.status(500).send("Internal Server Error");

  }

});



productsRouter.put("/:pid", async (req, res) => {

  try{

    if (!req.body) {
      return res.status(400).send("No se enviaron actualizaciones");
    }

    let product = await ProductsManager.updateProduct(req.params.pid, req.body);

  if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.json(product);

  }

  catch(error){

    console.log(error)

    res.status(500).send("Internal Server Error");

  }

});



productsRouter.delete("/:pid", async (req, res) => {

  try{

      let product = await ProductsManager.deleteProduct(req.params.pid);

    if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

    let listaProductos = await ProductsManager.getProducts();
    req.socket.emit("listaProductos", listaProductos);

    res.json(product);

  }

  catch(error){

    console.log(error)

    res.status(500).send("Internal Server Error");

  }


});


module.exports={productsRouter}
