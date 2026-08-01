pipeline {
    agent {
        label 'home-server'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh '''
                        chmod +x mvnw
                        ./mvnw clean package -DskipTests
                    '''
                }
            }
        }

        stage('Deploy') {
    steps {
        sh '''
            echo "========== CURRENT DIRECTORY =========="
            pwd

            echo ""
            echo "========== FILES =========="
            ls -la

            echo ""
            echo "========== DOCKER COMPOSE CONFIG =========="
            docker compose config

            echo ""
            echo "========== DOCKER COMPOSE DOWN =========="
            docker compose down || true

            echo ""
            echo "========== DOCKER COMPOSE UP =========="
            docker compose up -d --build
        '''
    }
}

        stage('Verify Backend') {
            steps {
                sh '''
                    timeout 120 sh -c '
                    until curl -fs http://localhost:8081/actuator/health; do
                        echo "Waiting for backend..."
                        sleep 5
                    done
                    '
                '''
            }
        }

        stage('Verify Frontend') {
            steps {
                sh '''
                    timeout 120 sh -c '
                    until curl -fs http://localhost:4200; do
                        echo "Waiting for frontend..."
                        sleep 5
                    done
                    '
                '''
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f || true'
            sh 'docker builder prune -f || true'
        }

        success {
            echo '✅ Deployment completed successfully.'
        }

        failure {
            echo '❌ Deployment failed.'
        }
    }
}