pipeline {
  agent none
  environment {
    SERVICE_NAME='dc-con-web'
    DOCKER_REGISTRY='bremersee/dc-con-web'
    DEV_TAG='latest'
    PROD_TAG='release'
    DOCKER_CREDENTIALS = 'dockerhub'
    DOCKER_IMAGE_WITH_BUILD_NUMBER=''
    DOCKER_IMAGE=''
  }
  stages {
    stage('Build docker image') {
      agent {
        label 'maven'
      }
      steps {
        script {
          DOCKER_IMAGE_WITH_BUILD_NUMBER = docker.build DOCKER_REGISTRY + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Push docker image') {
      agent {
        label 'maven'
      }
      steps {
        script {
          docker.withRegistry( '', DOCKER_CREDENTIALS ) {
            DOCKER_IMAGE_WITH_BUILD_NUMBER.push();
          }
        }
      }
    }
    stage('Remove docker image') {
      agent {
        label 'maven'
      }
      steps {
        script {
          sh "docker rmi $DOCKER_REGISTRY:$BUILD_NUMBER"
        }
      }
    }
  }
}
