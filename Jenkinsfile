pipeline {
    agent any
    
    tools { nodejs "node-18" }
    environment {
        //NODE_HOME = tool name: 'node-18', type: 'NodeJS'
        REPORT_DIR = "${WORKSPACE}/allure-reports"
    }
    stages {
        stage('Install Dependencies') {
            steps { bat 'npm ci' }
        }

        stage('Install Playwright Browsers') {
            steps { bat 'npx playwright install --with-deps' }
        }

        stage('Run Playwright Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npx playwright test --workers 4'
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
            node('built-in') {
                deleteDir() // Safe workspace cleanup   
            }
        }
    }
}
