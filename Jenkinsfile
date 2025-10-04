pipeline {
    agent any
    tools { nodejs 'node20' }

    parameters {
        choice(name: 'TEST_TYPE', choices: ['UI', 'API'], description: 'Choose which tests to run')
    }

    options {
        timestamps()
        ansiColor('xterm')
    }

    triggers { cron('H */2 * * *') }   // svaka 2 sata

    environment {
        BASE_URL = 'https://practicesoftwaretesting.com'
    }

    stages {
        stage('Checkout repo') {
            steps {
                checkout scm
            }
        }

        stage('Node & NPM version') {
            steps {
                bat 'node -v && npm -v'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run UI tests') {
            when { expression { params.TEST_TYPE == 'UI' } }
            steps {
                withCredentials([string(credentialsId: 'loginPassword', variable: 'LOGIN_PASSWORD')]) {
                    bat 'npm run test:chai'
                }
            }
        }

        stage('Run API tests') {
            when { expression { params.TEST_TYPE == 'API' } }
            steps {
                bat 'npm run test:api'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/wdio-*.log, **/logs/**', allowEmptyArchive: true
        }
    }
}
