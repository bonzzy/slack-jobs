# Slack message scheduler

### About

The application client is created using `React` framework with `Typescript` and `SCSS`. It uses `Redux` for storing and actions. Backend `REST Api` is created with `Java Spring Boot`.

Application can send created messages at given scheduled time to slack channel.

### Features


- List all Slack jobs
- Create a new Slack job
- Send message on given time and update message status


### Little more


- Client tests are written with [Jest](https://facebook.github.io/jest/)
- Backend REST is covered with unit and integration tests
- `BEM` is used as a styling standard


### Start application

```bash
./mvnw clean install
```

Open your browser and check `http://localhost:8080`.

### Contributing


Make sure that versions `node >= 8.9.0` and `npm >= 5.5.1` are installed.

```bash
cd client && npm install
```

```bash
npm start
```

Open your browser and check `http://localhost:8765/`.

### Run tests

```bash
npm test
```

