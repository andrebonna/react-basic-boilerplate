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


docker.image('mongo').withRun('-p 27025:27017') {c ->
    echo "http://${hostIp(c)}:27017/"
}
