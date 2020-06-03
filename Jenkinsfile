pipeline {
  agent none
  environment {
    SERVICE_NAME = 'dc-con'
    DOCKER_REGISTRY = 'bremersee/dc-con'
    DEV_TAG = 'snapshot'
    PROD_TAG = 'latest'
    DOCKER_CREDENTIALS = 'dockerhub'
    DOCKER_CREDS = credentials('dockerhub')
    DOCKER_IMAGE_WITH_BUILD_NUMBER = ''
    DOCKER_IMAGE_SNAPSHOT = ''
    DOCKER_IMAGE_LATEST = ''
    DEV_BUILD = true
    DEV_PUSH = true
    DEV_DEPLOY = true
    PROD_BUILD = true
    PROD_PUSH = true
    PROD_DEPLOY = true
  }
  stages {
    stage('Build docker image snapshot and push') {
      agent {
        label 'maven'
      }
      when {
        allOf {
          branch 'develop'
          environment name: 'DEV_BUILD', value: 'true'
        }
      }
      steps {
        script {
          sh '''
            docker build -f Dockerfile --build-arg NG_CONFIG=dev --build-arg SERVICE_NAME=${SERVICE_NAME} -t ${DOCKER_REGISTRY}:${DEV_TAG} .
            docker login -u="${DOCKER_CREDS_USR}" -p="${DOCKER_CREDS_PSW}"
            docker push ${DOCKER_REGISTRY}:${DEV_TAG}
            docker system prune -a -f
          '''
        }
      }
    }
    stage('Deploy on dev-swarm') {
      agent {
        label 'dev-swarm'
      }
      when {
        allOf {
          branch 'develop'
          environment name: 'DEV_DEPLOY', value: 'true'
        }
      }
      steps {
        sh '''
          if docker service ls | grep -q ${SERVICE_NAME}; then
            echo "Updating service ${SERVICE_NAME} with docker image ${DOCKER_REGISTRY}:${DEV_TAG}."
            docker service update --image ${DOCKER_REGISTRY}:${DEV_TAG} ${SERVICE_NAME}
          else
            echo "Creating service ${SERVICE_NAME} with docker image ${DOCKER_REGISTRY}:${DEV_TAG}."
            chmod 755 docker-swarm/service.sh
            docker-swarm/service.sh "${DOCKER_REGISTRY}:${DEV_TAG}" "swarm,dev" 1
          fi
        '''
      }
    }
  }
}
