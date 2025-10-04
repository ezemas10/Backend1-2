const express = require("express");
const { cartsRouter } = require('./routes/cartsRouter.js');
const { productsRouter } = require("./routes/productsRouter.js")
const { viewsRouter } =require("./routes/viewsRouter.js")
const { engine } = require("express-handlebars")


const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true} ) ) ;

app.engine("hbs", engine({extname: "hbs"}));
app.set("view engine", "hbs")
app.set("views", "./src/views")

app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)
app.use("/", viewsRouter)



app.get("/", (req, res)=>{
  
    res.status(200).render("index", {
        ok: "ok"

    })
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT} Server running on port ${PORT}`)
})
