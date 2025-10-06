##  Tecnologias Utilizadas

###  Backend
- **.NET 8 / ASP.NET Core Web API**
- **Entity Framework Core**
- **PostgreSQL**
- **C#**

###  Frontend
- **Angular 17**
- **TypeScript**
- **HTML / SCSS**

---

##  Funcionalidades Principais

- **Gerenciamento de Sessões**
  - Criar, editar e excluir sessões de cinema
  - Definição de salas e capacidades automáticas
- **Listagem de Sessões Disponíveis**
  - Exibe sessões ativas e informações principais
- **Reserva de Assentos**
  - Interface visual com assentos disponíveis e reservados
  - Atualização dinâmica da ocupação
- **Controle de Status**
  - Sessões podem ser “Disponível”, “Cancelada”, “Em Andamento” ou “Finalizada”

---

##  Banco de Dados (PostgreSQL)

O script para criação das tabelas está em:  
`backend/database.sql`

Execute no **pgAdmin** ou via terminal:

```bash
psql -U postgres -d cinema -f backend/database.sql
```
## Como Rodar o Projeto
### 1. Clonar o Repositório
```bash
git clone https://github.com/matheusarruda3/GerenciamentoCinema.git
cd GerenciamentoCinema
```
### 2. Configurar o Banco de Dados
Crie um banco no PostgreSQL chamado cinema e execute o script:
```bash
psql -U postgres -d cinema -f backend/database.sql
```
Depois, configure a conexão no `backend/appsettings.json`:
```bash
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=cinema;Username=postgres;Password=sua_senha"
}
```
### 3. Rodar o Backend
No diretório `backend/`:
```bash
dotnet restore
dotnet run
```
A API será executada em:
http://localhost:5200 
### 4. Rodar o Frontend
No diretório `frontend/`:
```bash
npm install
ng serve
```
A aplicação será executada em:
http://localhost:4200 












