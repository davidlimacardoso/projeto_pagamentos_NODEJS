//***********************************************************
//Carregando os módulos
//***********************************************************
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') //incluir o mongoose por inserir dados no BD do cad-cat-pagamento
require('../models/CatPagamento')
const CatPagamento = mongoose.model('catpagamento') //incluir a model catpagamento

//Rota da página inicial administrativo
router.get('/', (req, res) => {
    res.render('admin/index')
})

//Rota da página pagamentos para o administrativo
router.get('/pagamentos', (req,res) => {
    res.send('Página de Pagamentos!')
})

//Rota para página de categorias de pagamentos
router.get('/cat-pagamentos', (req, res) => {
    res.render('admin/cat-pagamentos')
})

router.get('/cad-cat-pagamento', (req, res) => {
    res.render('admin/cad-cat-pagamento')
})

router.post('/add-cat-pagamento', (req, res) => {
    //Validar input nome
    var errors = []
    //Ver se há dados no input
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        errors.push({error: "Necessário preencher o campo nome!"})
    }
    if(errors.length > 0){
        
        res.render('/admin/cad-cat-pagamento',{errors: errors})
        req.flash('error_msg','Erro: Necessário preencher campo nome!')
        res.redirect('/admin/cad-cat-pagamento')

    }else{
        //Pegar os dados do input
        const addCatPagamento = {
            nome: req.body.nome
        }
    
        //Salvar no BD
        new CatPagamento(addCatPagamento).save().then(()=>{
            req.flash('success_msg','Categoria de pagamento cadastrado com sucesso!')
            res.redirect('/admin/cat-pagamentos')
        }).catch(()=>{
            req.flash('error_msg','Erro: Falha ao cadastrar categoria de pagamento! ')
            res.redirect('/admin/cat-pagamentos')
        })

    }
})


//Exportar os módulos de rotas
module.exports = router
