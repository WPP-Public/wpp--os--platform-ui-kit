# Components Library
This is a monorepo for UI web-components built with Stencil.js and Storybook, where you can see those components in action.

## 1. Project setup
- Create an SSH key:  
https://docs.gitlab.com/ee/user/ssh.html
- Access Components Library repository:   
https://gitlab.com/2sixty/chaos/osmium/public/tools/platform-ui-kit
- Clone the repository with SSH:
git clone git@gitlab.com:2sixty/chaos/osmium/public/tools/platform-ui-kit.git  
- Install dependencies:  
```npm install```
- Build the project:  
```npm run build```
- Start the project with examples using one of the following variants for react/angular/vue examples respectfully:  
```npm run start:react```   
```npm run start:angular```  
```npm run start:vue```  
- Access the link with port (port is depending on the chosen framework):  
http://localhost:3000 (for react)  
http://localhost:4200 (for angular)  
http://localhost:5173 (for vue)  

## 2. E2E Automation tests  
**Main tests are functional tests with react framework**  
This project uses Playwright for E2E automation tests:  
[Playwright documentation](https://playwright.dev/docs/intro)
- After starting examples locally, go to packages > components-library-automation
- Tests can be run using the following commands:  
```npx playwright test```  
```npx playwright show-report```  
- In order to run particular tests, options needs to be specified:
Particular framework should be selected, specific tests, browser, headed or headless mode for tests execution, with/without debug:
```UI_FRAMEWORK=react npx playwright test tests/functional-tests/```  
```UI_FRAMEWORK=react npx playwright test tests/functional-tests/ --project=chromium --headed --debug```  
- Separate component tests can be run:
```UI_FRAMEWORK=react npx playwright test tests/functional-tests/checkboxes/ --project=chromium --headed --debug```  
- Remote test run is described in Docker folder specifications (docker-specs)
Job for E2E tests is manual and after run artifacts with report are generated and avaliable for download

## 3. Open Storybook locally
- Run command:  
```nvm install 16.20.0```  
- Run command:  
```nvm use 16.20.0```  
- Run command:  
```npm run start:storybook```  
- Open storybook locally  