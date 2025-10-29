### Empresa ACTO - Desafio Técnico Fullstack Developer
Desafio
O desafio é criar uma aplicação web com foco em gestão de dados georreferenciados e exibição em mapa das camadas.
Utilizando Laravel no backend e ReactJS no frontend usando a biblioteca ArcGIS Maps SDK / Esri versão 4, para renderização do mapa.

```
• O sistema apresenta uma área de login autenticado para acesso ao painel administrativo.
• Backend em Laravel e frontend em ReactJS.
• O banco de dados utilizado foi o MySQL;
• O banco de dados deverá ser criado utilizando Migrations.
• Lógica de validação para garantir que apenas arquivos GeoJSON válidos sejam aceitos no upload.
```
#### Requisitos
```
• Versao do PHP: 8.2
• Versao do Laravel: 11.9
• Versao do ReactJS: 18.2
```
#### Configure o backend
```
• Clone o projeto
• composer install
• Configure o .env
• php artisan key:generate
• php artisan migrate
• php artisan storage:link
• php artisan serve
O backend estará disponível em http://localhost:8000
```
#### Configure o frontend
```
• npm install
• Configure o .env
• npm run dev
O frontend estará disponível em http://localhost:3000
```