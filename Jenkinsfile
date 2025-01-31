pipeline {
    agent any
    
    tools { 
        nodejs "node-18"
        allure 'ALLURE_HOME'  // This should be correctly configured in Jenkins
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

        stage('Ensure Allure is Installed') {
            steps {
                script {
                    echo "Checking if Allure is installed..."
                    try {
                        bat 'allure --version'
                    } catch (Exception e) {
                        echo "Allure is not installed globally, installing it now..."
                        bat 'npm install allure-commandline -g'
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat '''
                allure generate allure-results --clean -o %REPORT_DIR%
                '''
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
            cleanWs() // Workspace cleanup
        }
    }
}
