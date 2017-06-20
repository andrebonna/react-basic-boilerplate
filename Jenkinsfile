def hostIp(container) {
    def ip = sh script: "docker inspect --format='{{.NetworkSettings.IPAddress}}' ${container.id}", returnStdout: true
    return ip.trim()
}

def stopContainer(containerName) {
    try {
        sh "docker rm \$(docker stop ${containerName})"
    }
    catch(Exception ex) {
        echo "Container ${containerName} do not exist!"
    }
}

def removeImage(imageName) {
    try {
        sh "docker rmi -f ${imageName}"
    }
    catch(Exception ex) {
        echo "Image ${imageName} do not exist!"
    }
}

node {
    checkout scm
    def mongo = params.mongoURL
    if (mongo == null || mongo == '') {
        stopContainer('build-mongo')
        def c = docker.image('mongo').run('--name build-mongo')
        mongo = hostIp(c)
    }

    mongo = mongo.trim()

    docker.image('node:7').inside {
        echo 'Building..'
        stage ('Install') {
            if (params.clean != null && params.clean == "true") {
                sh "rm -Rf node_modules"
            }
            sh "NODE_ENV=development npm install"
        }
        stage ('Start') {
            sh "MONGO_DB=${mongo} PORT=3000 npm start &"
            timeout(1) {
                waitUntil {
                    def r = sh script: 'wget -q http://localhost:3000 -O /dev/null', returnStatus: true
                    return (r == 0);
                }
            }
        }
        stage ('Test') {
            sh "npm test"
            junit 'test-report.xml'
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: false,
                reportDir: 'coverage',
                reportFiles: 'index.html',
                reportName: 'HTML Report',
                reportTitles: ''
            ])
        }
    }

    stage ('Deploy') {
        stopContainer('warehouse-control')
        removeImage('warehouse-control')
        docker.build('warehouse-control').run("--name warehouse-control -p 3000:3000 --env MONGO_DB=${mongo}")
    }
}
