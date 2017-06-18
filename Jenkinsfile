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
    docker.image('jenkins-slave').inside {
        checkout scm
        echo 'Building..'

        sh "npm install"
        sh "MONGO_DB=${mongo} PORT=3000 npm start &"
        timeout(240) {
            waitUntil {
                def r = sh script: 'wget -q http://localhost:3000 -O /dev/null', returnStatus: true
                return (r == 0);
            }
        }
        sh "npm test"

    }
}
