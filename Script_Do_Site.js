async function buscarUsuario() {
    const email = document.getElementById('emailInput').value;
    const senha = document.getElementById('passwordInput').value;

    try {
        const response = await fetch('http://localhost:3000/api/validarLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: email,
                Senha: senha,
            }),
        });

        const data = await response.json();

        if (data.result && data.result.validado) {
            // Armazena o ID do usuário em localStorage
            localStorage.setItem('userId', data.result.userId);

            alert('Login Bem Sucedido');
            window.location.href = 'Pagina_de_Produtos.html';
        } else {
            alert(data.error || 'Credenciais incorretas');
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        alert('Erro ao buscar usuário. Verifique o console para mais detalhes.');
    }
}
//------------------------------------------


async function obterListaProdutos() {

    const idUsuario = obterIdUsuarioLogado();

    const response = await fetch(`http://localhost:3000/api/produtos?idUsuario=${idUsuario}`);
    const data = await response.json();
    return data.result;
}

async function exibirListaProdutos() {
const listaProdutos = await obterListaProdutos();
const listaProdutosElement = document.getElementById('listaProdutos');
listaProdutosElement.innerHTML = '';

listaProdutos.forEach(produto => {
const li = document.createElement('li');

// Adiciona a imagem como uma tag <img>
const img = document.createElement('img');
img.src = produto.Image;
img.alt = `Imagem de ${produto.Descricao}`;
li.appendChild(img);

// Adiciona outras informações do produto
const descricaoP = document.createElement('p');
descricaoP.innerHTML= `Produto: ${produto.Produto} <br> Descrição: ${produto.Descricao} <br> Valor: R$ ${produto.Valor} <br> `;
li.appendChild(descricaoP);

// Botão Excluir
const btnExcluir = document.createElement('button');
btnExcluir.textContent = 'Excluir';
btnExcluir.addEventListener('click', () => excluirProduto(produto.Id));
li.appendChild(btnExcluir);

// Botão Editar
const editarButton = document.createElement('button');
editarButton.textContent = 'Editar';
editarButton.onclick = () => abrirFormularioEdicao(produto.Id, produto.Descricao, produto.Image, produto.Valor, produto.Produto);
li.appendChild(editarButton);

listaProdutosElement.appendChild(li);
});
}

async function excluirProduto(produtoId) {
    // Exibe um aviso de confirmação
    const confirmacao = confirm("Tem certeza que deseja excluir este item?");
    
    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:3000/api/Produto/${produtoId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            alert(data.error || data.result.message);

            // Recarrega a lista de produtos após a exclusão
            await carregarListaProdutos();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto. Verifique o console para mais detalhes.');
        }
    }
}

function abrirFormularioEdicao(id, descricao, image, valor, produto) {
// Preencher os campos do formulário de edição com os dados do produto
document.getElementById('edicaoId').value = id;
document.getElementById('edicaoDescricao').value = descricao;
document.getElementById('edicaoImage').value = image;
document.getElementById('edicaoValor').value = valor;
document.getElementById('edicaoProduto').value = produto;

// Exibir o formulário de edição
document.getElementById('formularioEdicao').style.display = 'block';
}

let produtoIdEmEdicao;

async function atualizarProduto() {
const id = document.getElementById('edicaoId').value;
const descricao = document.getElementById('edicaoDescricao').value;
const image = document.getElementById('edicaoImage').value;
const valor = parseFloat(document.getElementById('edicaoValor').value);
const produto = document.getElementById('edicaoProduto').value;

try {
const response = await fetch(`http://localhost:3000/api/Produto/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        Descricao: descricao,
        Image: image,
        Valor: valor,
        Produto: produto,
    }),
});

const data = await response.json();
alert(data.error || 'Produto atualizado com sucesso');

// Após atualizar, recarrega a lista de produtos
await carregarListaProdutos();

// Esconde o formulário de edição
document.getElementById('formularioEdicao').style.display = 'none';
} catch (error) {
console.error('Erro ao atualizar produto:', error);
alert('Erro ao atualizar produto. Verifique o console para mais detalhes.');
}
}

async function carregarListaProdutos() {
    await exibirListaProdutos();
}


function cancelarEdicao() {
    // Oculta o formulário de edição
    document.getElementById('formularioEdicao').style.display = 'none';
    
    // Limpa os campos do formulário
    document.getElementById('edicaoId').value = '';
    document.getElementById('edicaoDescricao').value = '';
    document.getElementById('edicaoImage').value = '';
    document.getElementById('edicaoValor').value = '';
    document.getElementById('edicaoProduto').value = '';
}




//--------------------------------------------------------------------------------------------


function obterIdUsuarioLogado() {
    return localStorage.getItem('userId');
}

async function inserirProduto() {
    const descricao = document.getElementById('descricao').value;
    const image = document.getElementById('image').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const produto = document.getElementById('produto').value;

    const idUsuario = obterIdUsuarioLogado();


    try {
        const response = await fetch('http://localhost:3000/api/Produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Descricao: descricao,
                Image: image,
                Valor: valor,
                Produto: produto,
                IdUsuario: idUsuario,

            }),
        });

        const data = await response.json();
        alert(data.error || 'Produto inserido com sucesso');
        
        await carregarListaProdutos();
    } catch (error) {
        console.error('Erro ao inserir produto:', error);
        alert('Erro ao inserir produto. Verifique o console para mais detalhes.');
    }
}


//------------------------------------------------------------------------------------------------

async function carregarPerfilUsuario() {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`);
        const data = await response.json();

        if (data.result) {
            document.getElementById('nomeUsuario').innerText = data.result.Email;
            const empresaUsuarioElement = document.getElementById('empresaUsuario');
            const descricaoPerfilElement = document.getElementById('descricaoPerfilUsuario');
            const fotoPerfilElement = document.getElementById('fotoPerfil');

            // Verifica se a empresa está vazia e exibe uma informação padrão se for o caso
            empresaUsuarioElement.innerText = data.result.Empresa || 'Sem empresa';

            // Verifica se a descrição do perfil está vazia e exibe uma informação padrão se for o caso
            descricaoPerfilElement.innerText = data.result.DescricaoPerfil || 'Sem descrição de perfil';

            // Verifica se o campo Foto está vazio e define uma imagem padrão se for o caso
            fotoPerfilElement.src = data.result.Foto || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAYFBMVEVmZmb///9VVVVeXl5iYmJaWlpcXFzR0dFWVlZwcHD8/PysrKzf39/GxsZsbGzt7e2Ojo719fXn5+d+fn6VlZWlpaWEhITAwMDU1NS4uLjc3NyLi4udnZ1vb293d3fLy8uj0/C3AAAEW0lEQVR4nO2b2XriMAyFwUvIAgFCWAItff+3HJjIIWUoYwcXLHP+yzbhkyL7yLbk0QgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv4aSidbihNaJVK+2xjdSy3q7q5bjE8tqt61Pf3i1Tf5Qumyq8RVVU+o44qhEPb32rmVaiwhcTBfz2+6dmS/SV9v3ILL8IXpdFEvWc1Gs77t3Zi1ebeVw9KTnSD4pFpkUQmaLYpL3/jHRr7ZzIEr1Zt9sI7rsd8qIYjPrzUTFUmuUWnbBK3Ry5YNKdNGFccnSw4t/W3lTSKTcXjx8tnWPo834XK5+nGN6ZYI4ZzcPhdGX6fXg7KO0ySITZloq15aGdx9izSsfltaB6Twsn2GXL1IaeVOLgSfMs4xWbWpB+pLYPJ2Q3C74SKkgBV1ZmaxWpKRsdEbVlP8stV9TPqy5hJC0P7fWRdmmwz2XZEgSWtg7WLASUtm05jrEQ7dvNDxyoW7PX2ZWEtqStHuLiscYlW04Ng6SoTbtOywiSBqaO4m+yPnoKG2CJg4j9DRGJ7Sx+i2rPJLsHDX0DOnozumrvAjSGLeFFy3uWKiMbpeWmdtbWbt45eCgGCSIJL0clqNikKnD3noJ7+JgvEM0epGJPk1En+ijX6pFv9iOfrv0Bhve2I8soj90GnxsOOUxQt/g4Df6o/uu+JJbhVBTmZdR8SX68ln8BdD4S9i9JoR7TZN8mxB6bSR5nG0k8TcCxd/KFX0z3ij6dspR/A2xFi3Ne94tzSOVJvt7/k0z1o33SizuundmvmZ7RUSJ+s6Nggt5kbKMol79c9vlRxc/+AmNSr6+O1HNisWxPF/OKo+HYnalPVXGbJzqQz/TLbcbreXlyplSUqer7/eZClZBFNue6bOVuHWd7uRk2fQ+w5TPnTuVXAZgXsg7Tdsy7elQnjHxUJXdKnvcpP+ZWyepvTy9YTERVdYZvFcWFqu06V6oGZTPev7VlsdIyWc3TuvgY6jMcdN4PrKeUirtcsohdA+lmVFfTrKfdtuOY9hKYw45x41jWktqo6VBh9BUGcaF8ymu3Jh8GHDGV4cuO7i/LE0M3doXnkqSD5l/3dtmHjq22DwPTVpYDRxk6YPv/zamk2A8WAdN2e0jTCU15j1QBvskJQ2y0GTqupMHrEuagHXGBPAh29J2nWBXOX0upqr72Mc3w2Ad3izUey/Th8ZBgPV65+aY25gQ2vUvPBFTCnt48qTtYmEWmsyQOrg0qN2GGsHcmhWfwNHfZqf9JZdmxSdA333p4btT2T6wxjwqsfiwir5VYI1rdJfg4GFcmc6uoBz0alQaYKJQHx6HFS0ZglrMUBb0k7zkLLxMSLcC/GwCVIB3KEja/TRE0slOUB3qdF/p6OfX2kVDUPeYaAHpqSOS1u0hbev93v4L8C5h9A6OxF/C/DUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg7fgDyhYmCCEbhAQAAAAASUVORK5CYII=';
        } else {
            alert(data.error || 'Erro ao carregar perfil');
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        alert('Erro ao carregar perfil. Verifique o console para mais detalhes.');
    }
}
async function atualizarPerfil() {
    const userId = localStorage.getItem('userId');
    const novaDescricaoPerfil = document.getElementById('edicaodescricao').value;
    const novaEmpresa = document.getElementById('edicaoempresa').value;
    const novaFoto = document.getElementById('edicaofoto').value;

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                DescricaoPerfil: novaDescricaoPerfil,
                Empresa: novaEmpresa,
                Foto: novaFoto
            }),
        });

        const data = await response.json();
        alert(data.error || 'Perfil atualizado com sucesso');
        await carregarPerfilUsuario();
        cancelarEdicaoPerfil();
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Erro ao atualizar perfil. Verifique o console para mais detalhes.');
    }
}

async function abrirFormularioEdicaoPerfil() {
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`);
        const data = await response.json();

        if (data.result) {
            // Preencher os campos do formulário com os dados atuais do perfil
            document.getElementById('edicaoempresa').value = data.result.Empresa;
            document.getElementById('edicaodescricao').value = data.result.DescricaoPerfil;
            document.getElementById('edicaofoto').value = data.result.Foto;

            // Exibir o formulário de edição
            document.getElementById('formularioEdicaoPerfil').style.display = 'block';
        } else {
            alert(data.error || 'Erro ao carregar dados do perfil para edição');
        }
    } catch (error) {
        console.error('Erro ao abrir formulário de edição de perfil:', error);
        alert('Erro ao abrir formulário de edição de perfil. Verifique o console para mais detalhes.');
    }
}
function cancelarEdicaoPerfil() {
    document.getElementById('formularioEdicaoPerfil').style.display = 'none';
    document.getElementById('edicaodescricao').value = '';
    document.getElementById('edicaoempresa').value = '';  // Limpar outros campos do formulário, se necessário
    document.getElementById('edicaofoto').value = '';
}

async function excluirPerfil() {
    const userId = localStorage.getItem('userId');
    const confirmacao = confirm("Tem certeza que deseja excluir seu perfil?");

    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:3000/api/Usuario/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            alert(data.error || 'Perfil excluído com sucesso');
            // Redirecionar para a página de login após excluir o perfil
            window.location.href = 'Pagina_de_login.html';
        } catch (error) {
            console.error('Erro ao excluir perfil:', error);
            alert('Erro ao excluir perfil. Verifique o console para mais detalhes.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const paginaAtual = window.location.pathname; // Obtém o caminho da URL da página atual

    if (paginaAtual.includes('Pagina_de_perfil.html')) {
        carregarPerfilUsuario();
    } else if (paginaAtual.includes('Pagina_de_Produtos.html')) {
        carregarListaProdutos();
    }
});

//------------------------------------------------------------------------------------------------------------------

async function verificarEmailExistente(email) {
    try {
        const response = await fetch(`http://localhost:3000/api/Usuario/${encodeURIComponent(email)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao verificar e-mail:', error);
        return { error: 'Erro ao verificar e-mail. Verifique o console para mais detalhes.' };
    }
}

async function cadastrarUsuario() {
    const email = document.getElementById('emailInput').value;
    const senha = document.getElementById('senhaInput').value;

    // Verifica se o e-mail já está cadastrado
    const resultadoEmail = await verificarEmailExistente(email);

    if (resultadoEmail.error) {
        alert(resultadoEmail.error);
        return;
    }

 if (resultadoEmail.result !== null && resultadoEmail.result.Id) {
    alert('Usuario já cadastrado. Por favor, tente novamente com outro usuario.');
    return;
}

    try {
        const response = await fetch('http://localhost:3000/api/Usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: email,
                Senha: senha
            }),
        });

        const data = await response.json();
        alert(data.error || 'Usuário cadastrado com sucesso');

        window.location.href = 'Pagina_de_login.html';

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Verifique o console para mais detalhes.');
    }
}