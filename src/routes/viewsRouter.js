const {Router} = require("express")
const ProductsManager = require("../dao/ProductsManager.js");
const CartsManager = require("../dao/CartsManager.js");

const viewsRouter=Router()




viewsRouter.get("/carritos/:cid", async (req, res) => {

  try {
    let cart = await CartsManager.getCartById(req.params.cid)

    res.status(200).render("views", {
            contenido: JSON.stringify(cart.products,null,1), nombrePag: `Carrito Número: ${cart.id}`,

        })

  } 

  catch (error) {

    console.log(error)

    res.status(500).send("Internal Server Error")

  }

})



viewsRouter.get("/carritos", async (req, res) => {

  try{

        let carts = await CartsManager.getCarts();

        if (!carts || carts.length === 0) {
        return res.status(404).send("No existen carritos");
        }

        let carritos = JSON.stringify(carts , null, 1)

        res.status(200).render("views", {
            contenido: carritos, nombrePag: "Carritos",

        })
    }

    catch(error){

        console.log(error)

        res.status(500).send("Internal Server Error");

    }

  }
);



viewsRouter.get("/productos/:pid", async (req, res) => {

  try{

      let pid = req.params.pid;
      let product = await ProductsManager.getProductById(pid);

    if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

      let respuesta = JSON.stringify(product, null, 1);
      
      res.status(200).render("views", {
            contenido: respuesta, nombrePag: `Producto Número: ${product.id}`,

        })

  }

  catch(error){

    console.log(error)

    res.status(500).send("Internal Server Error");

  }

});




viewsRouter.get("/productos", async (req, res) => {

  try{

        let products = await ProductsManager.getProducts();

        if (!products || products.length === 0) {
        return res.status(404).send("No existen productos");
        }

        let productos = JSON.stringify(products, null, 1)

        res.status(200).render("views", {
            contenido: productos, nombrePag: "Productos",

        })
    }

    catch(error){

        console.log(error)

        res.status(500).send("Internal Server Error");

    }

  }
)




viewsRouter.get("/products/:pid", async (req, res) => {

  try{

      let pid = req.params.pid;
      let product = await ProductsManager.getProductById(pid);

    if (!product) {
        return res.status(404).send("Producto no encontrado");
      }
      
      res.status(200).render("home", {
            contenido: [product], nombrePag: `Producto Número: ${product.id}`,

        })

  }

  catch(error){

    console.log(error)

    res.status(500).send("Internal Server Error");

  }

});




viewsRouter.get("/products", async (req, res) => {

  try{

        let products = await ProductsManager.getProducts();

        if (!products || products.length === 0) {
        return res.status(404).send("No existen productos");
        }

        res.status(200).render("home", {
            contenido: products, nombrePag: "Productos",

        })
    }

    catch(error){

        console.log(error)

        res.status(500).send("Internal Server Error");

    }

  }
);



viewsRouter.get("/realtimeproducts", async (req, res) => {

  try{

        let products = await ProductsManager.getProducts();

        if (!products || products.length === 0) {
        return res.status(404).send("No existen productos");
        }

        res.status(200).render("realTimeProducts", {
            contenido: products, nombrePag: "Productos en Tiempo Real",

        })
    }

    catch(error){

        console.log(error)

        res.status(500).send("Internal Server Error");

    }

  }
)


module.exports={viewsRouter}