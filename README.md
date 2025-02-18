
# LOCAR FILMS [Front-end]

### Projeto publicado: https://locarfilms.levisonjr-app.site

Como complemento aos meus estudos no backend, comecei a estudar Angular para criar o frontend do meu projeto pessoal sobre uma locadora, o Locar Films.

O backend foi feito com C#|.NET. Para mais detalhes, veja o repositório [aqui no GitHub](https://github.com/Levison-Jr/locarfilms-backend).

Agora sobre esta parte, o client-side, deixo um pouco mais sobre abaixo.

# 📋 O projeto

Atualmente, está consumindo a Web API para apresentar funcionalidades como:

- Cadastro de usuários;
- Login (Autenticação e autorização com JWT);
- Exposição dos filmes disponíveis no catálogo;
- Página com detalhes do filme selecionado, como sinopse e trailer, sendo possível alugar o filme;
- Página com os filmes atualmente alugados do usuário autenticado;
- Página para visualizar e editar informações do usuário autenticado.

# ⚙️Tecnologias utilizadas

- JavaScript / TypeScript
- HTML e SCSS
- [Angular v18.2.0](https://v18.angular.dev/)

# 📌 Pontos abordados

- Rotas verificadas com [**CanActivate | AuthGuard**](https://angular.dev/api/router/CanActivate) para garantir acesso somente após autenticação;
- Uso de **DTOs e Enums** para melhor lidar com o corpo de requisições e repostas;
- Utilização de [**Signals**](https://angular.dev/guide/signals) quando foi necessário "rastrear" mudanças em determinado componente para tomar ações necessárias;
- Diretiva [**NgOptmizeImage**](https://vidafullstack.com.br/angular/ngoptimizedimage-otimizacao-de-imagem-com-angular/) para otimização das imagens;
- **HttpClient** em requisições para a API.
- [**Pipes**](https://angular.dev/guide/templates/pipes) para lidar com o tratamento de um recurso antes de ser utilizado dinamicamente (Exemplo: *SafeResourceUrl:* Tratamento de Url).
