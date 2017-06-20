def hostIp(container, host) {
    def ip = sh script: "docker ${host} inspect --format='{{.NetworkSettings.IPAddress}}' ${container.id}", returnStdout: true
    return ip.trim()
}

def stopContainer(containerName, host) {
    try {
        sh "docker ${host} rm \$(docker ${host} stop ${containerName})"
    }
    catch(Exception ex) {
        echo "Container ${containerName} do not exist!"
    }
}

def removeImage(imageName, host) {
    try {
        sh "docker ${host} rmi -f ${imageName}"
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
    def mongo = params.mongoURL
    def daemonHost = params.host
    if (params.host == null) {
        daemonHost = '';
    }
    else {
        daemonHost = "-H ${daemonHost}";
    }

    stopContainer('build-mongo', daemonHost)
    if (mongo == null || mongo == '') {
        def c
        if (params.host == null) {
            c = docker.image('mongo').run('--name build-mongo')
        }
        else {
            docker.withServer(params.host) {
                c = docker.image('mongo').run('--name build-mongo')
            }
        }
        mongo = hostIp(c, daemonHost)
    }
    mongo = mongo.trim()

    if (params.host == null) {
        runTests(mongo, params.clean)
    }
    else {
        docker.withServer(params.host) {
            runTests(mongo, params.clean)
        }
    }

    stage ('Deploy') {
        stopContainer('warehouse-control', daemonHost)
        removeImage('warehouse-control', daemonHost)

        if (params.host == null) {
            deploy(mongo)
        }
        else {
            docker.withServer(params.host) {
                deploy(mongo)
            }
        }
    }
}
