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
  sh "docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${container.id} > hostIp"
  // return readFile('hostIp').trim()
}


docker.image('mongo').withRun('-p 27025:27017') {c ->

    hostIp(c)
    echo "http://${readFile('hostIp').trim()}:27025/"
}
