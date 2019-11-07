# Configurando Frontend (Angular)

###### Documentação: [Requisitos](https://angular.io/guide/setup-local#prerequisites)

Após clonar todo o projeto, e verificar os requisitos do sistema, para que rode perfeitamente, configure o frontend da seguinte forma:

1. Abra o terminal na pasta raíz do projeto front-reserva, e com o Node e Angular CLI devidamente instalado, execute o comando para instalar todas as dependências do projeto: 
    > npm install
    
2. Com tudo devidamente instalado, apenas execute o comando para rodar o projeto:
    > npm start
    
O projeto irá rodar no endereço padrão: localhost:4200. Acesse nesse endereço, e utilize o projeto. Na caminho src/app/service, está configurada o endereço local onde sua API já eve está rodando [api-reserva](https://github.com/bpereiraalmeida7/reserva-sala-reuniao/blob/master/api-reserva/README.md), caso precise mudar, poderá faze-lo modificando o valor inputado na variável "baseUri". Com isso, tudo pronto para o frontend se "comunicar" com o backend, e retornar os dados necessários.
