import express from 'express'

const app = express();
app.use(express.json())
app.get("/",async(req,res)=>{
    res.status(200).send("MVP");
})
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(400).send({ error: err.message });
  });

export default app;