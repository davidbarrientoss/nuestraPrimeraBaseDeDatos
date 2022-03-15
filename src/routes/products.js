const express = require("express");

const router = express.Router();

const importDB=require("../app");
importDB.processDataBase();
importDB.processDataBase1();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const admin = true;
const middlewareAuth = (req, res, next) => {
  if (!admin) {
    res.status(401).send({ message: "Unathorized" });
  } else {
    next();
  }
};

router.get("/",async(req,res)=>{
    try{
        let results=await database.from("products").select("*")
        let products=JSON.parse(JSON.stringify(results))
        res.status(200).send(products).render("index.html")
    }catch(err){res.status(400).send({error:err})}

})

router.get("/:id",async(req,res)=>{
    try{
        let id=req.params.id
        let result=await database.from("products").where("id",id)
        let product=JSON.parse(JSON.stringify(result))
        res.status(200).send(product)
    }catch(err){res.status(400).send({error:err})}

})

router.post("/",middlewareAuth, async(req,res) => {
    try{
        let product=req.body
        product.timestamp=Date.now()
        await database("products").insert(product)
        let results=await database.from("products").select("*")
        let products=JSON.parse(JSON.stringify(results))
        console.log(products)
        res.status(200).send({message:"product added succesfully"})
    }catch(err){res.status(400).send({error:err})}
});

router.put("/:id", middlewareAuth, async (req, res) => {
    try{
        let id=req.params.id
        let result=await database.from("products").where("id",id)
        let product=JSON.parse(JSON.stringify(result))
        product.update(stock=200)
        res.status(200)
    }catch(err){res.status(400).send({error:err})}
    
});

router.delete(":/id", middlewareAuth, async (req, res) =>{
    try{
        let id=req.params.id
        let result=await database.from("products").where("id",id).del()
        res.status(200).send({message:"product deleted succesfully"})
    }catch(err){res.status(400).send({error:err})}
})

module.exports=router