const {Router} = require("express")
const CartsManager = require("../dao/CartsManager.js");

const cartsRouter=Router()


cartsRouter.post("/", async (req, res) => {

  try {

    let cart = await CartsManager.createCart()
    res.status(200).json(cart)
  } 
  
  catch (error) {

    console.log(error)
    
    res.status(500).send("Internal Server Error")

  }

})



cartsRouter.get("/:cid", async (req, res) => {

  try {
    let cart = await CartsManager.getCartById(req.params.cid)
    res.json(cart.products)
  } 

  catch (error) {

    console.log(error)

    res.status(500).send("Internal Server Error")

  }

})



cartsRouter.post("/:cid/product/:pid", async (req, res) => {

  try {
    let cantidad = req.body?.quantity ?? 1
    let result = await CartsManager.addProductToCart(req.params.cid, req.params.pid, cantidad)
    res.json(result)
  } 

  catch (error) {

    console.log(error)

    res.status(500).send("Internal Server Error")

  }
  
})


module.exports={cartsRouter}

