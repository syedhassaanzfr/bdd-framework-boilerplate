@shop
Feature: Browsing the shop
  As a visitor
  I want to browse and organise the product catalogue
  So that I can find a tote bag I like

  Background:
    Given I am on the shop homepage

  @smoke
  Scenario: The shop welcomes the visitor
    Then I should see the heading "Carry Something Worth Noticing"
    And I should see at least 1 product

  Scenario: Every product is ready to buy
    Then every product shows a name, a price and an "Add to Cart" button

  Scenario Outline: Sorting products by price
    When I sort products by "<order>"
    Then the product prices are in <direction> order

    Examples:
      | order      | direction  |
      | Low → High | ascending  |
      | High → Low | descending |

  Scenario Outline: Viewing prices in another currency
    When I switch the currency to "<currency>"
    Then product prices are shown in "<symbol>"

    Examples:
      | currency | symbol |
      | USD      | $      |
      | EUR      | €      |
