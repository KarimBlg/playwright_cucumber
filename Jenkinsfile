pipeline {
    agent any
    stages {
        stage('Clean Allure Reports') {
            steps {
                script {
                    sh 'rm -rf allure-results allure-report'  // Supprime les anciens résultats et rapports
                    sh 'mkdir -p allure-results'  // Recrée le dossier pour éviter les erreurs
                }
            }
        }

        stage('Build and Install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.0-noble'
                }
            }

            steps {
                script {
                    sh 'npm ci'
                    sh 'npx cucumber-js --config cucumber.js --format json:allure-results/cucumber-report.json'
                    stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }
    }

    post {
        always {
            script {
                unstash 'allure-results'  // Récupère les fichiers générés par Cucumber
                sh 'allure generate allure-results -o allure-report --clean'  // Génère un nouveau rapport propre

                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }
}
