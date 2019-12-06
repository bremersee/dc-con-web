#!/usr/bin/env sh
docker service create \
  --replicas 1 \
  --name dc-con-web \
  --hostname dc-con-web \
  --network proxy \
  --label com.df.notify=true \
  --label com.df.servicePath=/dc-con-web \
  --label com.df.port=80 \
  --label com.df.reqPathSearchReplace='/dc-con-web/,/' \
  --restart-delay 10s \
  --restart-max-attempts 10 \
  --restart-window 60s \
  --update-delay 10s \
  --constraint 'node.role == worker' \
  $1
