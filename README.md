#  Landing Page — Dr. Otávio Messias | Fonoaudiologia Clínica & Ciência de Dados

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge)](#)

> Landing page institucional de alto padrão desenvolvida para o **Dr. Otávio Messias**, fonoaudiólogo clínico especialista em **TEA (Análise do Comportamento Aplicada - ABA)** e com formação avançada em **Ciência de Dados em Saúde pelo Hospital Sírio-Libanês**, atuante no **Espaço Evoluir** em Aracaju - SE.

---

##  Demonstração Visual

A interface foi projetada com base em princípios editoriais de alto rigor estético, combinando sofisticação, credibilidade científica e acolhimento humanizado.

- **Tipografia**: *Cormorant Garamond* (display editorial) combinada com *Jost* (corpo límpido e contemporâneo).
- **Paleta de Cores**: Tons nobres de verde-floresta/esmeralda clínico, bege perolado, dourado sutil e contrastes equilibrados com suporte a acessibilidade.
- **Interatividade**: Vídeos verticais integrados com controle de reprodução/volume síncrono e microinterações dinâmicas.

---

##  Principais Funcionalidades e Seções

1. **Abertura Cinematográfica (Curtain Intro)**: Animação refinada revelando a marca do especialista no carregamento inicial.
2. **Barra de Progresso de Leitura**: Indicador dinâmico no topo acompanhando a rolagem da página.
3. **Hero Section de Alto Impacto**:
   - Selo circular giratório interativo (*spin-badge*) com link direto para agendamento.
   - Tipografia fluida, chamada para ação (CTA) direta para o WhatsApp e badges de credibilidade (Sírio-Libanês, Prática Baseada em Evidências, Espaço Evoluir).
4. **Marquee Dinâmico**: Faixa em movimento contínuo destacando especialidades e áreas de domínio.
5. **Selos de Confiança (Trust Grid)**: Cartões em destaque evidenciando rigor metodológico, protocolos validados e transparência.
6. **Pilares do Método Clínico**: Estrutura detalhada do processo de intervenção (Avaliação Individualizada, Intervenção Lúdica & ABA, Monitoramento por Indicadores).
7. **Sobre o Especialista**: Trajetória do Dr. Otávio Messias, diferencial analítico com Ciência de Dados e atuação multidisciplinar.
8. **Especialidades Clínicas**:
   - Fonoaudiologia no TEA
   - Intervenção ABA Intensiva
   - Linguagem e Fala Infantil (Trocas de fonemas, atrasos, Apraxia de Fala)
   - Ciência de Dados Aplicada a Desfechos Clínicos
9. **Player de Vídeos Interativo (Reels)**:
   - Apresentação visual da clínica Espaço Evoluir.
   - Suporte a reprodução individual (pausa automática no vídeo concorrente ao dar play).
   - Controle dinâmico de volume e mute acessíveis.
10. **Estrutura Multidisciplinar**: Detalhamento da equipe complementar (Psicopedagogia, Nutrição e Acompanhantes Terapêuticos).
11. **Jornada de Acompanhamento (Passo a Passo)**: Da anamnese inicial à alta programada.
12. **FAQ Interativo (Accordion)**: Respostas imediatas para as dúvidas mais frequentes de pais e responsáveis.
13. **Rodapé Completo & Botão WhatsApp Flutuante**: Contatos, endereço da clínica, horário de atendimento e links diretos para conversão.

---

##  Tecnologias Utilizadas

- **HTML5 Semântico**: Estruturação com foco em acessibilidade (`aria-*`, semântica de seções, skip-links e tags nativas).
- **Vanilla CSS (CSS3 Moderno)**:
  - Custom Properties (Variáveis CSS) para todo o design system.
  - CSS Grid e Flexbox para layouts fluidos e responsivos.
  - Animações e transições em aceleração de hardware (`transform`, `opacity`).
- **JavaScript Vanilla**:
  - Intersection Observer API para animações no scroll (*reveal* suave).
  - Gerenciamento de eventos de mídia dos vídeos sem bibliotecas externas pesadas.
  - Controle de menu mobile e acordeão de dúvidas.
- **Ícones**: Sistema de sprites SVG inline otimizados para máxima performance de carregamento.

---

##  Estrutura de Arquivos

```plaintext
landpage-Otavio/
├── assets/
│   ├── images/              # Fotografias de alta resolução e banners clínicos
│   └── videos/              # Vídeos verticais dos atendimentos na Clínica Evoluir
├── css/
│   └── style.css            # Folha de estilos completa e responsiva
├── js/
│   └── main.js              # Lógica de interações, animações e mídia
├── .gitignore               # Arquivos e pastas ignorados pelo controle de versão
├── index.html               # Estrutura principal da Landing Page
└── README.md                # Documentação do projeto
```

---

##  Como Executar Localmente

Como o projeto foi desenvolvido com tecnologias web nativas (Vanilla), não há necessidade de etapas de compilação ou instalação de dependências:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/LuanCarlosDev/landingpage-Fono.git
   ```

2. **Acesse o diretório:**
   ```bash
   cd landingpage-Fono
   ```

3. **Abra o arquivo `index.html` em seu navegador:**
   - Dê um duplo clique no arquivo `index.html`, ou
   - Utilize a extensão **Live Server** no VS Code para hot-reload em tempo real, ou
   - Inicie um servidor local simples via terminal:
     ```bash
     # Usando Python
     python -m http.server 3000

     # Ou usando Node / npx
     npx serve .
     ```
   - Acesse `http://localhost:3000` no seu navegador.

---

## Performance e Boas Práticas

- **SEO Otimizado**: Meta tags Open Graph completas, tags canônicas, títulos descritivos e hierarquia semântica rigorosa (H1, H2, H3).
- **Carregamento Otimizado**: Imagens com atributos de dimensão e `loading="lazy"` para recursos fora da dobra inicial.
- **Acessibilidade**: Foco visível, navegação por teclado testada, suporte a contraste adequado e rótulos acessíveis em botões de ação e mídia.

---

## Autor

Desenvolvido por **[Luan Carlos](https://github.com/LuanCarlosDev)**.

Se você gostou deste projeto ou gostaria de trocar ideias sobre desenvolvimento web e interfaces de alta performance, sinta-se à vontade para se conectar!

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LuanCarlosDev)
