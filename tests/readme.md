# Setup for test cases

To run the test cases do the following setup:
1. Create a subscriber subaccount, Name it **testaccount1**
2. Enable CloudFoundry.
3. Create A CIS Service Instance in that subaccount.
4. Create a service key and copy it.
5. Paste it inside the cis.json file
6. In config.js file
   1. Update username with a technical user.
   2. Update the password with the password of the technical user.
7. Update the file **env.js** with the system and app environment variable of the deployed application.
8. In the file, **onboarding.test.js** update the application urls.
9. Run the command **npm run test** in test directory to execute the test cases.