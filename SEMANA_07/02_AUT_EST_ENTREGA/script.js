async function pega_personalidade(){

    const xml = new XMLHttpRequest();

    xml.open("GET", "http://127.0.0.1:3000/listapersonalidade", true); // abrir a requisição, definir o método e se é assíncrona
    xml.onreadystatechange = function(){  //receber respota do servidor
        if(xml.readyState == 4 && xml.status == 200){ // requisição bem feita = 200
            var resposta = JSON.parse(this.responseText);
            for(i = 0; i<resposta.length; i++){
                const personalidade = document.createElement("li");
                personalidade.innerHTML = resposta[i].nome;

                document.getElementById("lista_personalidade").appendChild(personalidade);
            }
        }
    }
    xml.send();
};

async function adicionar_personalidade(){
    let personalidade = document.getElementById("personalidade").value;
    const data = {
        nome:personalidade //o atributo nome vai ter a característica personalidade
    };
    const json = JSON.stringify(data); 
    const xml = new XMLHttpRequest();

    xml.open("POST", "http://127.0.0.1:3000/inserepersonalidade", true);

    xml.setRequestHeader("Content-Type", "application/json");

    xml.onreadystatechange = function(){  //receber respota do servidor
        if(xml.readyState == 4 && xml.status == 200){ // requisição bem feita = 200
            
        }
    }
    xml.send(json);
};

async function pega_habilidade(){

    const xml = new XMLHttpRequest();

    xml.open("GET", "http://127.0.0.1:3000/listahabilidades", true); // abrir a requisição, definir o método e se é assíncrona
    xml.onreadystatechange = function(){  //receber respota do servidor
        if(xml.readyState == 4 && xml.status == 200){ // requisição bem feita = 200
            var resposta = JSON.parse(xml.responseText);
            console.log(resposta);
            for(i = 0; i<resposta.length; i++){
                const habilidade = document.createElement("li");
                habilidade.innerHTML = resposta[i].nome;

                document.getElementById("lista_habilidades").appendChild(habilidade);
            }
        }
    }
    xml.send();
};

async function adicionar_habilidade(){
    let habilidade = document.getElementById("habilidades").value;
    const data = {
        nome:habilidade //o atributo nome vai ter a característica personalidade
    };
    const json = JSON.stringify(data); 
    const xml = new XMLHttpRequest();

    xml.open("POST", "http://127.0.0.1:3000/inserehabilidades", true);

    xml.setRequestHeader("Content-Type", "application/json");

    xml.onreadystatechange = function(){  //receber respota do servidor
        if(xml.readyState == 4 && xml.status == 200){ // requisição bem feita = 200
            
        }
    }
    xml.send(json);
};