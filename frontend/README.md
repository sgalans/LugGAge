# LugGAge — frontend

Base de React + TypeScript creada con la plantilla oficial de Vite. De momento muestra la página de ejemplo; las funciones de equipaje y el soporte offline llegarán en iteraciones posteriores.

## Puesta en marcha

Desde la raíz del repositorio, en PowerShell:

```powershell
nvm use 26.13.1
cd frontend
npm ci
npm run dev
```

Abre la dirección indicada por Vite. Detén el servidor con `Ctrl+C`.

`npm ci` reproduce las versiones de `package-lock.json`. Al añadir o actualizar dependencias se usa `npm install`, que actualiza ese archivo. El lockfile se guarda en Git; `node_modules` no.

## Comprobaciones

Dentro de `frontend/`:

```powershell
npm run lint
npm run format:check
npm run build
```

- `lint`: ESLint busca problemas de código, incluidas reglas de TypeScript y React Hooks.
- `format:check`: Prettier comprueba el formato sin modificar archivos.
- `format`: aplica el formato de Prettier.
- `build`: comprueba los tipos y genera la versión de producción en `dist/`.
- `preview`: sirve localmente la versión ya compilada para revisarla.

ESLint y Prettier tienen responsabilidades distintas. `eslint-config-prettier` desactiva las reglas de estilo que podrían entrar en conflicto con el formateador.

## Archivos principales

- `index.html`: documento HTML que carga la aplicación.
- `src/main.tsx`: monta React en el elemento `root` del HTML.
- `src/App.tsx`: componente de ejemplo de Vite.
- `vite.config.ts`: configuración del servidor y de la compilación.
- `tsconfig*.json`: configuración de TypeScript para la aplicación y las herramientas.
- `eslint.config.js` y `.prettierrc.json`: reglas de calidad y formato.

TypeScript se mantiene en la línea 6.0 porque la versión instalada de `typescript-eslint` todavía no admite TypeScript 7. La arquitectura interna, los tests y la configuración PWA siguen pendientes.

## Avisos de dependencias

Al preparar el entorno, `npm audit` detectó diez avisos moderados derivados de `minimatch`, dependencia transitiva de las herramientas de lint. Se mantiene pendiente una actualización compatible: la corrección automática propuesta retrocede herramientas a versiones anteriores. No se ha aplicado `npm audit fix --force`.
