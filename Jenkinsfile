pipeline {
    agent any

    stages {
        stage('build and install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.0-noble'
                    args '-u root:root'
                }
            }

            steps {
                script {
                    sh 'mkdir -p reports'
                    sh 'npm ci'
                    sh 'npx cucumber-js --config cucumber.js'
                    stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    // Verify if allure-results exists before unstashing
                    if (fileExists('allure-results')) {
                        unstash 'allure-results'
                        sh 'allure generate allure-results --output allure-report'  // Generate the allure report
                    } else {
                        echo "No allure-results found, skipping report generation."
                    }
                }
            }
        }
    }

    post {
        always {
            // Ensure that the generated allure report exists before attempting to display it
            script {
                if (fileExists('allure-report')) {
                    echo 'Allure report generated successfully.'
                } else {
                    echo 'Allure report generation failed or was skipped.'
                }
            }
        }
    }
}
