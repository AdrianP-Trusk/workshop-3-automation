Feature: Sample workshop test feature

    @webdriver @debug
    Scenario: Test Scenario

      Given Hasan is a Trusk B2B (default) customer
      When Hasan is logged on Trusk Business
      And Hasan fills the quote form
      Then Hasan can see quote created confirmation panel
