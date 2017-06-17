pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Building..'
                def node = docker.image('node')
                node.pull()
                node.inside {
                    sh "npm install"
                    sh "npm test"
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
