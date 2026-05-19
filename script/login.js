let Bhorario = document.querySelectorAll('.Bhorario')

Bhorario.forEach(botao => {

    botao.addEventListener('click', () => {

        let usuarioLogado = localStorage.getItem('usuarioLogado')

        if (!usuarioLogado) {

            window.location.href = "../html/login.html"

        } else {

            window.location.href = "../html/ingressos.html"

        }

    })

})

const modalLogin = document.getElementById('modalLogin')
const modalCadastro = document.getElementById('modalCadastro')

const abrirCadastro = document.getElementById('abrirCadastro')
const fecharCadastro = document.getElementById('fecharModal')
const fecharLogin = document.getElementById('fecharLogin')


if (abrirCadastro) {
    abrirCadastro.addEventListener('click', () => {
        modalLogin.style.display = 'none'
        modalCadastro.style.display = 'flex'
    })
}

if (fecharCadastro) {
    fecharCadastro.addEventListener('click', () => {
        modalCadastro.style.display = 'none'
    })
}

if (fecharLogin) {
    fecharLogin.addEventListener('click', () => {
        modalLogin.style.display = 'none'
    })
}



window.addEventListener('click', (e) => {

    if (e.target === modalLogin) {
        modalLogin.style.display = 'none'
    }

    if (e.target === modalCadastro) {
        modalCadastro.style.display = 'none'
    }

})

const cadastroForm = document.getElementById('cadastroForm')

if (cadastroForm) {

    cadastroForm.addEventListener('submit', (e) => {

        e.preventDefault()

        let nome = document.getElementById('cadastroNome').value
        let email = document.getElementById('cadastroEmail').value
        let senha = document.getElementById('cadastroSenha').value

        let usuario = {
            nome,
            email,
            senha
        }

        localStorage.setItem('usuario', JSON.stringify(usuario))

        alert('Cadastro realizado!')

        modalCadastro.style.display = 'none'
        modalLogin.style.display = 'flex'
    })
}

const loginForm = document.getElementById('loginForm')

if (loginForm) {

    loginForm.addEventListener('submit', (e) => {

        e.preventDefault()

        let email = document.getElementById('loginEmail').value
        let senha = document.getElementById('loginSenha').value

        let usuarioSalvo = JSON.parse(localStorage.getItem('usuario'))

        if (
            usuarioSalvo &&
            email === usuarioSalvo.email &&
            senha === usuarioSalvo.senha
        ) {

            localStorage.setItem('usuarioLogado', 'true')

            alert('Login realizado!')

            modalLogin.style.display = 'none'

            window.location.href = "../html/ingressos.html"

        } else {

            alert('Email ou senha incorretos')
        }

    })
}


const logoutBtn = document.getElementById('logout')

if (logoutBtn) {

    logoutBtn.addEventListener('click', () => {

        localStorage.removeItem('usuarioLogado')

        window.location.href = "../html/index.html"

    })

}