# VLCovid
Backend Challenge 🏅 2022 - Covid Daily Cases
```
This is a challenge by Coodesh
```

Projeto de back-end para obter dados dos datasets do kaggle.com sobre casos de Covid-19 e retorná-los como endpoints de uma API.

## Linguagens e Frameworks:
- Javascript
- Node.js
- PostgreSQL
- Knex
- Express
- Heroku

# Instalação


## Local
- Instalar Dependências:
```
npm install
```
- criar arquivo ``.env`` com as variáveis de ambiente com dados relacionadso à instalação local do postgreSQL
```
LOCAL_USER = USUARIO_valido_no_BC_postgre_local
LOCAL_PASSWORD = PASSWORD_do_usuario
LOCAL_DATABASE = BD_no_qual_o_usuario_tem_acesso
```

- Fazer o migrate do knex e rodar o script para carregar os dados do arquivo CSV no banco de dados
```
run npx knex migrate:latest
run npm dbstart

```
- Após os upload dos dados iniciar o servidor com o comando:
```
npm run server
```

## Heroku
- Preparar ambiente instalando o [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) no ambiente 
-Preparar variáveis de ambiente:
    - manter sem modificações: ``DATABASE_URL``
    - adicionar:
    ```
        - DB_ENVIRONMENT=production
        - NODE_OPTIONS=--max_old_space_size=2560
        - PGSSLMODE=no-verify
        - TZ=America/Sao_Paulo
    ```

- Clonar diretório este diretório GIT
- Nas opções do Heroku Deploy -> Deploy Method logar no github, conectar a pasta clonada
- FAZER DEPLOY da pasta após a conexão (necessário para as próximas etapas) no CONSOLE do Heroku (no site ou instalado localmente):
    - fazer o migrate do knex e rodar o script para carregar os dados do arquivo CSV no banco de dados
```
heroku run npx knex migrate:latest -a nomedoappnoheroku
heroku run npm dbstart

```

# Exemplo online:
É possível acessar o projeto rodando online através do link:

https://vlcovid.herokuapp.com/

Para prosseguir com testes é possível acessar os end-points através dos seguinets links:
Para obter as datas disponíveis no dataset:

https://vlcovid.herokuapp.com/dates

Obtendo acima a lista de datas, pode-se utilizar as datas, copiando elas no formato original ou utilizando o formato 'YYYY-MM-DD'. Alguns exemplos abaixo:

_*ambos formatos irão funcionar para a requisição:_

https://vlcovid.herokuapp.com/cases/2022-01-04T03:00:00.000Z/count
https://vlcovid.herokuapp.com/cases/2022-01-04/count

https://vlcovid.herokuapp.com/cases/2021-12-26T03:00:00.000Z/cumulative
https://vlcovid.herokuapp.com/cases/2021-12-26/cumulative



```
This is a challenge by Coodesh
```