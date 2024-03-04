const ProdutosService = require('../services/ProdutosService');

module.exports = {

    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};
        const idUsuario = req.query.idUsuario; // Obtém o ID do usuário da consulta
    
        if (!idUsuario) {
            json.error = 'ID do usuário não fornecido';
            return res.json(json);
        }
    
        let produtos = await ProdutosService.buscarTodosPorUsuario(idUsuario);
    
        for (let i in produtos) {
            json.result.push({
                Id: produtos[i].Id,
                Produto:produtos[i].Produto,
                Image: produtos[i].Image,
                Descricao: produtos[i].Descricao,
                Valor: produtos[i].Valor 
            });
        }
        
        res.json(json);
    },

    buscarUm: async(req, res) => {
        let json = {error:'', result:{}};

        let Id = req.params.Id;
        let Produto = await ProdutosService.buscarUm(Id);

        if(Produto){

            json.result = Produto;
        }

        res.json(json);

        
    },

    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let Descricao = req.body.Descricao;
        let Image = req.body.Image;
        let Valor = req.body.Valor;
        let Produto = req.body.Produto;
        let IdUsuario = req.body.IdUsuario;


        if(Descricao && Image && Valor && Produto && IdUsuario){
            let ProdutoId = await ProdutosService.inserir(Descricao,Image,Valor,Produto,IdUsuario);
            json.result = {
                Id: ProdutoId,
                Descricao,
                Image,
                Valor,
                Produto,
                IdUsuario
            };
        } else{
            json.error = 'Campos não enviados';
        }

        res.json(json);

        
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let Id = req.params.Id;
        let Descricao = req.body.Descricao;
        let Image = req.body.Image;
        let Valor = req.body.Valor;
        let Produto = req.body.Produto;

        if(Descricao && Image && Valor && Produto && Id){
            await ProdutosService.alterar(Descricao,Image,Valor,Produto, Id);
            json.result = {
                Id,
                Descricao,
                Image,
                Valor,
                Produto
            };
        } else{
            json.error = 'Campos não enviados';
        }

        res.json(json);

        
    },

    excluir: async(req, res) =>{
        let json = {error:'', result:{}};
        await ProdutosService.excluir(req.params.Id);
        res.json(json);

    }

}