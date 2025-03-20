import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { PostsPage } from '../pages/postsPage';
import { expect } from '@playwright/test';
import { Given, Then, When } from "@cucumber/cucumber";


let loginPage: LoginPage;
let postsPage: PostsPage;


When('je saisis Title {string}', async (title: string) => {
  await postsPage.writeTitle(title)
})

When('je saisis Content {string}', async (content: string) => {
    await postsPage.writeContent(content)
})

When('je clique sur Save',async  () => {
  await postsPage.clicSave()
})

Then('le post est ajoute', async function() {
  const successMessage = await postsPage.isPostAdded()
  expect(successMessage).toBe(true); 
 
})

When('je clique sur add dans posts', async () => {
  await postsPage.clicAdd()
})


Then('le message derreur saffiche', async () => {
    const errorMessage = await loginPage.errorMessage()
    expect(errorMessage).toBe(true); 

})

Given('je suis connecte avec Username {string} et Password {string} dans lenvironnement {string}',async function(username: string, password: string, env: string) {

    loginPage = new LoginPage(this.page);
    await loginPage.visit(env);
    await loginPage.login(username, password);
    postsPage = new PostsPage(this.page);
})

When('je clique sur save and add another',async () => {
  await postsPage.clicSaveAddAnother()
})

Then('le message post existe deja saffiche', async () => {
  const errorMessage = await loginPage.errorMessage()
    expect(errorMessage).toBe(true); 
    

})
