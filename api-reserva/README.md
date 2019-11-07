
# Configurando API (Laravel)

###### Documentação do Framework: [Requisitos](https://laravel.com/docs/6.x#server-requirements)

Após clonar todo o projeto, e verificar os requisitos do sistema, para que rode perfeitamente, você terá o sistema dividido em duas pastas (api e frontend). Configure a api da seguinte forma:

1. Abra o terminal na pasta raíz do projeto api-reserva, e com o composer e PHP previamente instalados, execute o comando para instalar todas as dependências do projeto: 
    > composer install
    
2. Com tudo devidamente instalado, apenas execute o comando para rodar o servidor PHP do Laravel:
    > php artisan serve
    
A api está sendo conectada a base de dados não relacional Firebase. Dentro da pasata App do projeto, tem a pasta Services onde pode ser encontrado uma Classe base para Crud, onde é utilizada por cada Controller; e a pasta secret, onde tem um json com todas as informações de acesso para sua base Firebase. Mas **ATENÇÃO**, não é recomendado expor esta pasta (secret), por questões de segurança da sua aplicação. Aqui foi exposta para fins didáticos, para utilização mais rápida, utilizando uma conta teste. Mas você deve configurar a sua conta Firebase e criar sua database. [Firebase - Começando](https://firebase.google.com/?hl=pt-BR).
