import './style.css'
import _ from 'underscore';

let cartas = [];
let cartasJugador = [];
let puntajeJugador = 0;

const boton_juego = document.getElementById("boton_juegoNuevo");
const boton_pedir = document.getElementById("boton_Pedir");
const boton_parar = document.getElementById("boton_parar");
const jugador_div = document.getElementById("Jugador_Div");
const puntaje_span = document.getElementById("Puntaje");

const crearCartas = () => {
  const figuras = ['C','D','H','S'];
  const numeros = ['2','3','4','5','6','7','8','9','10','A','J','K','Q'];
  let nuevasCartas = [];
  figuras.forEach(f => {
    numeros.forEach(n => {
      nuevasCartas.push(`${n}${f}`);
    });
  });
  return _.shuffle(nuevasCartas);
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  if (isNaN(valor)) {
    return (valor === 'A') ? 11 : 10;
  }
  return parseInt(valor);
};

const crearCartaHtml = (carta) => {
  const imgCarta = document.createElement('img');
  imgCarta.src = `./assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  jugador_div.append(imgCarta);
};

const actualizarPuntaje = () => {
  puntaje_span.innerText = `Puntaje: ${puntajeJugador}`;
};

const inicializarJuego = () => {
  cartas = crearCartas();
  cartasJugador = [];
  puntajeJugador = 0;
  jugador_div.innerHTML = '';
  actualizarPuntaje();
  boton_pedir.disabled = false;
  boton_parar.disabled = false;
};

const pedirCarta = () => {
  if (cartas.length === 0) {
    alert('No hay más cartas');
    return;
  }
  const carta = cartas.pop();
  cartasJugador.push(carta);
  puntajeJugador += valorCarta(carta);
  crearCartaHtml(carta);
  actualizarPuntaje();
  if (puntajeJugador > 21) {
    alert('Te has pasado de 21');
    boton_pedir.disabled = true;
    boton_parar.disabled = true;
  }
};

boton_juego.addEventListener('click', inicializarJuego);
boton_pedir.addEventListener('click', pedirCarta);
boton_parar.addEventListener('click', () => {
  boton_pedir.disabled = true;
  boton_parar.disabled = true;
  alert(`Te plantaste con ${puntajeJugador} puntos`);
});

// Inicialización por defecto
inicializarJuego();