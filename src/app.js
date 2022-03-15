const options = require("./options/mysqlconfig");
const knex = require("knex");
const express = require("express");
const {Server}=require("socket.io")

let PORT = process.env.PORT || 8080;

const app = express();
const server = app.listen(PORT, () => {
  console.log("listening");
});

const io=new Server(server)


app.use(express.static("./public"))

let productRouter=require("./routes/products")
app.use("/api/productos",productRouter)

const database = knex(options);

const processDataBase=async()=>{    
    let tableExist = await database.schema.hasTable("products")
    if(tableExist){
        await database.schema.dropTable("products")
    }
    await database.schema.createTable("products",(table)=>{
      table.increments("id");
      table.string("name", 25).nullable(false);
      table.float("price").nullable(false);
      table.string("photo").nullable(false)
      table.integer("code").nullable(false)
      table.integer("stock").nullable(false);
      table.string("description", 300).nullable(false);
      table.integer("timestamp").nullable(false);
    })
}

const processDataBase1=async()=>{    
  let tableExist = await database.schema.hasTable("chat")
  if(tableExist){
      await database.schema.dropTable("chat")
  }
  await database.schema.createTable("chat",(table)=>{
    table.increments("id");
    table.string("chatMessage", 300).nullable(false);
    
  })
}

let body=document.getElementsByTagName()

io.on("connection",async socket=>{
  console.log("socket conectado")

 socket.on("message",async(data)=>{
    await database("chat").insert(data)
    let results=await database.from("chat").select("*")
    let messages=JSON.parse(JSON.stringify(results))
    body.innerHtml(messages)
    
 })
}
)

module.exports.processDataBase=processDataBase()
module.exports.processDataBase1=processDataBase1()

