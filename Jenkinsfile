pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJS'
        REPORT_DIR = "${WORKSPACE}/allure-reports"
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
                        sh 'npx playwright test'
                    } else {
                        bat 'npx playwright test'
                    }
                }
            }
        }

        stage('Create Report Folder') {
            steps {
                script {
                    if (isUnix()) {
                        sh "mkdir -p ${REPORT_DIR}"
                    } else {
                        bat "mkdir ${REPORT_DIR}"
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install allure-commandline'
                        sh "npx allure generate allure-results --clean -o ${REPORT_DIR}"
                    } else {
                        bat 'npm install allure-commandline'
                        bat "npx allure generate allure-results --clean -o ${REPORT_DIR}"
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
                archiveArtifacts allowEmptyArchive: true, artifacts: '**/allure-reports/*', onlyIfSuccessful: true
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
