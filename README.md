# Gerenciador de Canais — Aplicação Web Fullstack
<p align="center">

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
<img src="https://img.shields.io/badge/TypeORM-E83524?style=for-the-badge&logo=typeorm&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/PrimeReact-6366F1?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />

</p>

##  Sobre o Projeto

O **Gerenciador de Canais** é uma aplicação web desenvolvida na disciplina **Linguagem de Programação III**, com foco na construção de sistemas modernos utilizando arquitetura **SPA + API REST**.

O sistema permite o gerenciamento de canais digitais, usuários, membros e geradores de conteúdo, centralizando informações e facilitando o controle de atividades e compromissos.

A aplicação foi construída seguindo boas práticas de separação entre **front‑end** e **back‑end**, comunicação segura via API e persistência em banco de dados relacional.

---

##  Arquitetura do Sistema

```
React SPA (Front‑end)
          │
          ▼
     API REST (Node.js + Express)
          │
          ▼
        MySQL 8.0
```

* Comunicação via HTTP utilizando API REST
* Autenticação baseada em JWT
* Separação clara entre interface e regras de negócio

---

##  Tecnologias Utilizadas

###  Front‑end

* React JS (Single Page Application)
* JavaScript
* React Router DOM (gerenciamento de rotas)
* Axios (requisições HTTP)
* PrimeReact (componentes UI)
* PrimeFlex (layout responsivo)
* PrimeIcons (ícones)
* React Snap (pré‑renderização para SEO)

###  Back‑end

* Node.js
* Express
* TypeScript
* TypeORM (ORM)
* MySQL 8.0

###  Segurança

* JWT 
* Bcrypt 
* MD5 
* CORS 

###  Ferramentas de Desenvolvimento

* VSCode
* Yarn

---

##  Funcionalidades Principais

* Cadastro e autenticação de usuários
* Controle de membros de canais
* Gerenciamento de geradores de conteúdo
* Registro de compromissos
* Controle de permissões por perfil
* Comunicação segura entre cliente e servidor

---

##  Pré‑requisitos

Antes de executar o projeto, instale:

* Node.js 18+
* MySQL 8.0
* yarn

---

##  Variáveis de Ambiente

O projeto utiliza arquivos `.env` separados para front‑end e back‑end.

Utilize os arquivos de exemplo:

```
.env.example
```

Copie e configure:

```
cp .env.example .env
```

---

##  Instalação e Execução

###  Back‑end

```bash
cd back-end
yarn install
yarn start
```

O servidor iniciará a API REST.

---

###  Front‑end

```bash
cd front-end
yarn install
yarn start
```

A aplicação abrirá no navegador como SPA.

---

##  Contexto Acadêmico

Projeto desenvolvido para aplicação prática dos conceitos de:

* Arquitetura SPA
* APIs REST
* Desenvolvimento Fullstack
* Segurança em aplicações web
* Persistência com ORM
* Integração cliente‑servidor

---

##  Autor

**Adriel Rodrigues Louzano**<br>
Disciplina: Linguagem de Programação III<br>
Projeto acadêmico — 2025

---

##  Licença

Uso educacional e acadêmico.
