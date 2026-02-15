// VARIAVEIS
const getElement = (id) => document.getElementById(id);
const registerName = getElement("name");
const regiterCpf = getElement('cpf');
const registerEmail = getElement('email');
const users = getElement('list')
const empty = getElement('empty');
const url = "https://crudcrud.com/api/e7ef338e47374ad4923f7b4546991333/clientes"

//MENSAGEM DE LISTA VAZIA
function toggleEmpty(){
    if(userList.children.length === 0){
        empty.style.display = 'block';
    } else {
        empty.style.display = 'none';
    }
}

// AUX. ADD. CLIENTE
function addToDOM(user) {
    const item = document.createElement('li');
    item.innerHTML = `
        <span>${user.userName}, ${user.cpf}, ${user.email}</span>
        <button class="btn" onclick="remove('${user._id}')">X</button>
        ;`
    userList.appendChild(item);
}

// REMOVER CLIENTE
function remove(id) {
    fetch(`${url}/${id}`, {method: 'DELETE',})
    .then(response => {
        if(response.ok){
            alert("Removido com sucesso")
            toggleEmpty();
            console.log(`Registro com id: ${id} foi removido com sucesso`);
            location.reload();
        } else {
            console.error('Falha ao deletar o reistro', response.status);
            alert('Error ao deleter no servidor')
        }
    })
    .catch(error => console.error('Error:', error));
}

// MOSTRAR LISTA DE CLIENTES
fetch(url)
.then(response => response.json())
.then((listUser) => {
    listUser.forEach(user => {
        addToDOM(user);
    });
    toggleEmpty();
})
.catch(error => console.error('Error:', error));

// ADICIONAR NOVOS CLIENTES
getElement("send").addEventListener('click', ()=>{
    const sendName = registerName.value;
    const sendCPF = regiterCpf.value;
    const sendEmail = registerEmail.value;

    if(!sendName || !sendEmail){
        alert("Preencha o nome e email");
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: sendName,
            cpf: sendCPF,
            email: sendEmail
        })
    })
    .then(response => {
        if(!response.ok){
            throw new error("ERRO AO CADASTRAR")
        } else {
            console.log('Status:', response.status);
            return response.json()
        }
    })
    .then((user) => {

        addToDOM(user);
        toggleEmpty();

        registerName.value = '';
        regiterCpf.value = '';
        registerEmail.value = '';
    })
    .catch(error => console.error('Error:', error));
})

// BOTÃO DE LIMPAR FORM
getElement('clear').addEventListener('click', () =>{
    registerName.value = '';
    regiterCpf.value = '';
    registerEmail.value = '';                
})

