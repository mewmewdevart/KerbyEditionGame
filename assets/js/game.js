/* 
                    ╔═╦═╗
                    ║║║║╠═╦╦╦╦══╦═╦╦╦╗
                    ║║║║║╩╣║║║║║║╩╣║║║
Developed By:       ╚╩═╩╩═╩══╩╩╩╩═╩══╝
*/

function start() { 

	$("#inicio").hide(); 
	
	$("#fundoGame").append("<div id='jogador' class='animationKerby'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='animationInimigo1'></div>");
	$("#fundoGame").append("<div id='inimigo2'class='animationInimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='animationAmigo' ></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //Principais variáveis do jogo 
    var jogo = {}
    var fimdejogo=false;

    var energiaAtual=3;
    var podeAtirar=true;
    var velocidade = 5;

    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var totalPtn = 0;
    var totalBonus = 0;

    var posicaoY = parseInt(Math.random() * 334);
	var TECLA = {
		W:87, 
		S:83, 
		A:65,
		D:68,
		SPACE:32
		}
    jogo.pressionou = [];

    //Sons do Jogo
    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    var somResgate=document.getElementById("somResgate");

    // Música de Fundo em Loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.volume = 0.1;
    somDisparo.volume = 0.2;
    somExplosao.volume = 0.2;
    somGameover.volume = 0.2;
    somPerdido.volume = 0.2;
    somResgate.volume = 0.2;
    musica.play();

    //Verifica se o usuário pressionou alguma tecla	ou não
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

    //Game Loop - Chamando a função a cada 30 milissegundos
    jogo.timer = setInterval(loop, 30);

    //Efeito Parallax no Background
	function movefundo() {
	
        esquerda = parseInt($("#fundoGame").css("background-position")); // ParseInt - Convert uma String em Inteiro.
        $("#fundoGame").css("background-position",esquerda-1);
        
    }  //Fim da função movefundo()

    //Função que movimenta o Kerby
    function movejogador(){
		if(jogo.pressionou[TECLA.W]){
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo -10);
			if(topo<=0){
				$("#jogador").css("top", topo +10);
			}
		}
		if(jogo.pressionou[TECLA.S]){
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo +10);
			if(topo>=460){
				$("#jogador").css("top", topo -10);
			}
		}
		if(jogo.pressionou[TECLA.D]){
			var left = parseInt($("#jogador").css("left"));
			$("#jogador").css("left", left +10);
			if(left>=910){
				$("#jogador").css("left", left -10);
			}
		}
		if(jogo.pressionou[TECLA.A]){
			var left = parseInt($("#jogador").css("left"));
			$("#jogador").css("left", left -10);
			if(left<=0){
				$("#jogador").css("left", left +10);
			}
		}
		if(jogo.pressionou[TECLA.SPACE]){
			disparo();
		}
	} //Fim da função movejogador()
    
    //Função que movimenta o inimigo para esquerda
    function moveinimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);
            
            if (posicaoX<=0) {
            energiaAtual--;
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
                
            }
    } //Fim da função moveinimigo1()

    //Função que movimenta o inimigo-terrestre : Caminhando para a esquerda
    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left",posicaoX-3);
                
        if (posicaoX<=0) {
        energiaAtual--;
        $("#inimigo2").css("left",775);
                    
        }
    }   // Fim da função moveinimigo2()

    //Função que movimenta o amigo-terrestre : Caminhando para a esquerda
    function moveamigo() {
	
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+5);
            if (posicaoX>906) {
            pontos=pontos-100; //Se o amigo encostar na parede direita perde 100 pontos
            perdidos++; //Se colidir, aumenta o numero de perdidos
            $("#amigo").css("left",0);
                        
            }
    
    }  // Fim da função moveamigo()

    function disparo() {
        
        if (podeAtirar==true)   {
        somDisparo.play();
        podeAtirar=false;
        
        topo = parseInt($("#jogador").css("top"));
        posicaoX= parseInt($("#jogador").css("left"));
        tiroX = posicaoX + 46;
        topoTiro=topo+15;
        $("#fundoGame").append("<div id='disparo'></div"); // Criando a div do disparo
        $("#disparo").css("top",topoTiro);
        $("#disparo").css("left",tiroX);
        
        var tempoDisparo=window.setInterval(executaDisparo, 15); //Executa o disparo a cada milisegundos
        } //Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); 
    
                if (posicaoX>850) { //Depois que o disparo caminhar por toda a tela, ele é removido
                            
                    window.clearInterval(tempoDisparo);
                    tempoDisparo=null;
                    $("#disparo").remove();
                    podeAtirar=true;
                       }
            } // Fecha executaDisparo()
    }// Fecha disparo()

    //Colisão puxada do Jquery Collision
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

        
            // jogador com o inimigo1
            if (colisao1.length>0) {
                energiaAtual--; //Se o jogador colidir no inimigo1 ele perde energia
                inimigo1X = parseInt($("#inimigo1").css("left"));
                inimigo1Y = parseInt($("#inimigo1").css("top"));
                explosao1(inimigo1X,inimigo1Y);
            
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",694);
                $("#inimigo1").css("top",posicaoY);
            }

            // jogador com o inimigo2 
            if (colisao2.length>0) {
                energiaAtual--;
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                explosao2(inimigo2X,inimigo2Y);
                        
                $("#inimigo2").remove();
                reposicionaInimigo2();
                    
                }	
        
        // Disparo com o inimigo1
            if (colisao3.length>0) {
                velocidade=velocidade+0.2; //Aumentar a velocidade do jogo 
                pontos=pontos+50; //Quantidade de pontos ganhos por acertar o inimigo1
                inimigo1X = parseInt($("#inimigo1").css("left"));
                inimigo1Y = parseInt($("#inimigo1").css("top"));
                    
                explosao1(inimigo1X,inimigo1Y);
                $("#disparo").css("left",950);
                    
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",694);
                $("#inimigo1").css("top",posicaoY);
                    
                } //Disparo com o inimigo1

            // Disparo com o inimigo2
            if (colisao4.length>0) {
                 pontos=pontos+20; //20 de pontos por acertar o inimigo2

                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                $("#inimigo2").remove();
            
                explosao2(inimigo2X,inimigo2Y);
                $("#disparo").css("left",950);
                
                reposicionaInimigo2();
                    
                }
            
            // Jogador colide com o amigo/aliado para salvar 
            if (colisao5.length>0) {
                salvos++; //Pontua no Status de Salvos
                energiaAtual++; //Se salvar o aliado, ganha +1 estrela
                somResgate.play();

                amigoX = parseInt($("#amigo").css("left"));
                amigoY = parseInt($("#amigo").css("top"));
                $("#amigo").remove();

                explosao3(amigoX,amigoY);

                reposicionaAmigo();
                
                }

            //Amigo colide com o inimigo2
            if (colisao6.length>0) {
                pontos=pontos-100; //Perde 100 pontos nos pontos atuais
                perdidos++; //Se colidir, aumenta o numero de perdidos

                amigoX = parseInt($("#amigo").css("left"));
                amigoY = parseInt($("#amigo").css("top"));

                explosao4(amigoX,amigoY);
                $("#amigo").remove();
                        
                reposicionaAmigo();
                
                }
        } //Fim da função colisao()

    //Explosão 1 : Ao colidir com o inimigo 1
    function explosao1(inimigo1X,inimigo1Y) {
        somExplosao.play();

        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(assets/image/explosao.png)");
        var div=$("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:134, opacity:0}, "slow");
        
        var tempoExplosao=window.setInterval(removeExplosao, 400);
        
            function removeExplosao() {
                
                div.remove();
                window.clearInterval(tempoExplosao);
                tempoExplosao=null;
                
            }
        } // Fim da função explosao1()

    //Explosão2 : Quando o Jogador colide com inimigo2
	function explosao2(inimigo2X,inimigo2Y) {
        somExplosao.play();

        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(assets/image/explosao.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:134, opacity:0}, "slow");
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 400);
        
            function removeExplosao2() {
                
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2=null;
                
            }
        } // Fim da função explosao2()

    //Reposiciona Inimigo2
    function reposicionaInimigo2() {
        
        var tempoColisao4=window.setInterval(reposiciona4, 5000);
            
            function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
                if (fimdejogo==false) {
                
                $("#fundoGame").append("<div id=inimigo2></div");
                
                } 
            }	
        }	// ReposicionaInimigo2()


    //Explosão3 : Amigo é resgatado pelo aliado
    function explosao3(amigoX,amigoY) {

        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);

        var tempoExplosao3=window.setInterval(resetaExplosao3, 400);

        function resetaExplosao3() {
        $("#explosao3").remove();
        window.clearInterval(tempoExplosao3);
        tempoExplosao3=null;     
            }
        } // Fim da função explosao3

    //Explosão4 : Amigo colidindo com os inimigos
    function explosao4(amigoX,amigoY) {
        somPerdido.play();

        $("#fundoGame").append("<div id='explosao4' class='anima5'></div");
        $("#explosao4").css("top",amigoY);
        $("#explosao4").css("left",amigoX);
    
        var tempoExplosao4=window.setInterval(resetaExplosao4, 400);
    
        function resetaExplosao4() {
        $("#explosao4").remove();
        window.clearInterval(tempoExplosao4);
        tempoExplosao4=null;     
                }
        } // Fim da função explosao3

    //Reposiciona o Amigo
	function reposicionaAmigo() {
	
        var tempoAmigo=window.setInterval(reposiciona6, 6000);
        
            function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) {
            
            $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            
            } 
        }
    }// Fim da reposicionaAmigo()

    function placar() {
        
        $("#placar").html("<h2> Pontos: " + pontos + " | Salvos: " + salvos + " | Perdidos: " + perdidos + "</h2>");
            
    } // Fim da função placar()


    //Barra de energia
    function energia() {
        
        if (energiaAtual==3) {
            
            $("#energia").css("background-image", "url(assets/image/energia3.png)");
        }

        if (energiaAtual==2) {
            
            $("#energia").css("background-image", "url(assets/image/energia2.png)");
        }

        if (energiaAtual==1) {
            
            $("#energia").css("background-image", "url(assets/image/energia1.png)");
        }

        if (energiaAtual==0) {
            
            $("#energia").css("background-image", "url(assets/image/energia0.png)");
            
            //Game Over
            gameOver();
        }
        if (pontos < 0)
    {
        gameOver();
    }
    }// Fim da função energia()


    //Função GAME OVER
    function gameOver() {
        fimdejogo=true;
        musica.pause();
        somGameover.play();
        
        window.clearInterval(jogo.timer);
        jogo.timer=null;
        
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
        
        $("#fundoGame").append("<div id='fim'></div>");

        //Bonus na pontuação : Só surge após 5x ptn aliado ser coletado
        if (salvos >= 5) {
            totalBonus = salvos * salvos;
            totalPtn = totalBonus + pontos + salvos - perdidos;

            $("#fim").html("<h1> Game Over </h1><p>Pontos Adquiridos : " + pontos + "<br> Aliados resgatados: " + salvos + "<br> Parabéns pelo bônus : " + totalBonus + "<br> Aliados perdidos: " + perdidos + "<br>------------------<br>" + "A sua pontuação total é : " + totalPtn + " </p> " + "<div id='reinicia' onClick=reiniciaJogo()><h3></h3></div>");
        }
        
        //Pontuação Normal
        totalPtn = pontos + salvos - perdidos;
        if (totalPtn < 0){
            $("#fim").html("<h1> GAME OVER </h1><div id='reinicia' onClick=reiniciaJogo()><h3></h3></div>"); 
        }else{ 
            $("#fim").html("<h1> GAME OVER </h1><p>Pontos Adquiridos : " + pontos + "<br> Aliados resgatados: " + salvos + "<br> Aliados perdidos: " + perdidos + "<br>------------------<br>" + " A sua pontuação total é : " + totalPtn + " </p>" + "</div><div id='reinicia' onClick=reiniciaJogo()><h3></h3></div>"); 
        }
    }
        /* 
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
        } // Fim da função gameOver();
        
        $("#fim").html("<h1> GAME OVER </h1> <p> Pontos Adquiridos : " + pontos + " | Aliados resgatados: " + salvos + " | Aliados perdidos: " + perdidos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>"); */



    //Loop do Jogo
    function loop() {
        movefundo();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
        placar();
        energia();
    
    } //Fim da função loop()
}//Fim da Função start

//Reinicia o Jogo
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} //Fim da função reiniciaJogo