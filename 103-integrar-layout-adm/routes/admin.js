//Carregando os módulo
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    //res.send("Página incial do administrativo")
    res.render("admin/index")
})

router.get('/pagamentos', (req, res) => {
    res.send("Página de pagamentos")
})

//Exportar o módulo de rotas
module.exports = router