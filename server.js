const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors'); 

const app = express();
const port = 3001;

app.use(cors());

app.get('/getCemadenInfo', async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://resources.cemaden.gov.br/graficos/interativo/getJson2.php?uf=RJ');
    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    await browser.close();

    res.json({ data: bodyContent });
});

app.get('/getIneaInfo', async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://alertadecheias.inea.rj.gov.br/dados/piabanha.php');
    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    await browser.close();

    res.json({ data: bodyContent });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
