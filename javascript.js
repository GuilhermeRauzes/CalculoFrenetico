var playing = false;
var score;
var action;
var timeremaining;
var x = 0;
var y = 0;
var correctAnswer = x*y;
var audio = new Audio('timer.mp3');
audio.volume = 0.5;
var gameOverAudio = new Audio('gameover.mp3')
gameOverAudio.volume = 0.1;
//se clicar no botão start/reset
document.getElementById("startReset").onclick = function(){
    
    //check se estamos jogando
    
    if(playing == true){
        
        location.reload(); //recarrega a page
        
    }else{//se nao estamos jogando
        
        //agora estamos jogando
        
        playing = true;
        
        //começa score com 0
        
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
     
        //mostrar o timer 
        
       show("timeRemaining");
        timeremaining = 15;
        document.getElementById("timeRemainingValue").innerHTML = timeremaining;
        
        //esconder o div de gameover
        
        hide("gameOver");
        
        //mudar o nome do botão pra reset game
        document.getElementById("startReset").innerHTML = "Reset Game";
        
        //para animação
        document.querySelector('h2').style.animation = 'pulseRotate 0.8s';
        setTimeout(function(){
           document.querySelector('h2').style.animation = 'none';  
        }, 500);
       
        //começar o timer
        
        startCountdown();
        
        //começa o tic tac
        audio.loop = true;
        audio.play();
        //gerar perguntas e respostas
        
        generateQA();
    }

for(i=1; i<5; i++){
    //Clicando em uma caixa de resposta
document.getElementById("box"+i).onclick = function(){
    //checar se estamos jogando
    if(playing == true){//se estamos jogando
        if(this.innerHTML == correctAnswer){
            //resposta certa
            score++;
            document.getElementById("scoreValue").innerHTML = score;
            //esconder a caixa de erro e mostrar a de acerto
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct")
            }, 600);
            
            //gerar respostas novamente
            setTimeout(function(){
                generateQA();
            }, 600);
        }else{
            //resposta errada
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong")
            }, 600);
        }
    }
}    
}
//funções

//começar timer
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeRemainingValue").innerHTML = timeremaining;
        if(timeremaining == 0){// game over
            stopCountdown();
            audio.pause();
            audio.currentTime = 0;
            gameOverAudio.play();
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Fim de jogo!</p><p>Sua pontuação foi " + score + ".</p>";   
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    }, 1000);    
}
//parar o timer

function stopCountdown(){
    clearInterval(action);   
}

//esconder um elemento

function hide(Id){
  document.getElementById(Id).style.display = "none";
}

//mostrar um elemento

function show(Id){
    document.getElementById(Id).style.display = "block";
}

//gerar questões e respostas
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+Math.round(3*Math.random());
    
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //colocar a resposta certa em uma respectiva caixa
    
    var answers = [correctAnswer];
    
    //colocar resposta errada nas outras
    for(i=1; i<5; i++){
        if(i !== correctPosition) {
            var wrongAnswer;
            do{ 
                wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random())); //resposta errada
            }while(answers.indexOf(wrongAnswer)>-1);
            
        document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
    }
}
