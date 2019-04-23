<p align="center">
<img style="-webkit-user-select: none;padding: 10px;" src="https://i.imgur.com/IYXy1ry.png" height="200">
</p>


## RocketSeat - OmniStack (RocketBox)
O RocketBox API é um dos projetos desenvolvidos no Workshop **Semana OmniStack 6.0** da *RocketSeat*. Esta API servirá como Backend para outras duas aplicações, um FrontEnd desenvolvido com ReactJS e uma aplicação Mobile, desenvolvida com ReactNative.

Todo o ecosistema desenvolvido neste Workshop, consiste em um exemplo de **disco virtual**, parecido com o conhecido *Dropbox*, sendo que numa versão bem mais simples, onde teremos basicamente somente duas entidades, **Boxes** e **Arquivos**. Os *Boxes* são as pastas/caixas aonde os arquivos serão arquivados/enviados, um Box pode ter vários *Arquivos* associados a ele.

O aplicativo mobile será desenvolvido em Javascript, usando o framework multiplataforma React Native, podendo assim disponibilizar aplicativos para as plataformas *IOS* e *ANDROID*.


## Tecnologias Envolvidas
- NodeJS;
- nodemon (desenvolvimento);
- Cors;
- dotenv;
- ExpressJS;
- Socket.io;
- MulterJS;
- Mongoose ORM;
- MongoDB;
- Yarn;
- Heroku.


## Funcionalidades
- Criação de Box;
- Visualização de Todos os Boxes;
- Visualização de um Box Específico;
- Criação e Envio de Files.


## Construção da API (rocketbox-api)
A API foi desenvolvida em Javascript (**nodejs**), e para facilitar o desenvolvimento e não exigir a instalação do MongoDB, no ambiente de desenvolvimento criamos um container docker **MongoDB** através do **docker-compose**.

Para automatizar o processo de inicialização do container MongoDB, criamos o script _'mongo-entrypoint/default-user.sh'_ que irá criar um usuário e uma base de dados padrão para usarmos no desenvolvimento. Este **shell script** é chamado através do script 'docker-compose.yml' onde definimos todas as configurações do container docker e passamos através de variáveis de ambiente os dados do usuário **Root** a ser incluido no MongoDB. Caso necessite adicionar outros usuários para se conectar ao banco de dados MongoDB ou até mesmo trocar as informações do usuário **Root**, primeiramente você precisará alterar os dados no script 'docker-compose.yml', mais precisamente na seção 'environment'. Abaixo podemos ver a seção mencionada destacada:

```
environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=123456
```

Em um segundo passo, você terá de alterar no script 'mongo-entrypoint/default-user.sh' a linha aonde definimos o usuário root (administrador) do banco de dados, assim como podemos verificar no trecho abaixo destacado: 

```
mongo --authenticationDatabase admin --host localhost -u root -p 123456 omnistack --eval ...
```
> Para configurar o ambiente do container colocando um usuário e senha de sua escolha, basta trocar respectivamente os termos `root` e `123456` da seção `enviroment` acima já representada, e repetir o mesmo procedimento na linha do script 'mongo-entrypoint/default-user.sh' também já apresentada logo acima. 

Caso deseje também alterar o usuário para conexão ao banco MongoDB, basta trocar respectivamente os termos `user` e `pwd` na mesma linha mencionada acima, no trecho com a sentença `db.createUser()`, logo após `--eval` conforme podemos visualizar logo abaixo. Na mesma linha, logo após o termo `db:` temos a definição da base de dados que utilizaremo no desenvolvimento da API, por padrão definimos ela como `omnistack`, caso deseje mudar o nome da base de dados você precisará alterar o termo `db:` também.

```
--eval "db.createUser({user: 'omnistack', pwd: 'omnistack', roles: [{role: 'readWrite', db: 'omnistack'}]}); db.createUser({user: 'admin', pwd: '654321', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
```

Caso deseje efetuar tais mudanças relatadas acima, você precisa ficar atento e também ajustar as informações contidas no arquivo `.env`, que em nosso repositório está representado pelo exemplo `.env.example`. Para isto, basta você copiar o arquivo `.env.example` para um novo arquivo com o nome de `.env` e edita-lo ajustando as devidas variáveis de ambiente. Abaixo podemos visualizar a seção responsável por estas configurações.

```
# MongoDB Variables for Connection
MONGODB_HOST=localhost
MONGODB_USER=omnistack
MONGODB_PASSWORD=omnistack
MONGODB_DATABASE=omnistack
```

> O arquivo `.env` é responsável por passar para nossa aplicação as informações de conexão com o banco de dados MongoDB. No cenário que criamos estamos utilizando este arquivo apenas no ambiente de desenvolvimento, mas o mesmo pode ser utilizado também em produção, porém por medida de segurança não deve ser acrescentado no versionamento do código.

> Como estamos usando como hospedagem de nosso código a plataforma do `heroku`, todas as variáveis de ambiente são definidas no `dashboard` da plataforma tornando desnecessário o uso do arquivo `.env`.


## Comandos
...


## Todo
...