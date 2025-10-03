const express = require("express");
const { cartsRouter } = require('./routes/cartsRouter.js');
const { productsRouter} = require("./routes/productsRouter.js")


const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true} ) ) ;

app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT} Server running on port ${PORT}`)
})
