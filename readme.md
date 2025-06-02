# 🏋️ Academ.ia

**Academ.ia** é uma aplicação web interativa que gera **planilhas de treino personalizadas** com base nas respostas do usuário, utilizando inteligência artificial (Google Gemini API). O sistema foi desenvolvido com HTML, CSS e JavaScript puros e visa oferecer uma experiência personalizada para quem busca atingir objetivos de saúde, condicionamento ou performance física.

## 📌 Funcionalidades

- Formulário dinâmico de perguntas sobre perfil, objetivos e limitações do usuário.
- Geração de cronograma de treino adaptado via API da Gemini.
- Integração com YouTube para sugestões de músicas motivacionais.
- Página institucional com informações dos integrantes do projeto.

## 🎯 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Gemini API (requisição REST via `fetch`)
- YouTube Embed (para playlist musical)

## 🗂️ Estrutura do Projeto

```

academia/
├── index.html                # Página principal com o formulário
├── views/
│   ├── integrantes.html      # Página dos integrantes do projeto
│   └── playlist.html         # Página com sugestões musicais
├── style/
│   └── style.css             # Estilos globais
├── scripts/
│   ├── scripts.js            # Lógica do formulário e integração com Gemini
│   └── script\_playlist.js    # Lógica do carrossel de músicas
├── img/
│   ├── Academ\_ia.png         # Logo
│   ├── Cesar.jpg             # Foto do integrante
│   ├── Matheus.jpg           # Foto do integrante
│   └── Bruno.jpg             # Foto do integrante
└── README.md                 # Este arquivo

````

## ⚙️ Como Usar

1. Clone este repositório:
```bash
git clone https://github.com/bruno-leonardo25/academ.ia.git
````

2. Insira sua **chave de API Gemini** no arquivo `scripts.js`:

```js
const API_KEY = "SUA_CHAVE_AQUI";
```

3. Abra `index.html` em seu navegador.

4. Preencha o formulário e clique em **Gerar Planilha de Treino**.

5. O plano será exibido dinamicamente no final da página.

## 🔒 Requisitos

* Navegador moderno (Chrome, Firefox, Edge)
* Conexão com a internet
* Chave de API do [Google Cloud - Console de Credenciais API](https://console.cloud.google.com/apis/credentials)

## 👨‍💻 Autores

* **Cesar Leonardo** — [CMLeonardo](https://github.com/CMLeonardo)
* **Bruno Leonardo** — [bruno-leonardo25](https://github.com/bruno-leonardo25)
* **Matheus Ferreira** — [MatBr173](https://github.com/MatBr173)

## 📄 Licença

Este projeto é de uso educacional e experimental. Consulte os termos da Google AI para uso da API Gemini.

---

🎧 *"A motivação te traz aqui. O hábito te mantém."*

