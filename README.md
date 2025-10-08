## ⚙️ Painel Administrativo Inteligente e Intuitivo

**Desenvolvido em Next.js 15 com TypeScript e SSR**

O **Painel Admin** foi projetado para oferecer uma visão completa e em tempo real de toda a operação da plataforma.
Com uma interface moderna, responsiva e focada na produtividade, ele permite que administradores **gerenciem produtos, categorias, carrinhos e métricas financeiras** de forma simples e segura.

---

### 🏠 Dashboard (Home)

A tela inicial centraliza as principais informações e indicadores do sistema, oferecendo **insights rápidos e precisos**.

* **Listagem de Documentos e Categorias:** visualização geral do catálogo disponível.
* **Receita Total:** exibe o faturamento acumulado.
* **Produtos Recentes:** acompanha os últimos itens adicionados.
* **Monitoramento de Carrinhos:** métricas organizadas por status — *convertidos, abandonados, finalizados e em processo*.

> Essa visão geral permite ao administrador **avaliar o desempenho comercial** e **identificar gargalos de conversão** com rapidez.

---

### 📦 Tela de Produtos

A página de produtos foi projetada para **controle total do catálogo** e acompanhamento de desempenho individual.

* **Listagem Detalhada:** exibe todos os produtos em uma tabela dinâmica com dados essenciais.
* **Visualização de Views:** acompanhamento de visualizações de cada produto, facilitando a criação de campanhas direcionadas.
* **Filtros Avançados:** busca por nome e categoria para localização rápida.
* **Ações Diretas:** edição rápida, exclusão e botão de **criação de novo produto**.

---

### ➕ Criação e Edição de Produtos

O formulário de produtos foi pensado para garantir **flexibilidade e consistência** no cadastro e atualização de itens.

Campos disponíveis:

* Nome
* Preço
* Tipo de venda (*finalizado* ou *sob encomenda*)
* Categoria
* Destacar (para produtos em destaque)
* Descrição
* Upload de imagens e documentos

> Todos os campos podem ser **editados ou criados do zero**, com validações automáticas e feedback visual.

---

### 🗂️ Gerenciamento de Categorias

A área de categorias permite uma **organização clara e escalável** dos produtos.

* Criação e edição de categorias diretamente na interface.
* Campos: **Nome** e **Descrição**, com explicações intuitivas sobre o uso de cada um.
* Permite reorganização fácil do catálogo, mantendo a experiência de navegação coerente no frontend.

---

### 🛒 Sistema de Carrinhos

A tela de carrinhos oferece um **monitoramento completo do fluxo de compras**, auxiliando nas decisões estratégicas.

* Acompanhamento em tempo real dos carrinhos **em andamento, finalizados ou abandonados**.
* Permite **analisar comportamento de compra** e planejar ações de recuperação de carrinhos.
* Métricas claras e filtragem por status.

---

### 🚪 Sair com Segurança

Inclui **botão de logout** que encerra a sessão de forma segura, limpando dados sensíveis e garantindo conformidade com as práticas de autenticação via NextAuth.

---

### 🧩 Integração e Performance

O painel é integrado à API em NestJS via JWT e comunicações seguras, utilizando SSR para renderização rápida e eficiente.
Toda a estrutura foi construída para garantir **desempenho, segurança e facilidade de manutenção**.

---

### 🚀 Resumo Técnico

> * **Framework:** Next.js 15 + TypeScript
> * **Autenticação:** NextAuth com JWT
> * **Arquitetura:** modular e desacoplada, seguindo princípios SOLID
> * **Recursos:** SSR, filtros dinâmicos, CRUD de produtos e categorias, monitoramento de carrinhos e painel financeiro

O Painel Admin entrega uma solução **completa e profissional** para gestão da plataforma digital, combinando **usabilidade, robustez e métricas em tempo real**.
