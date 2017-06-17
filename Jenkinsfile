pipeline {
    agent any

    stages {
        stage('Test') {
            node {
                echo 'Building..'
                def nodeImage = docker.image('node')
                nodeImage.pull()
                nodeImage.inside {
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
