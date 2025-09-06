import test from '../fixtures/baseTest';


// test('Login should redirect to inventory', async ({ page, loginPage, allure }) => {
//   allure.label('feature', 'Login');
//   allure.label('severity', 'critical');
//   allure.owner('Chi');
//   allure.description('Verify that a valid user can log in and is redirected to the inventory page.');

//   await loginPage.gotoLogin();
//   await loginPage.login('standard_user', 'secret_sauce');
// });

  test('@smoke Login test2', async ({ page, loginPage, allure }) => {
     allure.label('feature', 'Login');
    allure.label('severity', 'critical');
    allure.owner('Chi');
    allure.description('Verify that a valid user can log in and is redirected to the inventory page.');
    await allure.step('Go to login page', async () => {
      await loginPage.gotoLogin();
    });

    await allure.step('Enter valid credentials', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await allure.step('Take screenshot after login', async () => {
      const screenshot = await page.screenshot();
      allure.attachment('Login Screenshot', screenshot, 'image/png');
    });
});



