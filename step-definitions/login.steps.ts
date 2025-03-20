import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';


let loginPage: LoginPage;

Given('I open the login page {string}', async function(env: string){
  loginPage = new LoginPage(this.page);
  await loginPage.visit(env);
})

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('I should be redirected to the dashboard', async function(){
  const isDashboardVisible = await loginPage.isDashboardVisible();
  expect(isDashboardVisible).toBe(true); 
  
})

Then('I should see an error message', async function () {
  const errorMessage = await loginPage.errorMessage()
  expect(errorMessage).toBe(true); 
  
})
