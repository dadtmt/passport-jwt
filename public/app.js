const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const serializeForm = form => {
    const data = {}
    const elements = form.getElementsByClassName('form-control')
    for (let el of elements) {
      data[el.name] = el.value
    }
    return data
  }

const token = localStorage.getItem('token')
console.log(token)

const loginFormHtml = `<form id="loginForm">
<input class="form-control" name="username" placeholder="username"/>
<input class="form-control" type="password" name="password" placeholder="password"/>
<input type="submit" value="se connecter" />
</form>`



render(`
    <div id="alert-login"></div> 
    ${ !token ? loginFormHtml : '<button id="disconnect" type="button">se deconnecter</button>' }
    <div id="test">CALL TEST</div>
`)

if (!token) {
    const loginForm = document.getElementById('loginForm')
    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        //data ?
        const data = serializeForm(loginForm)
        console.log(data)
        //post sur le server /auth/login
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            const alert = document.getElementById('alert-login')
            if(!data.user) {
                //alert class danger
                alert.innerHTML = `echec`
            } else {
                alert.innerHTML = `${data.user.username} est connecté <button id="disconnect" type="button">se deconnecter</button>`
                //stores the token
                localStorage.setItem('token', data.token)
                loginForm.style.display = 'none'
                document.getElementById('disconnect').addEventListener('click', () => {
                    localStorage.removeItem('token')
                    render(`
                        <div id="alert-login"></div> 
                        ${ loginFormHtml }
                        <div id="test">CALL TEST</div>
                    `)
                })
            }
        })
    })

} else {
    document.getElementById('disconnect').addEventListener('click', () => {
        localStorage.removeItem('token')
        render(`
            <div id="alert-login"></div> 
            ${ loginFormHtml }
            <div id="test">CALL TEST</div>
        `)
    })
}

document.getElementById('test').addEventListener('click', () => {
    const token = localStorage.getItem('token')
    console.log(token)
    fetch('test',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,          
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
})
