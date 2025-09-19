To use interactive docker-compose for tests:
    - cd docker-specs
    - if you pulled some changes of docker or code, run next command to rebuild images
        - sudo docker-compose -f interactive.docker-compose.yaml build
    - docker-compose -f interactive.docker-compose.yaml run e2e-shell
    - wait untill it loads and you enter interactive docker mode
    - if you have project with no node modules and playright installed or the current version of your modules conflicts in docker,delete node_modules and run the next commands:
        -  npm install --no-audit --progress=false
        -  npx playwright install
        -  npx patch-package @playwright/test 
    - after you installed all packages(they will also appear on your host machines)
    - to run tests go to tests folder and run the tests:
      - cd /app/packages/components-library-automation
      - npx playwright test tests/
the results will also appear on your host system so you can immediatly open and observe the results
if you change tests code or example screenshots, you don`t need to restart docker-compose, simply run tests again.

If you want just to run tests
    - cd docker-specs
    - docker-compose -f e2e.docker-compose.yaml run e2e-tests
    - the test results will appear in root folder of the project(it was initially made only for ci-cd)
