const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const fileUpload = require('express-fileupload');
const iconv = require('iconv-lite');
const config = require('./config.json');
const app = express();

app.set('view engine', 'pug');

app.use(express.json({ limit: config.maxFileSize }));
app.use(express.static('assets'));
app.use(express.static('node_modules'));
app.use(express.static('output'));
app.use(fileUpload());

app.all('/', (req, res) => {
    res.render('editor');
});

app.post('/build/file', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) return res.json({ text: 'File not found', error: true });

    const fileName = String(Math.random()).replace('.', '');

    req.files.file.mv(`${__dirname}/output/${fileName}.pwn`, async ()  => {
        res.json({ text: iconv.decode(await fs.readFileSync(`${__dirname}/output/${fileName}.pwn`), 'cp1251').toString(), error: false });
    });
});

app.post('/build', async (req, res) => {
    if(!req.body || !req.body.code) return res.json({
       text: 'Code not found',
       error: true
    });
    
    const fileName = String(Math.random()).replace('.', '');
    
    await fs.writeFileSync(fileName + '.pwn',  iconv.encode(req.body.code, 'cp1251'));

    exec(`pawncc ${fileName}.pwn -i${__dirname}/include/ -o${__dirname}/output/${fileName} -";" -"("`, (err, cout) => {
        fs.unlinkSync(`${fileName}.pwn`);

        if(!err) return res.json({ text: fileName, error: false });
        
        res.json({ text: cout, error: true });
    });
});

app.listen(config.port, config.host, console.log(`Started on ${config.host}:${config.port}`));