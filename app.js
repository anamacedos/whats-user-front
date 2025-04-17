'use strict'

async function criarCardContato(nomeContato){
    const divDosContatos = document.getElementById('lista_contatos')
    const pContato = document.createElement('p')
    pContato.textContent = nomeContato


    pContato.addEventListener('click', function(){
        trazerConversas(nomeContato)
    })

    divDosContatos.appendChild(pContato)

    pContato.classList.add('nomeContato')

}


async function trazerContatos(){
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/contatos/11987876567`
    const respone = await fetch(url)
    const data = await respone.json()
    const dados = data.dados_contato

    return dados

}

async function trazerConversas(contatoNome){
    //substitui os espaços por (20%)
    const nomeFormatado = contatoNome.replaceAll(' ', '%20')
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/conversas?numero=11987876567&contato=${nomeFormatado}`
    const response = await fetch(url)
    const data = await response.json()

    //procura a igualdade entre o conversas.nome e o contatoNome(que é o parametro da função,
    // que é passado a ela quando ela é chamada no onclick, e recebe o mesmo nome que o outro 
    // endpoint retorna para procurar a igualdade, e armazena tudo issso na variavel conversasDoContato)

    //conversa representa cada item do array data.conversas
    const conversasDoContato = data.conversas.find(function(conversa){
        return conversa.name == contatoNome
    })
    if (conversasDoContato){
        exibirMensagens(conversasDoContato.conversas)
    }else{
        exibirMensagens([]) //se n achar nada mostra vazio
    }
}

async function exibirMensagens(mensagens){
    const caixaDeMensagens = document.getElementById('caixaDeMensagens')
    caixaDeMensagens.replaceChildren('')

    mensagens.forEach(function(mensagem){
        const divMensagem = document.createElement('div')
        const conteudoMensagem = document.createElement('p')
        const horarioMensagem = document.createElement('p')

        conteudoMensagem.textContent = mensagem.content
        horarioMensagem.textContent = mensagem.time

        if (mensagem.sender == 'me'){
            divMensagem.classList.add('enviadaPorMim')
        }else{
            divMensagem.classList.add('enviadaPeloContato')
        }



        divMensagem.appendChild(conteudoMensagem)
        divMensagem.appendChild(horarioMensagem)
        caixaDeMensagens.appendChild(divMensagem)
    })
}

async function preencherCardContato(){
    const contatos = await trazerContatos()


    contatos.forEach(function(contato){
        criarCardContato(contato.name)
    })

}


preencherCardContato()