pipeline {
    agent any
    parameters {
        string(name: 'ENV', defaultValue: 'recette', description: 'Choisir l’environnement: recette ou preprod')
    }
    stages {
        stage('Tests sur Recette') {
            when { expression { params.ENV == 'recette' } }
            steps {
                sh 'npx playwright test --config=playwright.recette.config.ts'
            }
        }
        stage('Tests sur Préprod') {
            when { expression { params.ENV == 'preprod' } }
            steps {
                sh 'npx playwright test --config=playwright.preprod.config.ts'
            }
        }
    }
}