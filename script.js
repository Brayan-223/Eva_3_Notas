// DOM elements
const form = document.getElementById('form-agregar');
const tituloInput = document.getElementById('titulo');
const descripcionInput = document.getElementById('descripcion');
const importanteInput = document.getElementById('importante');
const notasContainer = document.getElementById('notas-container');

// Load stored notes
document.addEventListener('DOMContentLoaded', cargarNotas);

// Handle form submit
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const titulo = tituloInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  const importante = importanteInput.checked;

  if (titulo && descripcion) {
    agregarNota(titulo, descripcion, importante);
    form.reset();
  } else {
    alert('Por favor, completa todos los campos.');
  }
});

function cargarNotas() {
  const notas = JSON.parse(localStorage.getItem('notas')) || [];
  notas.forEach(nota => {
    crearNotaElemento(nota.titulo, nota.descripcion, nota.importante);
  });
}

function agregarNota(titulo, descripcion, importante) {
  const nuevaNota = { titulo, descripcion, importante };
  const notas = JSON.parse(localStorage.getItem('notas')) || [];
  notas.push(nuevaNota);
  localStorage.setItem('notas', JSON.stringify(notas));
  crearNotaElemento(titulo, descripcion, importante);
}

function crearNotaElemento(titulo, descripcion, importante) {
  const notaDiv = document.createElement('div');
  notaDiv.classList.add('nota');
  notaDiv.classList.add(importante ? 'importante' : 'no-importante');

  // Asignar clase rotación aleatoria
  const rotacion = `nota${Math.floor(Math.random() * 8) + 1}`;
  notaDiv.classList.add(rotacion);

  notaDiv.innerHTML = `
    <h3>${titulo}</h3>
    <p>${descripcion}</p>
    <button class="btn-cerrar" onclick="eliminarNota(this)">X</button>
  `;

  notasContainer.appendChild(notaDiv);
}

function eliminarNota(boton) {
  const notaDiv = boton.parentElement;
  const titulo = notaDiv.querySelector('h3').textContent;
  const descripcion = notaDiv.querySelector('p').textContent;

  const notas = JSON.parse(localStorage.getItem('notas')) || [];
  const nuevasNotas = notas.filter(nota => !(nota.titulo === titulo && nota.descripcion === descripcion));
  localStorage.setItem('notas', JSON.stringify(nuevasNotas));

  notaDiv.remove();
}
