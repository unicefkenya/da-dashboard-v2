#/bin/bash
set -e
VERSION=v1.0.12
# git push origin main
# npm run build-prod
docker build -t michameiu/moekedash:$VERSION .
docker push michameiu/moekedash:$VERSION
