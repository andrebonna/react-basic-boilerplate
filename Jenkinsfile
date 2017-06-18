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
  return ip
  // return readFile('hostIp').trim()
}


docker.image('mongo').withRun('-p 27025:27017') {c ->
    echo hostIp(c)
    //echo "http://${readFile('hostIp').trim()}:27025/"
}
