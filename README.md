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
