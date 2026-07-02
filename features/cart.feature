@cart
Feature: Shopping cart
  As a shopper
  I want to manage items in my cart
  So that I can buy what I choose

  Background:
    Given I am on the shop homepage

  @smoke
  Scenario: A new visitor has an empty cart
    When I open the cart
    Then the cart is empty

  Scenario: Adding a product to the cart
    When I add the first product to the cart
    And I open the cart
    Then the cart contains that product

  Scenario: Closing the cart
    When I open the cart
    And I close the cart
    Then the cart is no longer visible
