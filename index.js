// Dependencies and variables.
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs/promises');
const path = require('path');
const parse = require('papaparse');

// This serves all of the files in the webapp directory as static, this includes files in the root of the webapp directory as well as files in subfolders.
app.use('/', express.static('webapp'));

// Simply creating an array variable to put the books in.
let books = [];

// This is an asnyc callback function to get the csv data, there are other ways that this can be done and they all work the same but I like this way best. 
async function getCSV() {
    
    // path.join is used over a simple string concatination since it's more likely this will be able to work in more places since this is specifically for paths.
    const csv = await fs.readFile(path.join(__dirname, "/data/booksdata.csv"), "utf-8");

    // Variable for papaparse so the data can be parsed.
    const cSVData = parse.parse(csv, {header: true});

     // Loops through to get the data and put it in the array.
     cSVData.data.forEach(book => {
        // This is just in case of partial data, shouldn't happen but better safe than sorry.
        if(book.Title && book.Available) {
            
            // Put the books into the array, different variable names are used since JS doesn't like the ones in the CSV file.
            books.push({
                id: book.BookID,
                title: book.Title,
                author: book.Author,
                genre: book.Genre,
                price: book.Price,
                image: book.ImageFileName,
                available: book.Available
            });
        }
     });
}

// Actually calling the function and, thus, running the code.
getCSV();

// Since I used await, there now has to be an app.get request.
app.get('/bookdata', (_, res) => {

    const response = JSON.stringify(books);

    // This is so the browser expects to get JSON data.
    res.header({"Content-Type": "application/json"});

    // Send the response, if books doesn't properly exist, an error is displayed instead.
    if (books) {
        res.send(response);
    }
    else {
        res.status(500);
        res.send("The books couldn't be loaded");
    }
});



app.listen(port, () => {
    console.log(`Listening on ${port}`);
});