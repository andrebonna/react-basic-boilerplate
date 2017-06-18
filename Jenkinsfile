// node('docker-slave') {
//     checkout scm
//     echo 'Building..'
//
//     sh "npm install"
//     sh "npm start"
//     sh "npm test"
//
//
// }

def hostIp(container) {
  def ip = sh script: "docker inspect --format='{{.NetworkSettings.IPAddress}}' ${container.id}", returnStdout: true
  return ip.trim()
  // return readFile('hostIp').trim()
}

docker.image('mongo').withRun() {c ->

    def mongo = hostIp(c)
    docker.image('jenkins-slave-bonna').inside {
        checkout scm
        echo 'Building..'

        sh "npm install"
        sh "MONGO_DB=${mongo} npm start"

    }
}
