
const db = require('../db');

module.exports = {
    cadastrarUsuario: (email, senha) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO usuarios (Email, Senha) VALUES (?, ?)', [email, senha], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results.insertId);
            });
        });
    },

    buscarUsuarioPorEmail: (email) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT Id, Email, Senha FROM usuarios WHERE Email = ?', [email], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results.length > 0 ? results[0] : null);
            });
        });
    },

    alterarPerfil: (DescricaoPerfil, Empresa, Foto, Id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE usuarios SET DescricaoPerfil = ?, Empresa = ?, Foto = ? WHERE Id = ?', 
            [DescricaoPerfil, Empresa, Foto, Id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    excluirUsuario: (id) => {
        return new Promise(async (aceito, rejeitado) => {
            try {
                // Antes de excluir o usuário, exclua os produtos associados
                await db.query('DELETE FROM produtos WHERE IdUsuario = ?', [id]);
    
                // Agora, exclua o usuário
                await db.query('DELETE FROM usuarios WHERE Id = ?', [id]);
    
                aceito();
            } catch (error) {
                rejeitado(error);
            }
        });
    },
    validarLogin: (email, senhaDigitada) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT Id, Senha FROM usuarios WHERE Email = ?', [email], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }

                if (results.length > 0) {
                    const usuario = results[0];
                    const senhaCorreta = usuario.Senha;

                    // Retorna o objeto completo do usuário
                    aceito(senhaCorreta === senhaDigitada ? usuario : null);
                } else {
                    aceito(null);
                }
            });
        });
    },

    buscarPerfil: (Id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT Id, Email, Foto, DescricaoPerfil, Empresa FROM usuarios WHERE Id = ?', [Id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

};