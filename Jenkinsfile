node('docker-slave') {
    checkout scm
    echo 'Building..'

    sh "npm install"
    sh "npm test"


}
