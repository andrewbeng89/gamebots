### Set up Nitrous.IO Node.js Box
1. If you have a Python Box, terminate it, OR create another Nitrous.IO account for Node.js
2. Follow the [SSH Lab](https://docs.google.com/a/smu.edu.sg/document/d/15_1Ic9ysOgr2ZHWVKbEZEm2cGMXDtniYka2YY0IfZQ0) to create an SSH key pair for this box


### Clone and Configure GameBots Demo App

1. Clone this repository `cd ~/ && git clone https://github.com/andrewbeng89/gamebots.git -b master`
2. `cd gamebots`
3. Reomve the .git directory `rm -rf .git`
4. Create a new GitHub repository with your account
5. Initialise the demo app as a git repo in Nitrous.IO `git init`
6. Add the remote to the newly create GitHub repository `git remote add origin git@github.com:<your_username>/<your_new_repo>.git`
7. Run the GameBots app in the Nitrous.IO environment: `node app`


### Using the Elastic Beanstalk Command Line Interface Tools

1. Sign up for Elastic Beanstalk, make sure you have created an [AWS Secret Key](https://console.aws.amazon.com/iam/home?#security_credential)
2. From the Nitrous.IO terminal, navigate to "home": `cd ~/`
3. Download the modified version of the EB CLI Tools from the Nitrous.IO terminal: `wget https://dl.dropboxusercontent.com/u/6484381/AWS-ElasticBeanstalk-CLI-2.6.0.zip`
4. Unzip: `unzip AWS-ElasticBeanstalk-CLI-2.6.0.zip`
5. Edit the `.bashrc` file using the IDE to add the PATH for the EB tools to the end of the file: `export PATH=$PATH:$PWD/AWS-ElasticBeanstalk-CLI-2.6.0/eb/linux/python2.7`
6. `source .bashrc` to refresh bash.
7. Navigate to application folder: `cd gamebots`
8. Initialise a new EB application: `eb init`
9. When prompted, enter your AWS Access Key ID and Secret respectively
10. Select `Asia Pacific (Singapore)` when prompted for the region
11. Enter an application name: `<yourname>-gamebots`
12. Use this application name for environment name as well
13. Select `WebServer::Standard::1.0` when promted for environment tier
14. Select option 12 for "solution stack" (64bit Amazon Linux 2014.02 running Node.js)
15. Select single or load balanced environment type
16. Do not create an RDS DB instance
17. Start the environment: `eb start`
18. `git add -A .`
19. `git commit -a -m "creating new gamebots project"`
20. `git push origin master && git aws.push`
21. Visit the [Elastic Beanstalk Console](https://console.aws.amazon.com/elasticbeanstalk/home?region=ap-southeast-1#/applications?applicationNameFilter=) to view your application's build status


### Setup and Build with Travis-CI

1. Register for [Travis-CI](https://travis-ci.org) using your GitHub account
2. From your Travis-CI [profile](https://travis-ci.org/profile) page, enable the newly created GitHub repository


### Install Travis Ruby Gem

The Travi-CI gem will be used to encrypt a OAuth2 token that will be used to push updates to Google App Engine from the Travis build.

1. From the terminal, install the gem by entering `gem install travis`


### AWS Security Credentials

1. If you haven't, create an Access Key with a corresponding ID and Secret [here](https://portal.aws.amazon.com/gp/aws/securityCredentials)
2. From the [EC2 console](https://console.aws.amazon.com/ec2/v2/home?region=ap-southeast-1), create a new Key Pair
3. Copy the values of the Access Key and Secret


### Automate EB updates with Travis

These lines in the .travis.yml file automates the updates to EB. The AWS Access Key ID and Secrets will be encrypted by travis and used upon a successful build.

<pre>
  <code>
after_success:
- wget https://dl.dropboxusercontent.com/u/6484381/AWS-ElasticBeanstalk-CLI-2.6.0.zip
- unzip AWS-ElasticBeanstalk-CLI-2.6.0.zip
- export PATH=$PATH:$PWD/AWS-ElasticBeanstalk-CLI-2.6.0/eb/linux/python2.7
- echo "no"|eb init -S $AWS_ACCESS_SECRET -I $AWS_ACCESS_KEY -a gamebots -e gamebots-env
  --region "ap-southeast-1" -t "WebServer::Standard::1.0" -s "64bit Amazon Linux 2014.02 running Node.js" -f
- eb push
  </code>
</pre>

1. Encrypt you AWS Access Key ID with the travis gem: `travis encrypt AWS_ACCESS_KEY="<paste_key_id_from_clipboard>" --add`
2. Encrypt you AWS Access Key Secret with the travis gem: `travis encrypt AWS_ACCESS_SECRET="<paste_key_secret_from_clipboard>" --add`
3. Edit this line of the .travis.yml file: `-a <name-of-your-app> -e <name-of-your-app>-env`


### Functional and Unit Testing with Moch and Travis-CI

The Mocha module allows developers to create simple functional and unit tests. In this sample app, the tests are in the /test/test.js file. This file tests the funcitonality of the index route. To break this test:

1. Comment out lines 39-41 in /app.js
2. Commit and push the changes
3. Track the build progress on travis-ci


### Additional tutorials

For for information on application development in the Cloud, including AngularJS, MongoDB and creating JSON APIs with Node.JS, please refer to [this](https://github.com/andrewbeng89/mitb_node_demo#part-3-application-development-in-the-cloud) repository.


### View the GameBots demo app [here](http://gamebots-env-hrrxxujvrm.elasticbeanstalk.com/index.html)