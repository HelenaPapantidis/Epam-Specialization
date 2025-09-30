@registration @positive
Feature: User Registration

  Scenario: User can register with valid data
    Given the user is on the registration page
    When he uses valid registration data
    Then the user should be redirected to the login page
