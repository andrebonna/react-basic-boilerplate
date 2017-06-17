node {
    stage 'Test'
    echo 'Building..'
    def nodeImage = docker.image('node')
    nodeImage.pull()
    nodeImage.inside {
        sh "npm install"
        sh "npm test"
    }

    stage('Deploy') {
        steps {
            echo 'Deploying....'
        }
    }
}
