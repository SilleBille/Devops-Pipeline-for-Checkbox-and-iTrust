# CSC519-Project - Milestone 2
Shared repo for CSC519 Devops project

## Screencast videos
1. [Initial setup of Jenkins and jobs](https://youtu.be/imblg5dbplI)
2. [iTrust Fuzzing demo](https://youtu.be/6xCsl53w4ZM)
3. [Checkbox.io Analysis demo](https://youtu.be/aLI4A-pZERQ)

## Environment required to run the project
    - Ubuntu 16.04 x64 (Desktop Edition) – running natively
    - Ansible 2.4.0.0 installed
    - Cloned Github repo – m2 branch
    
## Instructions to run the project
    git clone https://github.ncsu.edu/dmolugu/CSC519-Project.git
    cd CSC519-Project
    git checkout m2   
    cd ansible

    # Export GIT_ID and GIT_TOKEN
    export GIT_ID=<Unity ID>
    export GIT_TOKEN=<Personal access token>

### Cloned repo for iTrust used in this project
    https://github.ncsu.edu/dmolugu/iTrust-v23.git
    
### To setup the iTrust Environment
    ansible-playbook setupiTrust.yml -K --ask-vault-pass

### Jenkins Credentials
    Username: mkd_test1
    Password: mkd_test_passwd_1

#### Vault Password
    jenkins