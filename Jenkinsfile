pipeline {
    agent any
    stages {
       
        stage('build and install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.0-noble'
                }
            }

            steps {
                script {
                    sh 'mkdir -p reports'
                    sh 'ls -al' // Vérifie si "reports" est bien là
                    sh 'npm ci'
                    sh 'npx cucumber-js --config cucumber.js --format json:reports/cucumber-report.json || echo "Cucumber report failed"'
                    sh 'ls -al reports/' // Vérifie si "cucumber-report.json" a bien été généré
                    stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }
    }
    post {
    always {
        script {
            sh '[ -d reports ] && ls -al reports/ || echo "Le dossier reports/ est manquant !"'
            sh '[ -d allure-results ] && ls -al allure-results/ || echo "Le dossier allure-results/ est manquant !"'

            if (fileExists('reports/cucumber-report.json')) {
                cucumber(
                    buildStatus: 'UNSTABLE',
                    failedFeaturesNumber: 1,
                    failedScenariosNumber: 1,
                    skippedStepsNumber: 1,
                    failedStepsNumber: 1,
                    classifications: [
                        [key: 'Commit', value: "<a href='${env.GERRIT_CHANGE_URL}'>${env.GERRIT_PATCHSET_REVISION}</a>"],
                        [key: 'Submitter', value: "${env.GERRIT_PATCHSET_UPLOADER_NAME}"]
                    ],
                    reportTitle: 'My report',
                    fileIncludePattern: 'reports/cucumber-report.json',
                    sortingMethod: 'ALPHABETICAL',
                    trendsLimit: 100
                )
            } else {
                echo "⚠️ Le fichier reports/cucumber-report.json est introuvable, rapport Cucumber non généré."
            }

            if (fileExists('allure-results')) {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            } else {
                echo "⚠️ Le dossier allure-results/ est introuvable, rapport Allure non généré."
            }
        }
    }
}

}
