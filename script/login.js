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

    let name = document.getElementById('loginName').value
    let senha = document.getElementById('loginSenha').value

    


if (loginForm) {

    loginForm.addEventListener('submit', (e) => {

        e.preventDefault()

        let name = document.getElementById('loginName').value
        let senha = document.getElementById('loginSenha').value

        let usuarioSalvo = JSON.parse(localStorage.getItem('usuario'))

        if (
            usuarioSalvo &&
            name === usuarioSalvo.name &&
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

const btnConvidado = document.getElementById('btnConvidado')

if (btnConvidado) {

    btnConvidado.addEventListener('click', () => {
        window.location.href = "../html/ingresso.html"
    })
}