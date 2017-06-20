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

def runTests(mongo, clean) {
    docker.image('node:7').inside {
        checkout scm
        echo 'Building..'
        stage ('Install') {
            if (clean != null && clean) {
                sh "rm -Rf node_modules"
            }
            sh "NODE_ENV=development yarn install"
        }
        stage ('Start') {
            sh "MONGO_DB=${mongo} PORT=3000 yarn start &"
            timeout(5) {
                waitUntil {
                    def r = sh script: 'wget -q http://localhost:3000 -O /dev/null', returnStatus: true
                    return (r == 0);
                }
            }
        }
        stage ('Test') {
            sh "yarn test"
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
}

def deploy(mongo) {
    docker.build('warehouse-control').run("--name warehouse-control -p 3000:3000 --env MONGO_DB=${mongo}")
}

node {
    docker.withServer(params.host) {
        def mongo = params.mongoURL

        stopContainer('build-mongo')
        if (mongo == null || mongo == '') {
            def c = docker.image('mongo').run('--name build-mongo')
            mongo = hostIp(c, daemonHost)
        }
        mongo = mongo.trim()

        runTests(mongo, params.clean)

        stage ('Deploy') {
            stopContainer('warehouse-control', daemonHost)
            removeImage('warehouse-control', daemonHost)

            deploy(mongo)
        }
    }
}
