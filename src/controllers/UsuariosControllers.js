const UsuariosService = require('../services/UsuariosService');

module.exports = {
    cadastrarUsuario: async (req, res) => {
        let json = { error: '', result: {} };

        let email = req.body.Email;
        let senha = req.body.Senha;



        if (email && senha) {
            try {
                let usuarioId = await UsuariosService.cadastrarUsuario(email, senha,);
                json.result = { Id: usuarioId, Email: email };
            } catch (error) {
                json.error = 'Erro ao cadastrar usuário';
            }
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    buscarUsuarioPorEmail: async (req, res) => {
        let json = { error: '', result: {} };
    
        let email = req.params.Email;
    
        if (email) {
            try {
                let usuario = await UsuariosService.buscarUsuarioPorEmail(email);
                if (usuario) {
                    json.result = { Id: usuario.Id, Email: usuario.Email };
                } else {
                    json.result = null;  // Alteração para indicar que o usuário não foi encontrado
                }
            } catch (error) {
                json.error = 'Erro ao buscar usuário';
            }
        } else {
            json.error = 'Email não enviado';
        }
    
        res.json(json);
    },
    alterarPerfil: async (req, res) => {
        let json = { error: '', result: {} };
    
        const { Id } = req.params;
        const { DescricaoPerfil, Empresa, Foto } = req.body;
    
        if (!Id || !DescricaoPerfil) {
            json.error = 'Campos não fornecidos';
            return res.json(json);
        }
    
        try {
            const params = [DescricaoPerfil, Empresa, Foto, Id].filter((param) => param !== undefined);
            await UsuariosService.alterarPerfil(...params);
            json.result.message = 'Perfil atualizado com sucesso';
            res.json(json);
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            json.error = 'Erro ao atualizar perfil. Verifique o console para mais detalhes.';
            res.json(json);
        }
    },

    excluirUsuario: async (req, res) => {
        let json = { error: '', result: {} };
    
        let id = req.params.Id;
    
        if (!id) {
            json.error = 'ID não enviado';
            return res.json(json);
        }
    
        try {
            console.log('Tentativa de excluir usuário. ID:', id);
            await UsuariosService.excluirUsuario(id);
            json.result = { message: 'Usuário excluído com sucesso' };
            res.json(json);
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            json.error = 'Erro ao excluir usuário';
            res.json(json);
        }
    },
    validarLogin: async (req, res) => {
        let json = { error: '', result: {} };

        let email = req.body.Email;
        let senha = req.body.Senha;

        if (email && senha) {
            try {
                let usuario = await UsuariosService.validarLogin(email, senha);

                if (usuario) {
                    // Adiciona o ID do usuário ao resultado
                    json.result = { validado: true, userId: usuario.Id };
                } else {
                    json.result = { validado: false };
                }
            } catch (error) {
                json.error = 'Erro ao validar login';
            }
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    buscarPerfil: async(req, res) => {
        let json = {error:'', result:{}};

        let Id = req.params.Id;
        let Usuario = await UsuariosService.buscarPerfil(Id);

        if(Usuario){

            json.result = Usuario;
        }

        res.json(json);

        
    },




};