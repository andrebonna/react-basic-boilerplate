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




docker.image('mongo').withRun('-p 27025:27017') {c ->

    def ip = sh script: "docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${c.id}", returnStdout: true
    echo ip
    //echo "http://${readFile('hostIp').trim()}:27025/"
}
