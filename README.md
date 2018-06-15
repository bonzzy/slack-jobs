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
- There is a docker image [tomislavfabeta/slack-scheduler](https://hub.docker.com/r/tomislavfabeta/slack-scheduler/)


### Start application

You have to set env variables `channel` and `webhook`.


```bash
webhook=https://hooks.slack.com/services/[secret] channel=Some-channel ./mvnw spring-boot:run
```

Open your browser and check `http://localhost:8080`.

Starting application with Docker [tomislavfabeta/slack-scheduler](https://hub.docker.com/r/tomislavfabeta/slack-scheduler/):


```bash
sh ./runDocker.sh
```

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

