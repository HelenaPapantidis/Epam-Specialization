Feature: Language switch
  In order to use the site in my preferred language
  As a customer
  I want to be able to change the language

  Scenario: Change site language to German
    Given the user is on the home page
    When the user changes the language to "DE"
    Then the site should display the language as "DE"

  Scenario: Change site language to English
    Given the user is on the home page
    When the user changes the language to "EN"
    Then the site should display the language as "EN"
