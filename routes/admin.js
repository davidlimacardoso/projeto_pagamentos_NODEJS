//***********************************************************
//Carregando os módulos
//***********************************************************
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') //incluir o mongoose por inserir dados no BD do cad-cat-pagamento

//incluir a model catpagamento
require('../models/CatPagamento')
const CatPagamento = mongoose.model('catpagamento')

//incluir model Pagamento
require('../models/Pagamento')
const Pagamento = mongoose.model('pagamento')

//Rota da página inicial administrativo
router.get('/', (req, res) => {
    res.render('admin/index')
})

//--------------------------------------------------------------//
                        //CATEGORIA DE PAGAMENTOS
//--------------------------------------------------------------//
//Rota para página de categorias de pagamentos
    router.get('/cad-cat-pagamento', (req, res) => {
        res.render('admin/cad-cat-pagamento')
    })

router.get('/cat-pagamentos', (req, res) => {
//LISTAR OS DADOS NA PÁGINA CATEGORIA DE PAGAMENTOS
    CatPagamento.find().then((catpagamento) => {
        res.render('admin/cat-pagamentos',{catpagamentos: catpagamento})
    }).catch((erro) => {
        req.flash('error_msg','Erro: Categoria de pagamento não foi encontrada!')
        res.render('admin/cat-pagamentos')
    })
})

//Visualizar detalhes da categoria
router.get('/vis-cat-pagamento/:id', (req, res)=>{
    CatPagamento.findOne({_id: req.params.id}).then((catpagamento) => {
        res.render('admin/vis-cat-pagamento',{catpagamento: catpagamento})
    }).catch((erro)=>{
        req.flash('error_msg','Erro: Categoria de pagamento não foi encontrada!')
        res.render('admin/cat-pagamentos')
    })
})
// router.get('/vis-cat-pagamento/:id', (req, res) => {
//     CatPagamento.findOne({_id: req.params.id}).then((catpagamento) => {
//         res.render('admin/vis-cat-pagamentos',{catpagamento: catpagamento})
// }).catch((erro)=>{
//     req.flash('error_msg','Erro: Categoria de pagamento não foi encontrada!')
//     res.render('admin/cat-pagamentos')
// })

//Adicionar dados cat pagamento
router.post('/add-cat-pagamento', (req, res) => {
    //Validar input nome
    var errors = []
    //Ver se há dados no input
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        errors.push({error: 'Necessário preencher o campo nome!'})
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

//Editar dados cat pagamento
router.get('/edit-cat-pagamento/:id', (req,res) => {
    CatPagamento.findOne({_id: req.params.id}).then((catpagamento)=>{//PEGAR A CONSTANTE DA MODEL BUSCAR O _ID DA URL ATRAVÉS DO PARAMS
        res.render('admin/edit-cat-pagamento',{catpagamento: catpagamento})
    }).catch((erro)=>{
        req.flash('error_msg','Erro: Falha ao buscar dados desta categoria! ')
        res.redirect('/admin/cat-pagamentos')
    })
})

//Update da categoria
router.post('/update-cat-pagamento', (req, res)=>{
    CatPagamento.findOne({ _id: req.body.id }).then((catpagamento)=>{
        catpagamento.nome = req.body.nome
        catpagamento.save().then(()=>{
            req.flash('success_msg','Categoria editado com sucesso!')
            res.redirect('/admin/cat-pagamentos')
        }).catch((erro)=>{
            req.flash('error_msg','Erro: Falha ao editar encotrada! ')
            res.redirect('/admin/edit-cat-pagamento')
        })
    }).catch((erro)=>{
        req.flash('error_msg','Erro: categoria não encotrada! ')
        res.redirect('/admin/edit-cat-pagamento')
    })
})

//Deletar dados da categoriapagamento
router.get('/del-cat-pagamento/:id',(req, res)=>{
    CatPagamento.deleteOne({_id: req.params.id}).then(()=>{
        req.flash('success_msg','Categoria excluído com sucesso!')
            res.redirect('/admin/cat-pagamentos')
    }).catch((erro)=>{
        req.flash('error_msg','Erro: Falha ao excluir categoria! ')
        res.redirect('/admin/cat-pagamentos')
    })
})

//--------------------------------------------------------------//
                        //PAGAMENTOS
//--------------------------------------------------------------//
//Redirecionamento para pagina pagamento
router.get('/pagamentos', (req,res)=>{
    res.render('admin/pagamentos')
})

//Rota página cadastrar pagamento
router.get('/cad-pagamento', (req,res)=>{

    //Extrair cat-pagamentos para o select
    CatPagamento.find().then((catpagamento)=>{
        //Renderizar formulário com as categorias de pagamento
        res.render('admin/cad-pagamento',{catpagamentos: catpagamento})
    }).catch((erro)=>{
        req.flash('error_msg','Erro: Falha ao excluir categoria! ')
        res.redirect('/admin/pagamentos')
    })
})




//Exportar os módulos de rotas
module.exports = router
