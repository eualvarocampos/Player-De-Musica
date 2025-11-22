var musicas = [
    {titulo : 'Era eu', artista : 'CASA Workship' , src: 'musicas/eraeu.mp3', img : 'imagens/jesus.jpg'},
    {titulo : 'Eu te vejo em tudo', artista : 'CASA Workship' , src: 'musicas/eutevejoemtudo.mp3', img : 'imagens/only.jpg'}
]; 

var musica = document.querySelector('audio'); 

//Variáveis Globais
    var imagem = document.querySelector('img');
    var nomeMusica = document.querySelector('.descricao h2'); 
    var nomeArtista = document.querySelector('.descricao i'); 
    var duracaototal = document.querySelector('.fim');
    var indexMusica = 0;
    

    //Carregar a música inicial

    renderizarMusica(indexMusica);


//Eventos 
document.querySelector('.botao-play').addEventListener('click', tocarMusica); 
document.querySelector('.botao-pause').addEventListener('click', pausarMusica); 
musica.addEventListener('timeupdate', atualizarbarradeduracao);

//Eventos dos botões de avançar e voltar música
document.querySelector('.anterior').addEventListener('click', () => {
        indexMusica--;
        if (indexMusica < 0) {
            indexMusica = musicas.length -1;
        }
        renderizarMusica(indexMusica)
});
document.querySelector('.posterior').addEventListener('click', () => {   
        indexMusica++;
        if (indexMusica >= musicas.length) {
            indexMusica = 0; //volta para a primeira música
        }
        renderizarMusica(indexMusica)
}); 


//Funções
function renderizarMusica(index) {
    musica.src = musicas[index].src;
    musica.load();
    
    musica.onloadeddata = () => {
        nomeMusica.textContent = musicas [index].titulo;
        nomeArtista.textContent = musicas [index].artista
        imagem.src = musicas [index].img
        duracaototal.textContent = segundosParaMinutos (Math.floor (musica.duration));  
    };
    };
   
function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
     document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarbarradeduracao() {
    if (isNaN(musica.duration)) return;
    var barra = document.querySelector('.progress');
    barra.style.width = (musica.currentTime / musica.duration) * 100 + '%';
    var ponto = document.querySelector('.ponto');
    ponto.style.left = (musica.currentTime / musica.duration) * 100 + '%';
    var tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos (Math.floor (musica.currentTime)); 
}
function segundosParaMinutos(segundos) {
    var campoMinutos = Math.floor(segundos / 60); 
    var campoSegundos = segundos % 60; 
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos; 
    }
     return campoMinutos + ':' + campoSegundos; 
}

