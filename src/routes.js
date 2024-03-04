const express = require('express');
const router  = express.Router();

const ProdutosControllers = require('./controllers/ProdutosControllers');

const UsuariosControllers = require('./controllers/UsuariosControllers');


router.get('/produtos',ProdutosControllers.buscarTodos);
router.get('/Produto/:Id',ProdutosControllers.buscarUm);
router.post('/Produto',ProdutosControllers.inserir);
router.put('/Produto/:Id', ProdutosControllers.alterar); 
router.delete('/Produto/:Id', ProdutosControllers.excluir); 

router.post('/Usuario', UsuariosControllers.cadastrarUsuario);
router.get('/Usuario/:Email', UsuariosControllers.buscarUsuarioPorEmail);
router.put('/usuarios/:Id', UsuariosControllers.alterarPerfil);
router.delete('/Usuario/:Id', UsuariosControllers.excluirUsuario);
router.post('/validarLogin', UsuariosControllers.validarLogin);
router.get('/usuarios/:Id',UsuariosControllers.buscarPerfil);


module.exports = router; 
