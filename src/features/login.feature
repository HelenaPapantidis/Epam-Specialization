@login
Feature: User Login

  @positive
  Scenario: User can log in with valid credentials
    Given the user has a registered account and is on the login page
    When the user enters valid login credentials
    And the user clicks the "Login" button
    Then the user should be redirected to the account page

  @negative @required
  Scenario Outline: Login fails when required field is empty
    Given the user is on the login page
    When the user enters email "<email>"
    And the user enters password "<password>"
    And the user clicks the "Login" button
    Then the user should see the error message "<error_message>"
    And the user should remain on the login page

    Examples:
      | email            | password    | error_message         |
      |                  | SomePass123 | Email is required     |
      | qa.user@test.com |             | Password is required  |

 
