'use strict';

/*Terminar  a aplicação

    consumir API de cep, do site Cep Aberto.


*/ 

const limparFormulario = (endereco) =>{
    
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const preencherFormularios = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValidado = (cep) =>cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    const key = "9a84be4d8eb3b2c689da4369b98c33bc";

    const cep = document.getElementById('cep').value;
    const url = `https://www.cepaberto.com/api/v3/cep?cep=${cep}`;
    
    if(cepValidado(cep)){
        const dados = await fetch(url, key);
        const endereco = await dados.json();
    
        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'cep não encontrado';
        }else{
            preencherFormularios(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'cep incorreto'; 
    }
}


document.getElementById('cep')
    .addEventListener('focusout',pesquisarCep);