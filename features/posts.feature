@post
Feature: posts

@addFullPost
Scenario: add post with title and context
    Given je suis connecte avec Username 'testeur_integration' et Password 'testeur_qa' dans lenvironnement 'http://192.168.1.95:9091/admin/'
    When je clique sur add dans posts
    And je saisis Title "first post"
    And je saisis Content "Azul felawen"
    And je clique sur Save
    Then le post est ajoute

@addPostWithoutTitle
Scenario: add post without title
    Given je suis connecte avec Username 'testeur_integration' et Password 'testeur_qa' dans lenvironnement 'http://192.168.1.95:9091/admin/'
    When je clique sur add dans posts
    And je saisis Content "Azul fellawen"
    And je clique sur Save
    Then le message derreur saffiche 
    
@addPostWithoutContent
Scenario: add post without title
    Given je suis connecte avec Username 'testeur_integration' et Password 'testeur_qa' dans lenvironnement 'http://192.168.1.95:9091/admin/'
    When je clique sur add dans posts
    And je saisis Title "Title solo"
    And je clique sur Save
    Then le message derreur saffiche 

@addSamePostTwice
Scenario: add the same post addSamePostTwice
    Given je suis connecte avec Username 'testeur_integration' et Password 'testeur_qa' dans lenvironnement 'http://192.168.1.95:9091/admin/'
    When je clique sur add dans posts
    And je saisis Title "same post"
    And je saisis Content "hahaha"
    And je clique sur save and add another
    And je saisis Title "same post"
    And je saisis Content "hahaha"
    And je clique sur Save
    Then le message post existe deja saffiche


