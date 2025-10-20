# Contributing to Nordnet TypeScript SDK

Thank you for your interest in contributing to the Nordnet TypeScript SDK!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nordnet-ts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Project Structure

```
nordnet-ts/
├── src/
│   ├── client/           # HTTP client and main SDK class
│   ├── resources/        # API resource classes
│   ├── types/           # TypeScript type definitions
│   ├── errors/          # Custom error classes
│   └── index.ts         # Main entry point
├── test/
│   └── unit/            # Unit tests
├── examples/            # Usage examples
└── dist/                # Build output
```

## Making Changes

### Adding a New Endpoint

1. **Add types** to `src/types/api.ts`
   ```typescript
   export interface NewFeature {
     id: number;
     name: string;
   }
   ```

2. **Create or update resource** in `src/resources/`
   ```typescript
   async getNewFeature(id: number): Promise<NewFeature> {
     return this.http.get<NewFeature>(`/new-feature/${id}`);
   }
   ```

3. **Add tests** in `test/unit/`
   ```typescript
   describe('NewFeatureResource', () => {
     it('should get new feature', async () => {
       // Test implementation
     });
   });
   ```

4. **Update documentation** in `README.md`

### Code Style

- Follow existing code patterns
- Use TypeScript strict mode
- Add JSDoc comments for public APIs
- Keep functions focused and single-purpose
- Prefer explicit types over `any`

### Testing

- Write unit tests for all new features
- Mock HTTP responses using vitest
- Aim for high test coverage
- Run tests before committing: `npm test`

### Commit Messages

Use clear, descriptive commit messages:
- `feat: add support for new endpoint`
- `fix: correct type definition for Account`
- `docs: update README with examples`
- `test: add tests for orders resource`
- `refactor: simplify HTTP client logic`

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code
   - Add tests
   - Update documentation

3. **Run checks**
   ```bash
   npm run typecheck
   npm run lint
   npm test
   npm run build
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Provide clear description
   - Reference any related issues
   - Wait for review

## Code Review

All submissions require review. We review:
- Code quality and style
- Test coverage
- Documentation completeness
- TypeScript type safety
- Breaking changes

## Questions?

Feel free to open an issue for questions or discussions!
