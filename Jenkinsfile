pipeline {
    agent {
        label 'home-server'
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
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }

        stage('Verify Backend') {
            steps {
                sh '''
                    timeout 60 sh -c '
                    until curl -fs http://localhost:8080/actuator/health; do
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
                    timeout 60 sh -c '
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
            sh 'docker image prune -f'
            sh 'docker builder prune -f'
        }

        success {
            echo '✅ Deployment completed successfully.'
        }

        failure {
            echo '❌ Deployment failed.'
        }
    }
}