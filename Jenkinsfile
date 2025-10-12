pipeline {
    agent any
    tools { nodejs 'node20' }

    parameters {
        choice(
            name: 'TEST_TYPE',
            choices: ['UI', 'API', 'ALL'],
            description: 'Choose which tests to run'
        )
    }

    options {
        timestamps()
        ansiColor('xterm')
    }

    //  Pokreće se automatski svaka 2h (možeš promeniti po potrebi)
    triggers { cron('H */2 * * *') }

    environment {
        BASE_URL = 'https://practicesoftwaretesting.com'
    }

    stages {
        stage('Checkout repository') {
            steps {
                checkout scm
            }
        }

        stage('Show Node & NPM versions') {
            steps {
                bat 'node -v && npm -v'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Create .env file') {
            steps {
                // automatski pravi .env fajl za UI testove
                withCredentials([string(credentialsId: 'loginPassword', variable: 'LOGIN_PASSWORD')]) {
                    bat """
                        echo BASE_URL=${BASE_URL} > .env
                        echo LOGIN_PASSWORD=%LOGIN_PASSWORD% >> .env
                    """
                }
            }
        }

        stage('Run linters') {
            steps {
                echo ' Running ESLint & Prettier checks...'
                bat 'npm run lint'          
                bat 'npm run lint:fix'      
            }
        }

        stage('Run UI tests') {
            when {
                expression { params.TEST_TYPE == 'UI' || params.TEST_TYPE == 'ALL' }
            }
            steps {
                echo ' Running WDIO UI tests...'
                bat 'npm run test:chai'
            }
        }

        stage('Run API tests') {
            when {
                expression { params.TEST_TYPE == 'API' || params.TEST_TYPE == 'ALL' }
            }
            steps {
                echo ' Running API tests...'
                bat 'npm run test:api'
            }
        }
    }

    post {
        always {
            echo ' Archiving logs and reports...'
            archiveArtifacts artifacts: '**/wdio-*.log, **/logs/**, **/reports/**', allowEmptyArchive: true
        }
        success {
            echo ' Pipeline finished successfully!'
        }
        failure {
            echo ' Pipeline failed — check console output for errors.'
        }
    }
}
