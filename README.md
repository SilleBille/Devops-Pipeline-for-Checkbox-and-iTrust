# CSC519-Project - Milestone 3
Shared repo for CSC519 Devops project

## Screencast videos
1. [Deployment of iTrust, checkbox + Rolling update](https://youtu.be/h9HZ2_0ME5Q)
2. 
3. 

## Environment required to run the project
    - Ubuntu 16.04 x64 (Desktop Edition) – running natively
    - Ansible 2.4.0.0 installed
    - Cloned Github repo – m3 branch
    
## Instructions to setup deployment (1) and rolling-update (4)
    git clone https://github.ncsu.edu/dmolugu/CSC519-Project.git
    cd CSC519-Project
    git checkout m3
    cd productionDeployment

    # Export GIT_ID and GIT_TOKEN
    export GIT_ID_P=<Unity ID>
    export GIT_TOKEN_P=<Personal access token>
    export AWS_KEY=<AWS KEY>
    export AWS_SECRET_KEY=<AWS SECRET KEY>

***Cloned repo for iTrust used in this project***
    https://github.ncsu.edu/dmolugu/iTrust-v23.git

***Clone repo for checkbox.io used for Deployment***
    https://github.ncsu.edu/dmolugu/checkbox.io

### To setup iTrust and checkbox.io jenkins job
    ansible-playbook --ask-vault-pass deploy.yml

#### Jenkins Credentials (Used internally)
    Username: mkd_test1
    Password: mkd_test_passwd_1

#### Vault Password (need to be provided while running the ansible-playbook)
    jenkins

### Team Members and Their Contributions

- Vishal Murugan (vmuruga)

- Dinesh Prasanth M K (dmolugu)
    - Created Ansible Playbook for setting up EC2 instances (for checkbox and iTrust deployment), Jenkins and the environment required for iTrust and checkbox deployment
    - Configuration of auto-trigger for checkbox and iTrust jobs whenever there is a push to github repo
    - iTrust rolling update

- Manushri (manush)

- Mukundram Muraliram (mmurali5)

