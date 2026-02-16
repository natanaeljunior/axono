# Axono — Acompanhamento de Telas

Checklist das telas do sistema por persona. Use para acompanhar o que já foi implementado e o que falta.

**Perfil temporário:** no header do dashboard há um seletor **"Perfil temporário"** (Coordenação | Aluno | Preceptor). Troque para acessar o menu e as telas de cada persona sem fazer logout.

**Legenda:** `[x]` = implementado | `[ ]` = pendente

---

## 1. Fluxo público (todas as personas)

| Check | Rota | Tela (componente) | Observação |
|-------|------|-------------------|------------|
| [x] | `/login` | Login | Portal do Internato |
| [x] | `/esqueci-senha` | ForgotPassword | Recuperação de senha |
| [x] | `/primeiro-acesso` | FirstAccess | Configuração de primeiro acesso |

---

## 2. Persona: Aluno

| Check | Rota | Tela (componente) | Menu (doc) |
|-------|------|-------------------|------------|
| [x] | `/dashboard` (início aluno) | StudentHome | Início (resumo: grupo, rotação, hospital, presença do mês). Use o seletor "Perfil temporário" no header. |
| [x] | `/dashboard/formulario-diario` | StudentDailyForm | Formulário diário |
| [ ] | — | — | Minhas rotações (parcialmente em Relatórios e Certificação) |
| [ ] | — | — | Minha presença (histórico de dias confirmados pelo preceptor) |
| [x] | `/dashboard/certificacao` | StudentReportsCertification | Relatórios e Certificação (progresso, PDF, rotações, assinaturas) |

**Resumo Aluno:** 2 de 5 itens de menu implementados (Formulário diário, Relatórios e Certificação).

---

## 3. Persona: Preceptor

| Check | Rota | Tela (componente) | Menu (doc) |
|-------|------|-------------------|------------|
| [x] | `/dashboard` (início preceptor) | PreceptorHome | Início (meu grupo, rotação e hospital atuais). Use o seletor "Perfil temporário" no header. |
| [x] | `/dashboard/validar-presencas` | PreceptorValidate | Confirmar presenças |
| [ ] | — | — | Meu grupo (10 alunos, presença acumulada, carga por rotação) |
| [ ] | — | — | Histórico (presenças já confirmadas) |

**Resumo Preceptor:** 1 de 4 itens de menu implementados (Validar presenças).

---

## 4. Persona: Coordenação do 6º ano

| Check | Rota | Tela (componente) | Menu (doc) |
|-------|------|-------------------|------------|
| [x] | `/dashboard` | DashboardHome | Dashboard |
| [x] | `/dashboard/alunos` | Students | Alunos |
| [x] | `/dashboard/grupos` | Groups | Grupos |
| [x] | `/dashboard/preceptores` | Preceptors | Preceptores |
| [x] | `/dashboard/hospitais` | Hospitals | Hospitais |
| [x] | `/dashboard/rotacoes` | Rotations | Rotações |
| [x] | `/dashboard/relatorios` | Reports | Relatórios |

**Resumo Coordenação:** 7 de 7 implementados.

---

## 5. Persona: Diretor acadêmico / Decano

Inclui todas as telas da Coordenação mais:

| Check | Rota | Tela (componente) | Menu (doc) |
|-------|------|-------------------|------------|
| [x] | `/dashboard/parametros` | Parameters | Parâmetros |

**Resumo Diretor:** 8 de 8 implementados.

---

## 6. Resumo geral

| Persona | Implementadas | Faltando | Total |
|---------|---------------|----------|-------|
| Fluxo público | 3 | 0 | 3 |
| Aluno | 2 | 2 (+ 2 parciais) | 5 |
| Preceptor | 1 | 3 | 4 |
| Coordenação | 7 | 0 | 7 |
| Diretor | 8 | 0 | 8 |

**Total de telas implementadas (excl. duplicadas):** 14.  
**Total de telas faltantes (Aluno + Preceptor):** 5.

---

*Atualizado conforme `docs/PROJETO-E-PERSONAS.md` e código em `src/pages/` e `src/App.jsx`.*
