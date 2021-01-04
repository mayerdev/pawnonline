const express = require('express');
const pug = require('pug');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();

app.set('view engine', 'pug');

app.use(express.json({ limit: '128mb' }));
app.use(express.static('assets'));
app.use(express.static('node_modules'));
app.use(express.static('output'));

app.get('/', (req, res) => {
    res.render('editor');
});

app.post('/build', async (req, res) => {
    if(!req.body || !req.body.code) return res.json({
       text: 'Code not found',
       error: true
    });
    
    const fileName = String(Math.random()).replace('.', '');
    
    
    await fs.writeFileSync(fileName + '.pwn', req.body.code);
    exec(`pawncc ${fileName}.pwn -i${__dirname}/include/ -o${__dirname}/output/${fileName} -";" -"("`, (err, cout, cerr) => {
        //fs.unlinkSync(fileName + '.pwn');
        
        console.log(cout)

        if(!err) return res.send({ text: fileName, error: false });
        
        res.send({ text: cout, error: true });
    });
});

app.listen(8081, console.log('Started on ::8080'));