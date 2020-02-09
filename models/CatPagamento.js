const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CatPagamento = new Schema({
    //Posição
    nome: {
        type: String,
        required: true,
        unique: true,
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

//Criar a model para instanciar quando precisar
mongoose.model('catpagamento', CatPagamento)
