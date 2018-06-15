FROM openjdk:8-jre-alpine
MAINTAINER tomislav.fabeta@gmail.com
COPY ./target/slack-jobs-0.0.1-SNAPSHOT.jar /usr/src/slack-job/
WORKDIR /usr/src/slack-job
EXPOSE 8080
CMD ["java", "-jar", "slack-jobs-0.0.1-SNAPSHOT.jar"]