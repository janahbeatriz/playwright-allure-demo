pipeline {
    agent any
    
    tools { nodejs "node-18" }

    environment {
        ALLURE_HOME = tool name: 'ALLURE_HOME', type: 'AllureCommandline' 
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
                bat '''
                %ALLURE_HOME%\\bin\\allure generate allure-results --clean -o %REPORT_DIR%
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
            node('built-in') {
                deleteDir() // Safe workspace cleanup   
            }
        }
    }
}
