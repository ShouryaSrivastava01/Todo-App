# Todo App using Blockchain and IPFS (InterPlanetary File System) 

### Application UI
![App Face](./src/assets/site1.png "App Face")

### Tools Used 
* Remix IDE
* Ganache 
* IPFS Desktop
* MetaMask Wallet
* React.js


### Working 

![Model](./src/assets/model.jpg "Model")

* Task file will be stored in ipfs using ``` ipfs.add(file) ``` command.
* IPFS will return file path and store that file path in blockchain using ```add``` method defined in smart contract.
* Get the file path from blockchain using ```display``` method defined in smart contract.
* Extract the file data using  ```ipfs.cat(path)``` command.

We're using IPFS here, because to store data onto blockchain is costly & IPFS allows us to store large files and for security purposes we are using blockchain to store file address.


### Installation

```bash
npm install
```
To install all the dependencies and packages used in this project.

1. Grab the smart contract from ```src/contract/contract.sol```
2. Run it on Remix IDE
3. Copy the Contract's ABI from remix ide and store it in ```todo_abi.json```
4. Select your desired ethereum account and deploy the smart contract.
5. Copy contract address and save it in ```contractAddress``` detailed inside ```App.js``` file.


### Troubleshoot
* Go through the code carefully and use google for any minor issues
* Raise an issue if you can't find solutions online.
