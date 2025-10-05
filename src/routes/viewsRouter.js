const {Router} = require("express")
const ProductsManager = require("../dao/ProductsManager.js");
const CartsManager = require("../dao/CartsManager.js");

const viewsRouter=Router()



viewsRouter.get("/realtimeproducts", async (req, res) => {

  try{

        let listaProductos = await ProductsManager.getProducts();

        if (!listaProductos || listaProductos.length === 0) {
        return res.status(404).send("No existen productos");
        }

        req.socket.emit("listaProductos", listaProductos)

        res.status(200).render("realTimeProducts", {
            contenido: listaProductos, nombrePag: "Productos en Tiempo Real",

        })
    }

    catch(error){

        console.log(error)

        res.status(500).send("Internal Server Error");

    }

  }
)


viewsRouter.get("/carritos/:cid", async (req, res) => {

  try {
    let cart = await CartsManager.getCartById(req.params.cid)

    res.status(200).render("home", {
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

        res.status(200).render("home", {
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
      
      res.status(200).render("home", {
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

        res.status(200).render("home", {
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

      let respuesta = JSON.stringify(product, null, 1);
      
      res.status(200).render("home", {
            contenido: respuesta, nombrePag: `Producto Número: ${product.id}`,

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

        let productos = JSON.stringify(products, null, 1)

        res.status(200).render("home", {
            contenido: productos, nombrePag: "Productos",

        })
    }

    catch(error){

        console.log(error)

        res.status(500).send("Internal Server Error");

    }

  }
)



module.exports={viewsRouter}