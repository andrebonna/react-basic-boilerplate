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
  sh "docker inspect -f {{.Node.Ip}} ${container.id} > hostIp"
  readFile('hostIp').trim()
}

docker.withServer('tcp://192.168.0.106:4243') {
    docker.image('mongodb').withRun('-p 27017:27017') {c ->
        echo "http://${hostIp(c)}:27017/"
    }
}
