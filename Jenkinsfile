node('docker-slave') {
    checkout scm
    echo 'Building..'

    sh "npm install"
    sh "npm start"
    sh "npm test"


}
