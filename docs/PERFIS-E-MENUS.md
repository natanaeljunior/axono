# ResidencyFlow — Perfis e Menus do Sistema

Documentação dos perfis de usuário e dos menus por perfil do Portal do Internato (6º ano – gestão acadêmica).

---

## 1. Contexto do negócio

- **Turma:** 6º ano (internato), ex.: turma 2026 com **180 alunos**.
- **Grupos:** 180 alunos ÷ 10 = **18 grupos**.
- **Preceptor:** Cada grupo tem **1 médico/preceptor** responsável.
- **Rotações:** Cada grupo fica em **uma rotação** por **2 meses** em **1 hospital**.
- **6 rotações:** Cirurgia, Clínica Médica, Gineco e Obstetrícia, Pediatria, APS e Saúde Pública, Urgências.

**Fluxo principal:**

1. O **aluno** preenche **formulário diário** (atividades, competências, data, tutor, diretor acadêmico, coordenação do 6º curso) para comprovar presença e carga horária mínima por rotação.
2. O **preceptor** confirma no app que o aluno esteve presente naquele dia naquela rotação.
3. Ao **final do ano letivo**, o aluno pode **gerar PDF** com todo o registro de presença (horários, assinaturas, etc.).
4. A **direção acadêmica** cadastra preceptores, alunos, hospitais e parâmetros do sistema.

---

## 2. Perfis do sistema

| Perfil | Descrição | Responsabilidade principal |
|--------|-----------|----------------------------|
| **Aluno** | Estudante do 6º ano (internato) | Preencher formulário diário; cumprir carga horária mínima por rotação; gerar comprovante PDF no final do ano. |
| **Preceptor** | Médico responsável por um grupo (10 alunos) | Confirmar presença diária dos alunos do seu grupo na rotação/hospital. |
| **Coordenação do 6º ano** | Coordena a turma e o internato | Acompanhar grupos, rotações, presenças; definir/ajustar escalas (quem está em qual rotação/hospital e quando); relatórios. |
| **Diretor acadêmico / Decano** | Direção da faculdade | Cadastrar e manter preceptores, alunos, hospitais, rotações; parâmetros gerais do sistema. |

---

## 3. Menus por perfil

### 3.1 Aluno

| Menu | Descrição |
|------|-----------|
| **Início** | Resumo: meu grupo, rotação atual, hospital, presença do mês. |
| **Formulário diário** | Registro de atividades, competências, data, tutor, diretor acadêmico, coordenação do 6º curso. |
| **Minhas rotações** | As 6 rotações, status (concluída / em andamento) e carga horária por rotação. |
| **Minha presença** | Histórico de dias com presença confirmada pelo preceptor. |
| **Comprovante** | Gerar PDF com registro de presença do ano (liberado ao final do período, com horários e assinaturas). |

---

### 3.2 Preceptor

| Menu | Descrição |
|------|-----------|
| **Início** | Meu grupo (10 alunos), rotação e hospital atuais. |
| **Confirmar presenças** | Lista do dia: marcar quais alunos estiveram presentes na rotação (tela principal do médico). |
| **Meu grupo** | Lista dos 10 alunos, presença acumulada, carga horária por rotação. |
| **Histórico** | Presenças já confirmadas (por data, aluno, rotação). |

---

### 3.3 Coordenação do 6º ano

| Menu | Descrição |
|------|-----------|
| **Dashboard** | Visão geral: 18 grupos, rotações, hospitais, presença geral, alertas (ex.: aluno abaixo da carga mínima). |
| **Alunos** | Lista dos 180, filtros por grupo/rotação/hospital, presença e status. |
| **Grupos** | Os 18 grupos (10 alunos + 1 preceptor cada). |
| **Preceptores** | Lista dos médicos e vínculo com grupo/rotação. |
| **Hospitais** | Hospitais parceiros e capacidade. |
| **Rotações** | Grade: qual grupo está em qual rotação e em qual hospital em cada período (2 meses). |
| **Relatórios** | Presença por grupo/rotação/hospital, carga horária, etc. |

---

### 3.4 Diretor acadêmico / Decano

O diretor acadêmico tem **acesso a tudo que a Coordenação tem**, mais a seção de configuração:

| Menu | Descrição |
|------|-----------|
| **Dashboard** | Visão geral (grupos, rotações, hospitais, presença, indicadores). |
| **Alunos** | Lista e gestão de alunos (cadastro/importação da turma). |
| **Grupos** | Os 18 grupos (alunos + preceptor). |
| **Preceptores** | Cadastro e gestão dos médicos/preceptores. |
| **Hospitais** | Cadastro e gestão dos hospitais parceiros. |
| **Rotações** | Grade de alocação: grupo × rotação × hospital × período. |
| **Relatórios** | Relatórios gerais de presença e carga horária. |
| **CONFIGURAÇÕES** | |
| **Parâmetros** | Cadastro de preceptores, alunos, hospitais, rotações; usuários e permissões (se aplicável). |

---

## 4. Rotações (6)

- Cirurgia  
- Clínica Médica  
- Ginecologia e Obstetrícia  
- Pediatria  
- APS e Saúde Pública  
- Urgências  

Cada grupo permanece **2 meses** em uma rotação em **um hospital**, com um **preceptor** responsável.

---

## 5. Observações

- **Formulário diário:** Os campos tutor, diretor acadêmico e coordenação do 6º curso podem ser pré-preenchidos ou selecionados a partir dos cadastros.
- **Confirmar presença:** O preceptor confirma por **dia** e **rotação**; o app exibe apenas os alunos do grupo dele naquela rotação no período vigente.
- **PDF ao final do ano:** Liberado quando o aluno tiver passado pelas 6 rotações e cumprido carga mínima; inclui datas, horários e assinatura/nome do preceptor que confirmou.
- **Rotações (menu “Escalas”):** Uma única grade Período × Grupo × Rotação × Hospital alimenta a visão do preceptor, do aluno e da coordenação/direção.

---

*Documento gerado para o projeto ResidencyFlow — Portal do Internato.*
