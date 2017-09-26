# CSC519-Project
Shared repo for CSC519 Devops project


### Jenkins and Environment Setup
Experiences & Difficulties (Mukundram):
- Recollected the usage of roles and playbooks in Ansible
- Learnt scripting in groovy; integerated groovy scripts as startup scripts for Jenkins
- Studied the various cases in which 'register' statement can be used within a playbook/role; ensured idempotency, several cases of which were becuase of the 'register' statement
- Familiarized with passing around usernames and passwords dynamically
- Faced issues related to status code that jenkins returned during different situations


### Jenkins Build
Experiences & Difficulties (Manushri):
- Learnt how to use Jenkins using CLI, especially with the various Jenkins user security mechanisms.
- Learnt how to create, update and delete a job in Jenkins. This project also gave me an opportunity to implement Ansible roles. 
- As the script needed to be idempotent, it was a little tricky to figure out how to restart Jenkins server and handle the various user login settings from CLI.
- It also gave me a good understanding on how a Jenkins Job looks like in the xml format.


### Checkbox.io
Experiences & Difficulties (Vishal):
- Learnt how to use vault to encrypt the DB passwords
- Since idempotency was needed to be considered, a bit more work was need to make sure of that.
- The ansible copy command did not work as expected when copying files within the remote server in python3. Had to do a workaround with the fetch module to make it work.
- I needed to use pymongo to add users in mongodb with ansible. This was not needed when I manually added the users, but since ansible uses python, I guess this dependency was introduced to interact with MongoDB.


### iTrust
Experiences & Difficulties (Dinesh):
- Learnt how to accept licenses non-interactively while installing packages (JDK and mysql)
- Learnt how to set up mysql-server without root password (during installation rather than modifying the user later)
- I needed to learn more about SIGNUP and how processes run in tty. I was able to start Apache Tomcat server but was unable to keep it in RUNNING state. Later learnt more about tty and NOHUP.


### References
1. https://gist.github.com/hayderimran7/50cb1244cc1e856873a4
2. https://www.calazan.com/ansible-playbook-for-provisioning-a-jenkins-ci-server/
3. https://metacpan.org/pod/jenkins-cli
