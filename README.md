## NestJS Starter Kit

Ultimate boilerplate to kick start an enterprise-ready NestJs application.
This kit contains NestJs Setup with
- Integrated TypeORM@0.3 based database enitities and repositories with ready to go migration scripts and seeders
- Pino based logging with request traceability
- Bull (Redis based) queue setup and integration along with Bull Dashboard(based on Bullboard) to inspect queues/jobs
- Sample routing features, database and queue intearction features implemented as Health check routes
- Sample end to end tests and service unit tests
- Configiurable Eslint, Prettierc and Editor configs to maintain coding standards for teams

### Getting Started

🖥 **Environment:**
  - Node: >= 16.x
  - Postgres: 13.x
  - Redis 4.x
  - Typescript: >= 4.x
  - NestJS: >= 8.x
  - TypeORM: >= 0.3

🔨 **Pre-Setup:**
  - Make a copy of `.env.sample` to `.env`
  - Create a new database for the app and replace `DATABASE_URL` variable in `.env` appropriately; which should be `postgresql://<database username>:<database password>@localhost:5432/<database name>?schema=public`

🛠 **Installation & Setup:**
  ```bash
    $ npm install
    $ npm run db:dev:prepare # runs migrations and seed
    $ npm run start:dev # starts local server
    # Health check endpoints http://localhost:6060/api/healthchk/status should now be up
    # Bull dashboard available at http://localhost:6060/bullboard
  ```

🤖 **Tests:**
  - Tests uses `.env.test` dotenv file. So, Make a copy of `.env.sample` to `.env.test`
  - You might want to create a different database for tests, once you create a new database, update `.env.test`'s `DATABASE_URL` appropriately
  ```bash
    $ npm run db:test:prepare # runs migrations and seed for test
    $ npm run test # runs non e2e tests
    $ npm run test:e2e # runs e2e (end to end) tests
    $ npm run lint # run linter
    $ npm run format # prettier format
  ```

### Roadmap
  - Dockerize
  - SSL Support
  - JWT based auth
  - Cache
  - Sample Github/Gitlab CI
