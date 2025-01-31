pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'node-18', type: 'NodeJS' // NodeJS setup
        ALLURE_HOME = tool name: 'ALLURE_HOME', type: 'AllureCommandline' // Use Allure Commandline
        REPORT_DIR = "${WORKSPACE}/allure-reports" // Allure report directory
    }

    options {
        timeout(time: 15, unit: 'MINUTES') // Timeout for long builds
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm // Pull the latest code from the repository
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci' // Install Node dependencies on Unix
                    } else {
                        bat 'npm ci' // Install Node dependencies on Windows
                    }
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright install --with-deps' // Install Playwright browsers
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
                        sh 'npx playwright test --workers 4' // Run tests in parallel
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
                        npx allure-playwright merge allure-results
                        ${ALLURE_HOME}/bin/allure generate allure-results --clean -o ${REPORT_DIR}
                        '''
                    } else {
                        bat """
                        npx allure-playwright merge allure-results
                        %ALLURE_HOME%\\bin\\allure generate allure-results --clean -o %REPORT_DIR%
                        """
                    }
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']], // Path to allure-results
                    report: REPORT_DIR // Path to final Allure report
                ])
            }
        }

        stage('Archive Allure Report') {
            steps {
                archiveArtifacts allowEmptyArchive: true, artifacts: '**/allure-reports/*', onlyIfSuccessful: true
            }
        }
    }

    post {
        always {
            cleanWs() // Clean workspace after build
        }
    }
}
