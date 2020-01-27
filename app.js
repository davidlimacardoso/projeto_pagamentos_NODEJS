//***********************************************************
//Requisitar módulos
//***********************************************************
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express();
const admin = require('./routes/admin') //Trazer rotas do admin
const path = require('path') //Requisitar path
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

//***********************************************************

//***********************************************************
//Configurações
//***********************************************************

//Session
app.use(session({
  secret: 'david123',
  resave: true,
  saveUninitialized: true
}))

//Flash
app.use(flash())

//Middleware
app.use((req,res,next) => {
  //CRIAR VARIÁVEIS GLOBAIS
  res.locals.success_msg = req.flash('success_msg') 
  res.locals.error_msg = req.flash('error_msg')
  next()
})

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars')

//Conexão com MongoDB
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
console.log('Conexão realizada com sucesso!')
}).catch((erro) => {
    console.log('Falha na conexão! ' + erro)
})
mongoose.set('useCreateIndex', true);


//Incluir arquivos estáticos
app.use(express.static(path.join(__dirname,'public')))

//***********************************************************

//***********************************************************
//ROTAS
//***********************************************************
//Rota do admin
app.use('/admin',admin)

//***********************************************************
//Iniciar o servidor
//***********************************************************
const PORT = 3000;
app.listen(PORT,()=>{
    console.log('Servidor Iniciado!')
})
//***********************************************************


