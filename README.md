# TFG_Pets
Sistema de gerenciamento de clínica veterinária

## Passo 1) Instalar as tecnologias (nas suas respectivas versões) necessárias para execução da aplicação na máquina local.
- Mysql: 8.0.39.0
- Java: 21.0.4
- Apache Maven: 3.9.9
- Node JS: 20.18.0
- Npm: 10.8.2
- Angular CLI: 18.2.8

## Passo 2) Baixe o repositório do github.
1. [TFG_Pets](https://github.com/AugustoMeine/TFG_Pets)

## Passo 3) Iniciar o front-end (angular)
1. Abra o terminal do sistema operacional e entre no diretório do git que foi clonado, posteriormente acesse o diretório `{incluir_o_caminho_do_repositório}\TFG_Pets\frontend\pets`.
2. Execute o seguinte comando no terminal: `npm install`.
3. Execute o seguinte comando no terminal: `ng serve`
4. Para visualizar a página, entre no navegador web e acesse o seguinte link: [http://localhost:4200/](http://localhost:4200/)
5. Observação: Ainda será necessário iniciar o banco de dados e o serviço do back-end para poder logar e acessar as funcionalidades.

## Passo 4) Iniciar o banco de dados (Mysql).
1. Após instalar o banco de dados na versão notificada, abra o terminal e entre no gerenciador do banco de dados digitando o seguinte comando e inserindo a senha definida na instalação: `mysql -u root -p`
2. Após a conexão com o banco de dados, siga com a sequência de instruções abaixo:
    1. `CREATE DATABASE PETS;`
    2. `USE PETS;`
    3. `CREATE USER 'pets'@'localhost' IDENTIFIED BY 'pets';`
    4. `GRANT ALL PRIVILEGES ON PETS.* TO 'pets'@'localhost';`
    5. `FLUSH PRIVILEGES;`
3. Após a criação do usuário será necessário criar as tabelas, para realizar a criação digite o seguinte comando: `SOURCE {incluir_o_caminho_do_repositório}\TFG_Pets\Banco De Dados\Banco.sql`

## Passo 5) Iniciar o back-end (Spring boot).
1. Para iniciar o back-end será necessário entrar no diretório `{incluir_o_caminho_do_repositório}\TFG_Pets\backend\pets`
2. Posteriormente executar o seguinte comando no terminal: `mvn spring-boot:run`
