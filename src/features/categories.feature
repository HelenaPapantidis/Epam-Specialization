Feature: Categories
  As a user
  I want to browse products by category
  So that I can find relevant products easily

  @categories
  Scenario: Open Hand Tools category
  Given the user is on the homepage
    When the user selects the "Hand Tools" category
    Then the category title should display "Category: Hand Tools"
    And the product list should not be empty
    And each listed product should display name and price
