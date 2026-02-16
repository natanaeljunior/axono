# Axono — Base do Projeto e Personas

Documento de referência do projeto **Axono** (Portal do Internato), reunindo visão geral do sistema, stack técnico, estrutura de telas e **personas** (perfis) com seus menus, baseado na documentação de negócio e no código atual.

---

## 1. Visão geral do projeto

| Item | Descrição |
|------|-----------|
| **Nome** | Axono |
| **Objetivo** | Portal de gestão acadêmica do internato médico (6º ano): presenças, rotações, grupos, preceptores, hospitais e relatórios. |
| **Público** | Alunos do 6º ano, preceptores, coordenação do 6º ano e direção acadêmica. |
| **Idiomas** | pt-BR (padrão), es (espanhol) via i18next. |

---

## 2. Stack técnico

| Tecnologia | Uso |
|------------|-----|
| **React 18** | UI e componentes. |
| **Vite 6** | Build e dev server. |
| **React Router DOM 7** | Rotas e navegação. |
| **i18next + react-i18next** | Internacionalização (pt-BR, es). |
| **CSS** | Estilos em `Dashboard.css`, `Login.css`, `FirstAccess.css`, `ForgotPassword.css`, `theme.css`, `index.css`. |

**Estrutura principal:**

- `src/App.jsx` — Rotas globais (login, esqueci-senha, primeiro-acesso, dashboard e subrotas).
- `src/main.jsx` — Entrada da app (StrictMode, BrowserRouter, i18n).
- `src/layouts/DashboardLayout.jsx` — Layout do dashboard (sidebar, header, Outlet).
- `src/pages/*` — Telas (Login, ForgotPassword, FirstAccess, DashboardHome, Students, Groups, Rotations, Preceptors, Hospitals, Parameters, Reports).
- `src/locales/pt-BR.json` e `es.json` — Textos por idioma.
- `src/i18n.js` — Configuração do i18next.

---

## 3. Rotas e telas implementadas

### 3.1 Públicas (fora do dashboard)

| Rota | Tela | Descrição |
|------|------|-----------|
| `/` | Redirect | Redireciona para `/login`. |
| `/login` | Login | Portal do Internato, e-mail/matrícula/CRM, senha. |
| `/esqueci-senha` | ForgotPassword | Recuperação de senha por e-mail. |
| `/primeiro-acesso` | FirstAccess | Configuração de primeiro acesso (identidade, senha, termos). |

### 3.2 Dashboard (área autenticada)

Todas sob o layout com **sidebar** e **header** (breadcrumb, busca, notificações, ciclo). Em **Parâmetros** o header exibe “Configurações do Sistema”, “Acesso Administrativo”, Cancelar e Salvar Alterações.

| Rota | Tela | Descrição |
|------|------|-----------|
| `/dashboard` | DashboardHome | Visão geral: KPIs, tabela, atividades recentes, mapa. |
| `/dashboard/alunos` | Students | Gestão de alunos: lista, filtros (grupo, rotação), importar planilha, cadastrar. |
| `/dashboard/grupos` | Groups | Gestão de grupos: cards por grupo, status das rotações, ações rápidas. |
| `/dashboard/rotacoes` | Rotations | Grade de rotações: matriz grupo × bimestre, legenda, status da matriz, alertas, ações. |
| `/dashboard/preceptores` | Preceptors | Gestão de preceptores: busca, filtros (especialidade, hospital), tabela, paginação, cards de stats. |
| `/dashboard/hospitais` | Hospitals | Gestão de hospitais parceiros: KPIs, busca, grid de cards (dados + documentos), mapa flutuante. |
| `/dashboard/parametros` | Parameters | Configurações: submenu (Usuários e Permissões, Calendário, Especialidades, Logs, Notificações, API), Equipe de Gestão, Políticas de Segurança, Auditoria. |
| `/dashboard/relatorios` | Reports | Relatórios e indicadores: KPIs (presença, horas, pendências), gráficos (carga por rotação, conclusão turma), tabela progresso por grupo. |

---

## 4. Personas (perfis do sistema)

Conforme documentação de negócio em `docs/PERFIS-E-MENUS.md`.

### 4.1 Resumo

| Perfil | Descrição | Responsabilidade principal |
|--------|-----------|----------------------------|
| **Aluno** | Estudante do 6º ano (internato) | Preencher formulário diário; cumprir carga horária por rotação; gerar comprovante PDF no final do ano. |
| **Preceptor** | Médico responsável por um grupo (10 alunos) | Confirmar presença diária dos alunos do seu grupo na rotação/hospital. |
| **Coordenação do 6º ano** | Coordena a turma e o internato | Acompanhar grupos, rotações, presenças; definir/ajustar escalas; relatórios. |
| **Diretor acadêmico / Decano** | Direção da faculdade | Cadastrar e manter preceptores, alunos, hospitais, rotações; parâmetros gerais do sistema. |

### 4.2 Menus por persona

#### Aluno

| Menu | Descrição |
|------|-----------|
| **Início** | Resumo: meu grupo, rotação atual, hospital, presença do mês. |
| **Formulário diário** | Registro de atividades, competências, data, tutor, diretor acadêmico, coordenação do 6º curso. |
| **Minhas rotações** | As 6 rotações, status (concluída / em andamento) e carga horária por rotação. |
| **Minha presença** | Histórico de dias com presença confirmada pelo preceptor. |
| **Comprovante** | Gerar PDF com registro de presença do ano (liberado ao final do período). |

#### Preceptor

| Menu | Descrição |
|------|-----------|
| **Início** | Meu grupo (10 alunos), rotação e hospital atuais. |
| **Confirmar presenças** | Lista do dia: marcar quais alunos estiveram presentes na rotação. |
| **Meu grupo** | Lista dos 10 alunos, presença acumulada, carga horária por rotação. |
| **Histórico** | Presenças já confirmadas (por data, aluno, rotação). |

#### Coordenação do 6º ano

| Menu | Descrição |
|------|-----------|
| **Dashboard** | Visão geral: 18 grupos, rotações, hospitais, presença geral, alertas. |
| **Alunos** | Lista dos 180, filtros por grupo/rotação/hospital, presença e status. |
| **Grupos** | Os 18 grupos (10 alunos + 1 preceptor cada). |
| **Preceptores** | Lista dos médicos e vínculo com grupo/rotação. |
| **Hospitais** | Hospitais parceiros e capacidade. |
| **Rotações** | Grade: grupo × rotação × hospital × período (2 meses). |
| **Relatórios** | Presença por grupo/rotação/hospital, carga horária, etc. |

#### Diretor acadêmico / Decano

Tem **acesso a tudo que a Coordenação tem**, mais:

| Menu | Descrição |
|------|-----------|
| (Todos os da Coordenação) | Dashboard, Alunos, Grupos, Preceptores, Hospitais, Rotações, Relatórios. |
| **CONFIGURAÇÕES** | |
| **Parâmetros** | Usuários e permissões, calendário acadêmico, especialidades e rotações, logs de auditoria, notificações, integrações e API. |

---

## 5. Contexto de negócio (resumo)

- **Turma:** 6º ano, ex.: turma 2026 com **180 alunos**.
- **Grupos:** 180 ÷ 10 = **18 grupos**.
- **Preceptor:** 1 médico por grupo.
- **Rotações:** 1 grupo fica **2 meses** em **1 hospital** por rotação.
- **6 rotações:** Cirurgia, Clínica Médica, Ginecologia e Obstetrícia, Pediatria, APS e Saúde Pública, Urgências.

**Fluxo principal:**

1. Aluno preenche **formulário diário** (atividades, competências, data, tutor, diretor, coordenação).
2. Preceptor **confirma presença** no app.
3. Ao final do ano, aluno pode **gerar PDF** com registro de presença.
4. Direção/coordenação **cadastra e mantém** preceptores, alunos, hospitais e **parâmetros** do sistema.

---

## 6. Observações para evolução

- **Controle por perfil:** O front atual expõe o mesmo menu (Dashboard, Alunos, Grupos, Preceptores, Hospitais, Rotações, Relatórios, Parâmetros). A documentação de personas define menus diferentes por perfil; a implementação futura pode esconder/ Mostrar itens da sidebar e rotas conforme o perfil logado (Aluno, Preceptor, Coordenação, Diretor).
- **Formulário diário e Confirmar presenças:** Funcionalidades descritas nas personas ainda não implementadas no front; as telas atuais cobrem sobretudo o fluxo de **Coordenação/Diretor** (gestão de alunos, grupos, preceptores, hospitais, rotações, relatórios e parâmetros).
- **Rotações (6):** Cirurgia, Clínica Médica, Ginecologia e Obstetrícia, Pediatria, APS e Saúde Pública, Urgências — usadas em legendas, filtros e cards no projeto.

---

## 7. Análise: telas criadas vs telas faltantes

Com base no código atual (`App.jsx`, páginas em `src/pages/`) e nos menus definidos por persona no §4.

### 7.1 Telas já implementadas

| # | Rota | Tela (componente) | Persona que usa | Observação |
|---|------|-------------------|-----------------|------------|
| 1 | `/login` | Login | Todas | Portal do Internato. |
| 2 | `/esqueci-senha` | ForgotPassword | Todas | Recuperação de senha. |
| 3 | `/primeiro-acesso` | FirstAccess | Todas | Configuração de primeiro acesso. |
| 4 | `/dashboard` | DashboardHome | Coordenação, Diretor | Visão geral (KPIs, tabela, atividades, mapa). |
| 5 | `/dashboard/alunos` | Students | Coordenação, Diretor | Gestão de alunos (lista, filtros, importar, cadastrar). |
| 6 | `/dashboard/grupos` | Groups | Coordenação, Diretor | Gestão dos 18 grupos. |
| 7 | `/dashboard/rotacoes` | Rotations | Coordenação, Diretor | Grade grupo × bimestre/rotação/hospital. |
| 8 | `/dashboard/preceptores` | Preceptors | Coordenação, Diretor | Gestão de preceptores. |
| 9 | `/dashboard/hospitais` | Hospitals | Coordenação, Diretor | Gestão de hospitais parceiros. |
| 10 | `/dashboard/relatorios` | Reports | Coordenação, Diretor | Relatórios e indicadores. |
| 11 | `/dashboard/parametros` | Parameters | Diretor | Configurações (usuários, segurança, auditoria, etc.). |
| 12 | `/dashboard/formulario-diario` | StudentDailyForm | **Aluno** | Formulário diário: dados do atendimento, jornada, atividades, competências, salvar rascunho / finalizar. |
| 13 | `/dashboard/validar-presencas` | PreceptorValidate | **Preceptor** | Validar presenças: rotação atual, histórico do grupo, lista de alunos (pendente/validado/não enviado), Validar Todos. |
| 14 | `/dashboard/certificacao` | StudentReportsCertification | **Aluno** | Relatórios e certificação: progresso geral, certificado PDF, status das 6 rotações, verificação de assinaturas (ICP-Brasil). |

**Resumo:** **14 telas** implementadas. Fluxo público (3), Coordenação + Diretor (8), **Aluno** (2: Formulário diário, Relatórios e Certificação), **Preceptor** (1: Validar presenças).

---

### 7.2 Telas faltantes por persona

#### Persona: **Aluno**

| Menu (doc) | Status | Descrição |
|------------|--------|-----------|
| **Início** | ❌ Faltando | Resumo: meu grupo, rotação atual, hospital, presença do mês. |
| **Formulário diário** | ✅ Implementado | `StudentDailyForm` — registro de atividades, competências, data, preceptor do dia, jornada, salvar rascunho / finalizar. |
| **Minhas rotações** | ⚠️ Parcial | Incluído em **Relatórios e Certificação** (`StudentReportsCertification`): status das 6 rotações, horas, conclusão. |
| **Minha presença** | ❌ Faltando | Histórico de dias com presença confirmada pelo preceptor. |
| **Comprovante** | ⚠️ Parcial | Incluído em **Relatórios e Certificação**: progresso geral, botão “Gerar PDF Final de Internato”, tabela de assinaturas. |

**Total Aluno:** **2 telas** ainda faltando (Início Aluno, Minha presença); Formulário diário e Relatórios/Certificação implementados.

---

#### Persona: **Preceptor**

| Menu (doc) | Status | Descrição |
|------------|--------|-----------|
| **Início** | ❌ Faltando | Meu grupo (10 alunos), rotação e hospital atuais (visão resumida). |
| **Confirmar presenças** | ✅ Implementado | `PreceptorValidate` — rotação atual, progresso de validação, lista de alunos (pendente/validado/não enviado), AJUSTE/CONFIRMAR, Validar Todos. |
| **Meu grupo** | ❌ Faltando | Lista dos 10 alunos, presença acumulada, carga horária por rotação. |
| **Histórico** | ❌ Faltando | Presenças já confirmadas (por data, aluno, rotação). |

**Total Preceptor:** **3 telas** ainda faltando (Início, Meu grupo, Histórico); Confirmar presenças implementado.

---

#### Persona: **Coordenação do 6º ano**

Todas as telas de menu da Coordenação **já existem** (Dashboard, Alunos, Grupos, Preceptores, Hospitais, Rotações, Relatórios). Nenhuma tela nova obrigatória apenas para Coordenação.

---

#### Persona: **Diretor acadêmico / Decano**

Todas as telas do Diretor **já existem** (todas da Coordenação + Parâmetros). Nenhuma tela nova obrigatória apenas para Diretor.

---

### 7.3 Resumo visual

| Persona | Telas previstas no doc | Telas implementadas | Faltando |
|---------|------------------------|----------------------|----------|
| **Aluno** | 5 | **2** (Formulário diário, Relatórios e Certificação) | **2** (Início Aluno, Minha presença) |
| **Preceptor** | 4 | **1** (Validar presenças) | **3** (Início, Meu grupo, Histórico) |
| **Coordenação** | 7 | 7 | **0** |
| **Diretor** | 8 (7 + Parâmetros) | 8 | **0** |

**Total de telas faltantes:** **5** (2 do Aluno + 3 do Preceptor).  
Consulte “Início” `docs/ACOMPANHAMENTO-TELAS.md` para o checklist completo de telas criadas.

---

### 7.4 Próximos passos sugeridos

1. **Controle de acesso por perfil**  
   Definir perfil no login (ou via backend) e exibir na sidebar apenas os itens de menu daquele perfil (Aluno, Preceptor, Coordenação, Diretor).

2. **Telas do Aluno** (prioridade conforme fluxo do negócio)  
   - Início Aluno  
   - Formulário diário  
   - Minhas rotações  
   - Minha presença  
   - Comprovante (gerar PDF)

3. **Telas do Preceptor**  
   - Início Preceptor  
   - Confirmar presenças  
   - Meu grupo  
   - Histórico de presenças

4. **Reuso possível**  
   - Um único layout “Dashboard” com **Início** diferente por perfil (Aluno vs Preceptor vs Coordenação/Diretor) reduz duplicação e mantém uma rota `/dashboard` só.

---

*Documento gerado a partir do código do Axono e da documentação em `docs/PERFIS-E-MENUS.md`.*
