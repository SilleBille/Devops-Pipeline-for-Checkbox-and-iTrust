# CSC519-Project
Shared repo for CSC519 Devops project

## Screencast videos
1. [Initial setup of Jenkins and jobs](https://youtu.be/imblg5dbplI)
2. [Checkbox.io demo](https://youtu.be/aLI4A-pZERQ)
3. [iTrust demo](https://youtu.be/6xCsl53w4ZM)

## Environment required to run the project
    - Ubuntu 16.04 x64 (Desktop Edition) – running natively
    - Ansible 2.4.0.0 installed
    - Cloned Github repo – m1 branch
    
## Instructions to run the project
    git clone https://github.ncsu.edu/dmolugu/CSC519-Project.git
    cd CSC519-Project
    git checkout m1    
    cd jenkins_build
    
### To run the complete setup
    ansible-playbook -s jenkins.yml --ask-vault-pass -e "gitid=<GitHub ID> gitpassword=<Personal GitHub Token>" -K
    
### To setup Jenkins Environment
    ansible-playbook -s installJenkins.yml --ask-vault-pass -K
    
### To setup Jenkins build jobs
    ansible-playbook -s	jenkinsBuild.yml --ask-vault-pass -e "gitid=<GitHub ID> gitpassword=<Personal GitHub Token>" -K

### Jenkins Credentials
    Username: mkd_test_1
    Password: mkd_test_passwd_1

#### Vault Password
    jenkins

### Details about the directory structure
* The `app_deploy` contains the code to deploy **iTrust** and **checkbox.io**. This folder is zipped and placed [here](https://github.ncsu.edu/dmolugu/CSC519-Project/tree/m1/jenkins_build/roles/setup_ansible_files/files)
* The `jenkins_build` contains the code to setup Jenkins Environment and create build jobs for **iTrust** and **checkbox.io**

### Jenkins and Environment Setup
Experiences & Difficulties (Mukundram - mmurali5):
- Recollected the usage of roles and playbooks in Ansible
- Learnt scripting in groovy; integerated groovy scripts as startup scripts for Jenkins
- Studied the various cases in which 'register' statement can be used within a playbook/role; ensured idempotency, several cases of which were becuase of the 'register' statement
- Familiarized with passing around usernames and passwords dynamically
- Faced issues related to status code that jenkins returned during different situations


### Jenkins Build
Experiences & Difficulties (Manushri - manush):
- Learnt how to use Jenkins using CLI, especially with the various Jenkins user security mechanisms.
- Learnt how to create, update and delete a job in Jenkins. This project also gave me an opportunity to implement Ansible roles. 
- As the script needed to be idempotent, it was a little tricky to figure out how to restart Jenkins server and handle the various user login settings from CLI.
- It also gave me a good understanding on how a Jenkins Job looks like in the xml format.


### Checkbox.io
Experiences & Difficulties (Vishal - vmuruga):
- Learnt how to use vault to encrypt the DB passwords
- Since idempotency was needed to be considered, a bit more work was need to make sure of that.
- The ansible copy command did not work as expected when copying files within the remote server in python3. Had to do a workaround with the fetch module to make it work.
- I needed to use pymongo to add users in mongodb with ansible. This was not needed when I manually added the users, but since ansible uses python, I guess this dependency was introduced to interact with MongoDB.


### iTrust
Experiences & Difficulties (Dinesh - dmolugu):
- Learnt how to accept licenses non-interactively while installing packages (JDK and mysql)
- Learnt how to set up mysql-server without root password (during installation rather than modifying the user later)
- I needed to learn more about SIGNUP and how processes run in tty. I was able to start Apache Tomcat server but was unable to keep it in RUNNING state. Later learnt more about tty and NOHUP.


### References
1. [Creating user through groovy script](https://gist.github.com/hayderimran7/50cb1244cc1e856873a4)
2. [Automating provisioning of Jenkins server](https://www.calazan.com/ansible-playbook-for-provisioning-a-jenkins-ci-server/)
3. [Creating Jobs through Jenkins CLI](https://metacpan.org/pod/jenkins-cli)
4. [Accepting licenses through Ansible](https://coderwall.com/p/zzdapg/ansible-recipe-to-install-java-7-selecting-the-oracle-license)
5. [Using the debconf module in ansible](http://ansible-manual.readthedocs.io/en/latest/debconf_module.html)
6. [Installing Java](https://askubuntu.com/questions/190582/installing-java-automatically-with-silent-option/637514#637514)
7. [Installing mySQL without root password](https://stackoverflow.com/questions/7739645/install-mysql-on-ubuntu-without-password-prompt)
8. [Installing Tomcat](https://tecadmin.net/install-tomcat-9-on-ubuntu/#)
9. [Deploying to Tomcat](https://www.mkyong.com/maven/how-to-deploy-maven-based-war-file-to-tomcat/)
