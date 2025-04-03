'use strict'

async function criarCardContato(nomeContato){
    const divDosContatos = document.getElementById('lista_contatos')
    const pContato = document.createElement('p')
    pContato.textContent = nomeContato
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

async function trazerConversas(){
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/conversas?numero=11987876567&contato=Jane%20Smith`
    const response = await fetch(url)
    const data = await response.json()
}

async function preencherCardContato(){
    const contatos = await trazerContatos()

    const divDosContatos = document.getElementById('lista_contatos')

    contatos.forEach(function(contato){
        criarCardContato(contato.name)
    })

    console.log(contatos)
}


preencherCardContato()