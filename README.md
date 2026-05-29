# OrbitStock — Site de Apresentação

Sistema inteligente de gerenciamento de carga espacial para a missão Dragon CRS-31 (cápsula C209).  
Desenvolvido como projeto da **Global Solution 2026 — FIAP MIAO**.

---

## Integrantes

| Nome Completo | RM |
|---|---|
| Gustavo Hiruo  | 567625 |
| Enrico Dellatorre  | 566824 |

---

## Páginas

| Página | Descrição |
|---|---|
| [O Problema](index.html) | Desafios da gestão de carga espacial sem sistema inteligente |
| [Tecnologia](tecnologia.html) | Arquitetura técnica: ESP32, FIWARE, React, Claude AI |
| [Objetivos](objetivos.html) | Metas, progresso de implementação e linha do tempo |
| [Benefícios](beneficios.html) | Impacto real: comparativo antes/depois e KPIs |
| [Aplicação](aplicacao.html) | Dia a dia da missão: personas, workflow e cenários de uso |

---

## Tecnologias Utilizadas

- HTML5 semântico + CSS3 + JavaScript puro (sem frameworks)
- Google Fonts: **Orbitron** (headings) + **Inter** (body)
- Layout com **Flexbox**
- **CSS Custom Properties** (variáveis)
- **Reset CSS** separado
- **Responsividade** completa: Desktop, Tablet e Mobile
- **Intersection Observer API** para animações no scroll
- **Canvas API** para campo de estrelas animado
- **requestAnimationFrame** para contadores e animações
- SVG inline para ícones e ilustrações

---

## Estrutura de Pastas

```
GS2-FRONTEND/
├── index.html          ← O Problema
├── tecnologia.html     ← Tecnologia
├── objetivos.html      ← Objetivos
├── beneficios.html     ← Benefícios
├── aplicacao.html      ← Aplicação
├── css/
│   ├── reset.css       ← Reset CSS
│   ├── variables.css   ← CSS Variables + Google Fonts
│   └── style.css       ← Estilos principais
├── js/
│   └── main.js         ← JavaScript (menu, animações, counters, tabs)
├── assets/
│   ├── icons/          ← SVG icons (satellite, chip, brain, chart, etc.)
│   └── images/         ← SVG images (logo, dragon capsule)
└── README.md
```

---

## Como Rodar Localmente

```bash
# Não requer instalação — abrir direto no navegador
# Recomendado: usar extensão Live Server no VS Code

# Ou servir com Python:
python -m http.server 8080

# Acessar em: http://localhost:8080
```

---

## Sobre o Projeto OrbitStock

O **OrbitStock** é o sistema fullstack de gerenciamento de carga espacial desenvolvido como  
Global Solution 2026 na FIAP. Combina:

- **IoT real-time** via ESP32 + FIWARE Orion (NGSIv2)
- **Dashboard de missão** em React 19 + TypeScript
- **IA preditiva** com Claude (Anthropic) para análise de telemetria
- **Interface de bordo** (AstronautApp) para gerenciamento de inventário

**Repositório do sistema fullstack:** `GS2-WEBFRONT`

---

*Global Solution 2026 · FIAP MIAO · © 2026 OrbitStock*
