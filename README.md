# Bahama Solution — E-commerce

E-commerce Bahama Solution (Next.js/Tailwind).

**Stack:** Next.js · TypeScript · Tailwind CSS · MongoDB (Mongoose) · JWT · bcryptjs

**Documentação:**
- [Issue de organização](https://github.com/ClavioBahama/bahama-solution-ecommerce/issues/1) — revisão e sugestões

---

## 0. Pré-requisitos

Node.js 18+ e npm (ou pnpm, pois há `pnpm-lock.yaml`).
Conta na Netlify para o deploy (há `netlify.toml` em um dos projetos).

## 1. Configuração (.env)

Crie um arquivo de variáveis de ambiente na raiz com os dados do banco/serviços externos.
Nunca commite o `.env`; mantenha apenas um `.env.example` sem valores reais.
No deploy, defina as mesmas variáveis no painel da plataforma.

## 2. Instalação e Execução

```powershell
npm install   # instalar dependências
npm run dev   # servidor de desenvolvimento (Next.js)
npm run build   # build de produção
npm start   # servir o build localmente
npm run lint   # verificar lint
```

## 3. Estrutura do Projeto

```text
bahama-solution-ecommerce/
├── app/            # rotas (App Router)
├── components/     # componentes UI
├── contexts/       # estados globais
├── hooks/          # hooks customizados
├── lib/            # utilitários
├── models/         # modelos Mongoose
├── scripts/        # scripts auxiliares
├── public/         # assets
└── styles/         # estilos globais
```

## 4. Funcionalidades

- E-commerce com App Router do Next.js.
- Modelos de dados com Mongoose (MongoDB).
- Autenticação com JWT e hash com bcryptjs.
- Componentes Radix/UI e formulários com React Hook Form.
- Gráficos com Recharts e ícones com Lucide.

## 5. Arquivos e pontos de entrada

- `app/` — páginas e rotas.
- `models/` — esquemas de dados.
- `scripts/` — tarefas auxiliares.

## 6. Segurança

Variáveis de ambiente sensíveis devem ficar apenas no painel da plataforma de deploy.
Não versionar `.env.local`.

## 7. Problemas Comuns

Porta 3000 ocupada: altere a porta com `npm run dev -- -p 3001`.
Erro de build: confirme a versão do Node e rode `npm install` novamente.

## 8. Observações (organização)

> Revisão realizada em 17/11/2026 durante a padronização dos repositórios, inspirada no README do FreelaMZ.
- Projeto Next.js sem README original.
- Sugestão: documentar variáveis de ambiente, banco de dados e comandos de build.
- Atenção: a dependência `reactt-dom` no `package.json` parece erro de digitação — conferir.

## 9. Licença

Projeto pessoal/acadêmico. Verifique a licença de templates ou bibliotecas de terceiros antes de uso comercial.

