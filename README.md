# TaskScript

CLI de gestion de tâches en TypeScript avec validation, décorateurs et tests.

## Installation
```bash
npm install -g @TS-GP
```

## Utilisation

### Créer une tâche
```bash
task create "Buy milk" "very important" "Go to Lidl"
```

### Lister les tâches
```bash
taskscript list
```

### Supprimer une tâche
```bash
taskscript delete <id>
```

## Développement
```bash
npm install
npm run build
npm test
npm run test:coverage
```

## Technologies

- TypeScript
- Node.js
- Vitest (tests)
- Strategy Pattern (validation)
- Décorateurs (@timestamp, @validate, @measureTime)

## License

MIT
