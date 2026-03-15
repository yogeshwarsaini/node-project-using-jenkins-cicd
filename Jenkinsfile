// pipeline {
//     agent any

//     environment {
//         DOCKERHUB_USERNAME = "yogismash"
//         DOCKER_IMAGE = "${DOCKERHUB_USERNAME}/node-app"
//         CONTAINER_NAME = "my-container"

//         APP_PORT = "3000"
//         HOST_PORT = "3000"

//         DOCKERFILE_PATH = "."
//         HEALTH_CHECK_PATH = "/health"
//         WAIT_TIME = "5"
//         IMAGE_TAG = "${GIT_COMMIT}"
//     }

//     stages {

//         stage('Cleanup') {
//             steps {
//                 cleanWs()
//             }
//         }

//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 sh """
//                 docker build \
//                 -t ${DOCKER_IMAGE}:${IMAGE_TAG} \
//                 -t ${DOCKER_IMAGE}:latest \
//                 ${DOCKERFILE_PATH}
//                 """
//             }
//         }

        
//         stage('DockerHub Login') {
//     steps {
//         withCredentials([
//             usernamePassword(
//                 credentialsId: 'dockerhub-creds',
//                 usernameVariable: 'USER',
//                 passwordVariable: 'PASS'
//             )
//         ]) {
//             sh 'echo $PASS | docker login -u $USER --password-stdin'
//         }
//     }
// }




//         stage('Push Image') {
//             steps {
//                 sh """
//                 docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
//                 docker push ${DOCKER_IMAGE}:latest
//                 """
//             }
//         }

//         stage('Stop Old Container') {
//             steps {
//                 sh '''
//                 docker stop ${CONTAINER_NAME} || true
//                 docker rm ${CONTAINER_NAME} || true
//                 '''
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 sh """
//                 docker run -d \
//                 --name ${CONTAINER_NAME} \
//                 -p ${HOST_PORT}:${APP_PORT} \
//                 ${DOCKER_IMAGE}:latest
//                 """
//             }
//         }

//         stage('Verify') {
//             steps {
//                 sh "sleep ${WAIT_TIME}"
//                 sh "curl -f http://localhost:${HOST_PORT}${HEALTH_CHECK_PATH}"
//             }
//         }
//     }

//     post {
//         always {
//             sh 'docker image prune -f || true'
//         }
//     }
// }



 
     pipeline {
    agent any
    
  environment {
    DOCKERHUB_USERNAME = "yogeshwarsaini"
    DOCKER_IMAGE = "yogeshwarsaini/node-project"
    CONTAINER_NAME = "node-container"
    APP_PORT = "3000"
    HOST_PORT = "3000"
    DOCKERFILE_PATH = "."
    HEALTH_CHECK_PATH = "/"
    WAIT_TIME = "10"
    IMAGE_TAG = "${GIT_COMMIT}"
    SONAR_PROJECT_KEY = "sonar-key"
}

    stages {

        // ─────────────────────────────
        // Stage 1: Cleanup
        // ─────────────────────────────
        stage('Cleanup') {
            steps {
                cleanWs()
            }
        }

        // ─────────────────────────────
        // Stage 2: Checkout
        // ─────────────────────────────
        stage('Checkout') {
            steps {
                checkout scm
                echo "✅ Code checkout complete!"
            }
        }

        // ─────────────────────────────
        // Stage 3: SAST - SonarQube
        // ─────────────────────────────
        stage('SAST - SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        /opt/sonar-scanner/bin/sonar-scanner \
                          -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                          -Dsonar.projectName=${SONAR_PROJECT_KEY} \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://localhost:9000
                    """
                }
            }
        }

        // ─────────────────────────────
        // Stage 4: Quality Gate
        // ─────────────────────────────
        stage('Quality Gate') {
            steps {
                script {
                    try {
                        timeout(time: 15, unit: 'MINUTES') {
                            waitForQualityGate abortPipeline: false
                        }
                    } catch (err) {
                        echo "⚠️ Quality Gate timeout - continuing!"
                    }
                }
            }
        }

        // ─────────────────────────────
        // Stage 5: SCA - OWASP DC
        // ─────────────────────────────
        stage('SCA - OWASP Dependency Check') {
            steps {
                script {
                    try {
                        sh """
                            mkdir -p ./reports/dependency-check
                            /opt/dependency-check/bin/dependency-check.sh \
                              --project "my-app" \
                              --scan . \
                              --format HTML \
                              --format XML \
                              --out ./reports/dependency-check \
                              --failOnCVSS 7 \
                              --noupdate \
                              --data /opt/dependency-check/data
                        """
                    } catch (err) {
                        echo "⚠️ OWASP DC issue - continuing!"
                    }
                }
            }
            post {
                always {
                    dependencyCheckPublisher \
                        pattern: 'reports/dependency-check/dependency-check-report.xml'
                }
            }
        }

        // ─────────────────────────────
        // Stage 6: Docker Build
        // ─────────────────────────────
        stage('Build Docker Image') {
            steps {
                sh """
                    docker build \
                      -t ${DOCKER_IMAGE}:${IMAGE_TAG} \
                      -t ${DOCKER_IMAGE}:latest \
                      ${DOCKERFILE_PATH}
                """
                echo "✅ Docker image built!"
            }
        }

        // ─────────────────────────────
        // Stage 7: Trivy Image Scan
        // ─────────────────────────────
        stage('Trivy Image Scan') {
            steps {
                script {
                    sh """
                        mkdir -p reports/trivy

                        # Scan karo
                        trivy image \
                          --format table \
                          --output reports/trivy/trivy-report.txt \
                          --severity HIGH,CRITICAL \
                          ${DOCKER_IMAGE}:${IMAGE_TAG}

                        # Report print karo
                        cat reports/trivy/trivy-report.txt
                    """
                }
            }
        }

        // ─────────────────────────────
        // Stage 8: DockerHub Login
        // ─────────────────────────────
        stage('DockerHub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        // ─────────────────────────────
        // Stage 9: Push Image
        // ─────────────────────────────
        stage('Push Image') {
            steps {
                sh """
                    docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                    docker push ${DOCKER_IMAGE}:latest
                """
                echo "✅ Image pushed!"
            }
        }

        // ─────────────────────────────
        // Stage 10: Stop Old Container
        // ─────────────────────────────
        stage('Stop Old Container') {
            steps {
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                """
            }
        }

        // ─────────────────────────────
        // Stage 11: Deploy
        // ─────────────────────────────
        stage('Deploy') {
            steps {
                sh """
                    docker run -d \
                      --name ${CONTAINER_NAME} \
                      -p ${HOST_PORT}:${APP_PORT} \
                      --restart always \
                      --memory="512m" \
                      --cpus="0.5" \
                      ${DOCKER_IMAGE}:latest
                """
                echo "✅ App deployed!"
            }
        }

        // ─────────────────────────────
        // Stage 12: Verify
        // ─────────────────────────────
        stage('Verify') {
            steps {
                sh "sleep ${WAIT_TIME}"
                sh "curl -f http://localhost:${HOST_PORT}${HEALTH_CHECK_PATH}"
                echo "✅ App is healthy!"
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline Successful!'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
        always {
            // Reports archive karo
            archiveArtifacts \
                artifacts: 'reports/**/*',
                allowEmptyArchive: true

            // Cleanup
            sh 'docker image prune -f || true'
            cleanWs()
        }
    }
}

