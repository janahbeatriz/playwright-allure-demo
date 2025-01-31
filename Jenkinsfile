pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJS'
        REPORT_DIR = "${WORKSPACE}/allure-reports"
    }

    options {
        timeout(time: 15, unit: 'MINUTES') // Prevent hung builds
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright install --with-deps'
                    } else {
                        bat 'npx playwright install --with-deps'
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright test --workers 4' // Parallel execution
                    } else {
                        bat 'npx playwright test --workers 4'
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        npx allure-playwright merge
                        npm install allure-commandline
                        npx allure generate allure-results --clean -o ${REPORT_DIR}
                        '''
                    } else {
                        bat '''
                        npx allure-playwright merge
                        npm install allure-commandline
                        npx allure generate allure-results --clean -o %REPORT_DIR%
                        '''
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
            node{
                deleteDir() // Safe workspace cleanup   
            }
        }
    }
}
