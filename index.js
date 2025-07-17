// index.js
const express = require('express');
const scrapeArticles = require('./scraper');
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const articles = await scrapeArticles();
    res.render('index', { articles });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
