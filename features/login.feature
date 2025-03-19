@login
Feature: Django Login

  @valid
  Scenario Outline: Successful login
    Given I open the login page "<env>"
    When I login with username "<username>" and password "<password>"
    Then I should be redirected to the dashboard

    @int
    Examples:
      | username              | password     | env                             |
      | testeur_integration   | testeur_qa   | http://int.siteinfos.com/admin/ |
      | testeur_integration_2 | testeur_qa_2 | http://int.siteinfos.com/admin/ |

    @rec
    Examples:
      | username          | password     | env                             |
      | testeur_recette   | testeur_qa_3 | http://rec.siteinfos.com/admin/ |
      | testeur_recette_2 | testeur_qa_4 | http://rec.siteinfos.com/admin/ |

  @invalid
  Scenario Outline: Failed login with wrong credentials
  Given I open the login page "<env>"
    When I login with username "<username>" and password "<password>"
    Then I should see an error message
    
    @int
    Examples:
      | username                 | password        | env |
      | testeur_integration_faux   | testeur_qa        | http://int.siteinfos.com/admin/ |
      | testeur_integration  | testeur_qa_faux   | http://int.siteinfos.com/admin/ |
      | testeur_integration_2_faux | testeur_qa_2      | http://int.siteinfos.com/admin/ |
      | testeur_integration_2      | testeur_qa_2_faux | http://int.siteinfos.com/admin/ |

     @rec
    Examples:
      | username                 | password        | env |
      | testeur_recette_faux   | testeur_qa_3        | http://rec.siteinfos.com/admin/ |
      | testeur_integration_faux   | testeur_qa_3_faux   | http://rec.siteinfos.com/admin/ |
      | testeur_recette_2_faux | testeur_qa_4      | http://rec.siteinfos.com/admin/ |
      | testeur_recette_2      | testeur_qa_4_faux | http://rec.siteinfos.com/admin/ |
