### Clone and Configure GameBots Demo App

1. Clone this repository `git clone https://github.com/andrewbeng89/gamebots.git -b master`
2. `cd gamebots`
3. Reomve the .git directory `rm -rf .git`
4. Create a new GitHub repository with your account
5. Initialise the demo app as a git repo on the Nitrous.IO `git init`
6. Add the remote to the newly create GitHub repository `git remote add origin git@github.com:<your_username>/<your_new_repo>.git`
7. Run the GameBots app in the Nitrous.IO environment: `node app`


### Using the Elastic Beanstalk Command Line Interface Tools

1. Sign up for Elastic Beanstalk
2. From the Nitrous.IO terminal, navigate to "home": `cd ~/`
3. Download the modified version of the EB CLI Tools from the Nitrous.IO terminal: `wget https://dl.dropboxusercontent.com/u/6484381/AWS-ElasticBeanstalk-CLI-2.6.0.zip`
4. Unzip: `unzip AWS-ElasticBeanstalk-CLI-2.6.0.zip`
5. `vi .bashrc`  + [i] and add the PATH for the EB tools to the end of the file: `export PATH=$PATH:$PWD/AWS-ElasticBeanstalk-CLI-2.6.0/eb/linux/python2.7`
6. [esc] + `:wq` to save, and `source .bashrc` to refresh bash.
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
19. `git commit -m "creating new gamebots project"`
20. `git push origin master && git aws.push`
21. Visit the [Elastic Beanstalk Console](https://console.aws.amazon.com/elasticbeanstalk/home?region=ap-southeast-1#/applications?applicationNameFilter=) to view your application's build status