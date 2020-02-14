const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Reveber Schema
const Pagamento = new Schema({
    nome: {
        type: String,
        required: true,
        unique:true
    },
    valor: {
        type: Number,
        required: true
    },
    //CHAVE ESTRANGEIRA
    catpagamento: {
        type: Schema.Types.ObjectId,
        ref: 'catpagamento',
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('pagamento',Pagamento)
