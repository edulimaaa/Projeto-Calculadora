'use strict';

const display = document.getElementById('displayCalculadora');

const numeros = document.querySelectorAll('[id*=num]'); 
const operadores = document.querySelectorAll('[id*=op]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        /*const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado);*/
        if (operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador == '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador == '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }else {
         display.textContent += texto.toLocaleString('BR');
    }
   
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    } 
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));


const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);


const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);


const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);


const removeUltimo = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeUltimo);

const inverteSinais = () => {
    novoNumero = true;
    atualizarDisplay (display.textContent * -1);
}
document.getElementById('inverte').addEventListener('click', inverteSinais);

const existeVirgula = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirVirgula = () => {
    if (!existeVirgula()){
        if (existeValor()){
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('virgula').addEventListener('click', inserirVirgula);

const mapaTeclado = {
    '0' : 'num0',
    '1' : 'num1',
    '2' : 'num2',
    '3' : 'num3',
    '4' : 'num4',
    '5' : 'num5',
    '6' : 'num6',
    '7' : 'num7',
    '8' : 'num8',
    '9' : 'num9',
    '/' : 'opDividir',
    '*' : 'opMultiplicar',
    '+' : 'opSomar',
    '-' : 'opDiminuir',
    '=' : 'igual',
    'Enter' : 'igual',
    'Backspace' : 'backspace',
    'c' : 'limparDisplay',
    'Escape' : 'limparCalculo',
    ',' : 'virgula'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
    console.log(tecla)
}
document.addEventListener('keydown', mapearTeclado);