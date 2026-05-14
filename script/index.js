let Bhorario = document.querySelectorAll('.Bhorario')

Bhorario.forEach(botao => {

    botao.addEventListener('click', () => {

        let usuarioLogado = localStorage.getItem('usuario')

        if (!usuarioLogado) {

            window.location.href = "../html/login.html"

        } else {

            window.location.href = "../html/ingressos.html"
        }

    })

})


        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"

        import {
            getAuth,
            GoogleAuthProvider,
            signInWithPopup
        } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

        const firebaseConfig = {

            apiKey: "SUA_API_KEY",

            authDomain: "SEU_PROJETO.firebaseapp.com",

            projectId: "SEU_PROJETO",

            storageBucket: "SEU_PROJETO.appspot.com",

            messagingSenderId: "123456789",

            appId: "SEU_APP_ID"

        }
   
        const app = initializeApp(firebaseConfig)

        const auth = getAuth(app)

        const provider = new GoogleAuthProvider()
      
        document.getElementById('googleLogin')
        .addEventListener('click', async () => {

            try{

                const result = await signInWithPopup(auth, provider)

                const user = result.user

                localStorage.setItem('usuario', JSON.stringify({

                    nome: user.displayName,

                    email: user.email,

                    foto: user.photoURL

                }))
                window.location.href = "../ingressos.html"

            }catch(error){

                console.log(error)

                alert("Erro ao fazer login")

            }

        })