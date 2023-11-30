const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const schemaData = mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    publicationYear: Number,
    ISBN: String,
}, {
    timestamps: true
})

const userModel = mongoose.model("test", schemaData)
const PORT = process.env.PORT || 8000

app.get("/api", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data, data })
})

app.post("/api/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body);
    await data.save()
    res.send({ success: true, message: "data saved successfully", data: data })
})
app.put("/api/update", async (req, res) => {
    console.log(req.body)
    const { id, ...rest } = req.body
    console.log(rest)
    const data = await userModel.updateOne({ _id: id }, rest)
    res.send({ success: true, message: "data updated sccessfully", data: data })
})

app.delete("/api/delete/:id",async(req,res)=>{
    const id = req.params.name;
    const data = await userModel.deleteOne({id: id});
    res.send({success: true,message:"data deleted successfully",data:data})
} )

mongoose.connect("mongodb+srv://hemumani73:sIcAvRZCliyMj7Yi@cluster0.4wd1kim.mongodb.net/book")
    .then(() => {
        console.log("Connected to DB")
        app.listen(PORT, () => console.log("Server is running"))
    })
    .catch((err) => console.log(err))