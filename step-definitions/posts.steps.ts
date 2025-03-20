import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { PostsPage } from '../pages/postsPage';
import { expect } from '@playwright/test';
import { Given, Then, When } from "@cucumber/cucumber";

let browser: Browser;
let page: Page;
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

Then('le post est ajoute', async () => {
  expect(await postsPage.isPostAdded()).toBeVisible;
  await browser.close();
})

When('je clique sur add dans posts', async () => {
  await postsPage.clicAdd()
})


Then('le message derreur saffiche', async () => {
  const errorMessage = await postsPage.errorMessage()
    expect(errorMessage).toBe(true); 
    await browser.close();
})

Given('je suis connecte avec Username {string} et Password {string} dans lenvironnement {string}',async function(username: string, password: string, env: string) {
  browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goto(env);
    await loginPage.login(username, password);
    postsPage = new PostsPage(page);
})

When('je clique sur save and add another',async () => {
  await postsPage.clicSaveAddAnother()
})

Then('le message post existe deja saffiche', async () => {
  const errorMessagePostExist = await postsPage.errorMessagePostExist()
    expect(errorMessagePostExist).toBe(true); 
    await browser.close();
})
