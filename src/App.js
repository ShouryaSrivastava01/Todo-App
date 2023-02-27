import Web3 from 'web3';
import todo_abi from './todo_abi.json'
import { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client'
import TodoCard from './component/TodoCard';
import toBuffer from 'it-to-buffer';
import CryptoJS from "crypto-js";
import Header from './component/Header';
import Footer from './component/Footer'
import './App.css';


const contractAddress = "0x2a7c7B6BBAc918403F987924b16769a408F79B78"
const client = create({ host: "127.0.0.1", port: 5002, protocol: "http" })

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null)
  const [task, setTask] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    setLoading(false)
    const load = async () => {
      if (window.ethereum) {

        const web3 = new Web3(window.ethereum)
        let acc = await web3.eth.getAccounts()
        setAccount(acc[0])

        const contract = new web3.eth.Contract(todo_abi, contractAddress)
        setContract(contract)
        if (contract) {
          const fileHash = await contract.methods.display(acc[0]).call()
          if (fileHash) {
            const bufferedContents = await toBuffer(client.cat(fileHash)) // returns a Buffer
            const text = new TextDecoder("utf-8").decode(bufferedContents)
            setTask(JSON.parse(text))
          }
          else {
            setTask([])
          }
        }

        window.ethereum.on('accountsChanged', function (accounts) {
          setAccount(accounts)
          setLoading(true)

        });
      }
      else {
        window.alert("No Ethereum Wallet Found")
      }

    }
    load()
  }, [loading])


  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: CryptoJS.SHA256(e.target.task.value + new Date()).toString(),
      task: e.target.task.value
    }
    setTask(old => [...old, newTask])
    e.target.task.value = ""
  }
  const deleteTask = (_id) => {
    const filtered = task.filter(item => item.id !== String(_id))
    setTask(filtered)
  }

  const handleSave = async () => {
    const add = await client.add(JSON.stringify(task))
    await contract.methods.add(account, add.path).send({ from: account, gas: 3000000 })
    setLoading(true)
  }
  return (
    <div className="App">
      <Header account={account} />
      <form className="addTask" onSubmit={handleSubmit}>
        <input type={"text"} id="task" placeholder="New Task Goes Here" autoComplete='off' />
        <input id='submit' type={"submit"} value="Add Task" />

      </form>
      <div className='taskCard'>

        {
          task.map((value) => {
            return (
              <TodoCard props={value} deleteTask={deleteTask} />
            )
          })
        }
      </div>
      <button className='saveBtn' onClick={handleSave}>Save</button>
      <Footer />
    </div>

  );
}

export default App;
