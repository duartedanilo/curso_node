const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

let usuarios = []

app.get('/', (req, res) => {
    //res.send('ola mundo')
    res.render('formulario')
});

app.get('/user', (req, res) => {
    res.send(usuarios)
});

app.post('/user', (req, res) => {
    let user = {}

    user.nome = req.body.nome
    user.id = usuarios.length
    usuarios.push(user)

    res.status(301).send('Usuario cadastrado com sucesso')
});

app.put('/user/:id', (req, res) => {
    try {
        const id = req.params.id
        usuarios[id].nome = req.body.nome
        res.send('Usuario atualizado com sucesso')
    }catch(e) {
        console.log('Error');
    }
})

app.delete('/user/:id', (req, res) => {
    try {
        const id = req.params.id

        let i = 0;
        while(i < usuarios.length) {
            if(usuarios[i].id == id) {
                usuarios.splice(id, 1)
                break
            }
            i++;
        }
        res.send('Usuario deletado com sucesso')
    }catch(e) {
        console.log('Error');
    }
})

app.listen(3000, () => console.log('servidor no ar'));