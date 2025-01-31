pipeline {
    agent any
    
    tools { 
        nodejs "node-18"
        allure 'ALLURE_HOME' 
    }

    environment {
        REPORT_DIR = "${WORKSPACE}/allure-reports"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npx playwright test --workers 4'
                }
            }
        }

        stage('Check Allure Results') {
            steps {
                script {
                    echo "Checking if allure-results directory exists before merging"
                    bat 'if exist allure-results (dir allure-results) else (echo No allure-results found)'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    def maxRetries = 3
                    def retryCount = 0
                    while (retryCount < maxRetries) {
                        try {
                            if (isUnix()) {
                                sh '''
                                npm install allure-playwright allure-commandline --save-dev
                                npx allure-playwright merge allure-results
                                npx allure generate allure-results --clean -o ${REPORT_DIR}
                                '''
                            } else {
                                bat '''
                                npm install allure-playwright allure-commandline --save-dev
                                npx allure-playwright merge allure-results
                                npx allure generate allure-results --clean -o %REPORT_DIR%
                                '''
                            }
                            break // Exit loop if successful
                        } catch (Exception e) {
                            retryCount++
                            echo "Retry ${retryCount}/${maxRetries} failed. Retrying..."
                            if (retryCount == maxRetries) {
                                error "Allure report generation failed after ${maxRetries} retries."
                            }
                        }
                    }
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']],
                    report: REPORT_DIR
                ])
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts allowEmptyArchive: true, artifacts: '**/playwright-report/*', onlyIfSuccessful: true
                archiveArtifacts allowEmptyArchive: true, artifacts: '**/allure-reports/*', onlyIfSuccessful: true
            }
        }
    }

    post {
        always {
            node('built-in') {
                deleteDir() // Safe workspace cleanup   
            }
        }
    }
}
