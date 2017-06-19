def hostIp(container) {
    def ip = sh script: "docker inspect --format='{{.NetworkSettings.IPAddress}}' ${container.id}", returnStdout: true
    return ip.trim()
}

docker.image('mongo').withRun() {c ->
    def mongo = hostIp(c)
    docker.image('jenkins-slave').inside {
        checkout scm
        echo 'Building..'
        stage ('Install') {
        	sh "npm install"
        }
        stage ('Start') {
        	sh "MONGO_DB=${mongo} PORT=3000 npm start &"
        }
        timeout(1) {
            waitUntil {
                def r = sh script: 'wget -q http://localhost:3000 -O /dev/null', returnStatus: true
                return (r == 0);
            }
        }
        stage ('Test') {
        	sh "npm test"
        }
    }
}
