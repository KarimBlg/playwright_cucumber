import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';


let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('I open the login page {string}', async function(env: string){
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto(env);
})

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('I should be redirected to the dashboard', async function(){
  const isDashboardVisible = await loginPage.isDashboardVisible();
  expect(isDashboardVisible).toBe(true); 
  await browser.close();
})

Then('I should see an error message', async function () {
  const errorMessage = await loginPage.errorMessage()
  expect(errorMessage).toBe(true); 
  await browser.close();
});
