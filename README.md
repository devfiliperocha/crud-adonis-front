# Crud Adonis Front

Fron-End em Vue para o CRUD Adonis

### Instalação

Para rodar o projeto é necessário o nodejs instalado, caso não o tenha, acesse o endereço abaixo para baixá-lo.

https://nodejs.org

Clone o repositório, entre na pasta, e baixe as dependências com o npm.

```sh
$ cd crud-adonis
$ npm install
```
ou com yarn se preferir.
```sh
$ yarn
```

Crie um arquivo config.json no diretório src/config da aplicação. 
Há um arquivo config.example.json lá com os dados necessários. Basta copiar o mesmo, renomear para config.json, e adicionar o endereço onde está rodando o CRUD ADONIS em API_URL, e a chave da API HERE MAPS em HERE_API_KEY.

Caso não tenha uma chave da API, basta entrar no endereço abaixo, criar uma conta gratuita e criar a API KEY;

https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account

Este projeto foi feito utilizando o @vue/cli. Caso não o tenha instalado globalmente, use o comando abaixo para instalar:
```sh
$ npm install -g @vue/cli
```
Com tudo instalado e configurado basta rodar o comando abaixo para iniciar a aplicação em modo dev:

```sh
$ npm run serve
```

Ou fazer o build do projeto:
```sh
$ npm run build
```



