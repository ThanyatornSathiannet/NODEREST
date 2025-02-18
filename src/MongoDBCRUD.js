const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
    "mongodb://admon:SBFsqa14913@node40731-noderest.proen.app.ruk-com.cloud:11344",
    {
        usewNewUrlParser: true,
        useUnifiedTopology: true, 
    }
);

const Book = mongoose.model("Book", {
    id: {
        type: Number,
        unique: true,
        require: true,
    },
    title: String,
    author: String,
});

const app = express();
app.use(bodyParser.json());

app.post("/books", async (req,res) => {
    try {
        const lastBook = await Book.fineOne().sort({id: -1});
        const nextId = lastBook ? lastBook.id + 1 : 1;

        const book = new Book ({
            id: nextId,
            ...req.body,
        });
        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books", async (req,res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books/:id", async (req , res) => {
    try {
        const book = await Book.fineOne({id:req.params.id});
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put("/books/:id", async (req,res) => {
    try {
        const book = await Book.fineOneAndUpdate({id:req.params.id}, req.body, {
            new: true,
        });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.fineOneAndDelete({id:req.params.id});
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    
})