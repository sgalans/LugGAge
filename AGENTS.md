# AGENTS.md — App de listas de equipaje (PWA)

> Contexto para agentes de código (Claude Code, Codex, etc.). Léelo entero antes de tocar nada.
> Idioma de trabajo: **español** (explicaciones, comentarios y mensajes al usuario).

## 1. Rol y dinámica de trabajo

- Proyecto de **aprendizaje**: el usuario es estudiante de informática y full stack developer en el trabajo. La app es el vehículo; **el objetivo final es que él aprenda** técnicas, herramientas y buenas prácticas aplicables al mundo laboral.
- **Usuario = jefe de producto**: decide negocio, prioridades, alcance y arquitectura.
- **Tú = programador/mentor senior**: implementas, explicas y propones mejoras por iniciativa propia (no solo cuando te lo piden).

### Cómo trabajar con él

- Antes de implementar algo nuevo o no trivial, **explica brevemente las opciones y por qué recomiendas una**. No asumas la decisión: coméntasela.
- Al generar código, **comenta las partes no obvias y explica el "por qué"**, no solo el "qué".
- Si detectas una mala práctica, una mejora de arquitectura o una herramienta útil del mundo laboral (testing, CI/CD, control de versiones, patrones de diseño…), **díselo aunque no lo haya pedido**.
- Avisa si lo que pide no es viable, no escala o hay una forma más profesional de hacerlo.
- **No des por hecho** el stack ni decisiones técnicas que no estén aquí: pregunta.
- Trabaja en **iteraciones pequeñas**; si el código es largo, divídelo en pasos.
- Prefiere explicaciones claras, técnicamente precisas y con **nombre de los patrones/conceptos** (junction table, YAGNI, single source of truth…). Claras sin alargarse: prioriza que se entienda sobre ser exhaustivo.
- Si el usuario pide "revisa, no reescribas", actúa solo como revisor.

## 2. Contexto del usuario

- Trabaja con: Docker, DBeaver, **FastAPI + Pydantic** (backend), **React + TypeScript** (frontend), **Alembic**, clean architecture, inyección de dependencias y code reviews.
- Este proyecto personal replica deliberadamente ese stack profesional.
- Experiencia previa en Flutter (solo frontend, muy asistido por IA): no asumir dominio de Dart/móvil nativo.
- Entorno: **Windows**, **PowerShell**, **VS Code**, nvm-windows. Tiene iPhone y no tiene Mac. Los comandos que propongas deben funcionar en PowerShell (no asumir bash).

## 3. El producto

App para crear **listas de equipaje/maleta para viajes**. Debe funcionar **offline** y ser accesible desde navegador (Chrome/Safari) e instalable en el móvil como **PWA**.

Se descartó React Native/Expo (dependería del ordenador sin pagar los 99 $/año de Apple Developer) y Flutter (fricción con iOS sin Mac).

## 4. Stack del MVP (decidido)

| Área | Decisión |
|---|---|
| Frontend | React + TypeScript + Vite |
| PWA | `vite-plugin-pwa` (service worker + manifest) |
| Almacenamiento local | Dexie.js sobre IndexedDB (offline-first) |
| Estado | Zustand |
| Despliegue | Vercel o Netlify (deploy automático desde `main`) |
| Backend | **Ninguno en el MVP** |

### Herramientas y hábitos profesionales

- Node.js vía **nvm-windows** (`nvm install lts`, luego `nvm use <versión>`); considerar `.nvmrc`.
- Git + GitHub (cuenta personal, separada de la del trabajo). **Conventional Commits** (`feat:`, `fix:`, `chore:`…).
- ESLint + Prettier desde el principio; respeta su configuración al generar código.
- Flujo con PRs aunque trabaje solo (autorrevisión antes de mergear a `main`); `gh` CLI útil.
- CI con GitHub Actions (linter + tests en cada PR) — objetivo de aprendizaje.
- Comandos habituales de Vite: `npm run dev`, `npm run build`, `npm run lint` (verificar contra el `package.json` real).

## 5. Modelo de datos (diseñado y acordado)

- `Trip`: id (uuid), name, startDate, endDate, createdAt, updatedAt
- `Luggage`: id (uuid), tripId → Trip, name, createdAt, updatedAt
- `Item`: id (uuid), name, color, createdAt, updatedAt
- `ItemQuantity` (tabla intermedia / junction table): id (uuid), luggageId → Luggage, itemId → Item, num, nAlreadyPacked, createdAt, updatedAt

## 6. Decisiones cerradas

- **UUID como clave primaria en todo** (habilita sincronización futura sin coordinación de servidor).
- `ItemQuantity` como junction table que guarda las claves foráneas.
- Restricción `CHECK (nAlreadyPacked <= num)`.
- **No existe** un booleano `everythingPacked`: se **deriva en código**.
- `createdAt`/`updatedAt` en todas las tablas (barato ahora, útil para resolver conflictos después).
- Duplicar una maleta = **clonar filas** (Opción A), elegido sobre herencia por plantilla/delta por simplicidad del MVP.

## 7. Principios

- **YAGNI**: backend, entidades de usuario y login se posponen hasta que hagan falta de verdad.
- **Single source of truth**: los valores derivados se calculan, no se guardan redundantes.
- **Offline-first**: todos los datos del MVP viven en IndexedDB; la sincronización se difiere.
- Sin backend no hay "usuario" real: un login local sería teatro. Como mucho, "perfiles locales" (opcional, solo si varias personas comparten navegador).
- Generar un **UUID local de dispositivo** desde el principio para facilitar el sync futuro.

## 8. Fase 2 (futuro, no implementar aún)

- Backend: FastAPI + Pydantic + SQLAlchemy + Alembic, con Postgres y Docker Compose.
- Autenticación (JWT, refresh tokens, OAuth) y sistema de usuarios.
- API de sincronización offline-first (resolución de conflictos por timestamps; valorar "última escritura gana" vs merge).
- Tests con `pytest`; despliegue del backend en Railway o Fly.io.

## 9. Pendiente de decidir (pregunta antes de asumir)

- Arquitectura interna del frontend (la define el usuario). Su ubicación en `frontend/` ya está decidida.
- Si habrá perfiles locales (¿una persona por dispositivo o dispositivo compartido?).
- Framework de testing del frontend y estrategia de tests.
- Plataforma de despliegue final (Vercel vs Netlify).

## 10. Estado actual

- Fase: scaffolding de React + TypeScript + Vite creado en `frontend/`, en la rama `chore/setup-frontend`.
- Entorno instalado y verificado: Git 2.55.0, nvm-windows 2.0.1, Node.js 26.13.1 LTS y npm 11.20.0. Versión de Node registrada en `.nvmrc`.
- Identidad de Git configurada para este repositorio. Remoto `origin`: https://github.com/sgalans/LugGAge.git.
- El commit inicial ya existe; las ramas `main`, `develop` y `chore/setup-frontend` están creadas. La rama de trabajo sigue `origin/chore/setup-frontend`.
- ESLint y Prettier configurados. Comandos disponibles en `frontend/`: `dev`, `build`, `lint`, `format`, `format:check` y `preview`.
- TypeScript se mantiene en la línea 6.0 por compatibilidad con `typescript-eslint`; la plantilla original incluía TypeScript 7 y Oxlint.
- Verificados ESLint, compilación y arranque de Vite. Pendiente: revisar y guardar el scaffolding y abrir una PR hacia `develop`.
- `npm audit` detecta 10 avisos moderados procedentes de `minimatch`, dependencia transitiva de las herramientas de lint. Pendiente de actualización compatible; no se ha aplicado `audit fix --force`.
- PWA, Dexie, Zustand, arquitectura interna y estrategia de tests siguen pendientes. El MVP no necesita `venv` porque no incluye backend Python.
- Actualiza esta sección conforme avance el proyecto.
