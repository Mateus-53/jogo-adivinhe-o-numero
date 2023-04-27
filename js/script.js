let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let emojiReact = document.querySelector(".emojiReaction");
let container = document.querySelector(".container");
let palpites = document.querySelector(".palpites");
let ultimoResultado = document.querySelector(".ultimoResultado");
let baixoOuAlto = document.querySelector(".baixoOuAlto");
let envioPalpite = document.querySelector(".envioPalpite");
let campoPalpite = document.querySelector(".campoPalpite");
let contagemPalpites = 1;

function conferirValor() {
  if (campoPalpite.value == "") {
    ultimoResultado.textContent = "Digite algum valor!";
    ultimoResultado.style.backgroundColor = "#ffd700";
    ultimoResultado.style.color = "#000";
    container.style.border = "4px #ffd700 solid";
    emojiReact.innerHTML = "&#x270B;";
  } else {
    conferirPalpite();
  }
}

function conferirPalpite() {
  let palpiteUsuario = Number(campoPalpite.value);
  if (contagemPalpites === 1) {
    palpites.textContent = "Palpites anteriores: ";
  }

  palpites.textContent += `${palpiteUsuario} `;

  if (palpiteUsuario === numeroAleatorio) {
    ultimoResultado.textContent = "Parabéns! Você acertou!";
    ultimoResultado.style.backgroundColor = "green";
    ultimoResultado.style.color = "#fff";
    container.style.border = "4px green solid";
    emojiReact.innerHTML = "&#x1F604;";
    baixoOuAlto.textContent = "";
    configFimDeJogo();
  } else if (contagemPalpites === 10) {
    ultimoResultado.textContent = "Fim de jogo!";
    container.style.border = "4px red solid";
    emojiReact.innerHTML = "&#x1F614;";
    baixoOuAlto.textContent = "";
    configFimDeJogo();
  } else {
    ultimoResultado.textContent = "Errado!";
    ultimoResultado.style.backgroundColor = "red";
    ultimoResultado.style.color = "#fff";
    container.style.border = "4px red solid";
    emojiReact.innerHTML = "&#x1F630;";
    if (palpiteUsuario < numeroAleatorio) {
      baixoOuAlto.textContent = "Seu palpite está muito baixo!";
    } else if (palpiteUsuario > numeroAleatorio) {
      baixoOuAlto.textContent = "Seu palpite está muito alto!";
    }
  }

  contagemPalpites++;
  campoPalpite.value = "";
  campoPalpite.focus();
}

campoPalpite.addEventListener("keyup", function (e) {
  let key = e.which || e.keyCode;
  if (key == 13) {
    conferirValor();
  }
});

envioPalpite.addEventListener("click", conferirValor);

function configFimDeJogo() {
  campoPalpite.disabled = true;
  envioPalpite.disabled = true;
  botaoReinicio = document.querySelector(".reiniciarJogo");
  botaoReinicio.style.display = "flex";
  botaoReinicio.addEventListener("click", reiniciarJogo);
}

function reiniciarJogo() {
  contagemPalpites = 1;
  let reiniciarParas = document.querySelectorAll(".resultadoParas p");
  for (let i = 0; i < reiniciarParas.length; i++) {
    reiniciarParas[i].textContent = "";
  }

  botaoReinicio.style.display = "none";
  campoPalpite.disabled = false;
  envioPalpite.disabled = false;
  campoPalpite.value = "";
  campoPalpite.focus();
  ultimoResultado.style.backgroundColor = "transparent";
  container.style.border = "none";
  emojiReact.innerHTML = "&#x1F914;";
  numeroAleatorio = Math.floor(Math.random() * 100) + 1;
}
