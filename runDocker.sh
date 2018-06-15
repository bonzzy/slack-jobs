#!/usr/bin/env bash

docker run -p 8080:8080 --name slack-jobs -e channel='My cool channel name' \
-e webhook='https://hooks.slack.com/services/[secret]' \
 tomislavfabeta/slack-scheduler
