const db = require('../db')

module.exports = {

    buscarTodosPorUsuario: (idUsuario) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM produtos WHERE IdUsuario = ?', [idUsuario], (error, results) => {
                if (error) { 
                    rejeitado(error); 
                    return;
                }
                aceito(results);
            });
        });
    },

    buscarUm: (Id) =>{

        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM produtos WHERE Id = ?', [Id], (error,results)=>{

                if(error) { rejeitado(error); return;}
                if(results.length > 0){
                    aceito(results[0]);
                } else{
                    aceito(false);
                }

            });

        });

    },

    inserir: (Descricao,Image, Valor, Produto, IdUsuario) =>{


        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO produtos (Descricao, Image, Valor, Produto, IdUsuario) VALUES (?, ?, ?, ?, ?)', 
                [Descricao, Image, Valor, Produto, IdUsuario], 
                (error,results)=>{
                    if(error) { rejeitado(error); return;}
                    aceito(results.insertId);
                }
            );

        });

    },

    alterar: (Descricao,Image, Valor, Produto, Id) =>{


        console.log("Valor após conversão:", Valor);


        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE produtos SET Descricao = ?, Image = ?, Valor = ?, Produto = ? WHERE Id = ?', 
                [Descricao, Image, Valor, Produto, Id], 
                (error,results)=>{
                    if(error) { rejeitado(error); return;}
                    aceito(results);
                }
            );

        });

    },

    excluir: (Id) =>{

        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM produtos WHERE Id = ?', [Id], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        });

    },





};