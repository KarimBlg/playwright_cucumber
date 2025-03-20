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
                    sh 'npm ci'
                    sh 'npx cucumber-js --config cucumber.js --format json:reports/cucumber-report.json'
                    //sh 'allure generate ./allure-results -o ./allure-report'
                    //stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }
    }
    post {
    always {
        script {
            sh 'ls -al reports/'  // Vérifie la présence du rapport

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
                fileIncludePattern: 'reports/cucumber-report.json', // Assure-toi que le fichier existe !
                sortingMethod: 'ALPHABETICAL',
                trendsLimit: 100
            )
        }
    }
}
}
