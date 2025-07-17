// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.theverge.com/';

async function scrapeArticles() {
    try {
        const { data } = await axios.get(BASE_URL);
        const $ = cheerio.load(data);
        const articles = [];

        $('._184mftoo').each((_, element) => {
            const title = $(element).find('._1xwtict9 _1pm20r5c _1pm20r52').text().trim();
            const url = $(element).find('._1lkmsmo0 _1lkmsmo4 _1lkmsmo5').attr('href');
            const dateStr = $(element)
                .find('.duet--article--timestamp tvl9dp2 tvl9dp0 _1xwtict5 _1ymtmqps')
                .attr('datetime');

            if (dateStr) {
                const pubDate = new Date(dateStr);
                const cutoff = new Date('2022-01-01');

                if (pubDate >= cutoff) {
                    articles.push({
                        title,
                        url,
                        date: pubDate
                    });
                }
            }
        });

        // Sort by date descending
        articles.sort((a, b) => b.date - a.date);
        return articles;

    } catch (err) {
        console.error('Scraping error:', err);
        return [];
    }
}

module.exports = scrapeArticles;
