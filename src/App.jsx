
import React, { useState } from 'react'
import './App.css'

function BudgetForm({ addTransaction }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('income')

  const handleSubmit = (event) => {
    event.preventDefault()
    const transaction = {
      id: Date.now(),
      description,
      amount,
      category
    }
    addTransaction(transaction)
    setDescription('')
    setAmount(0)
    setCategory('income')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <button type="submit">Add Transaction</button>
    </form>
  )
}

function BudgetTracker() {
  const [transactions, setTransactions] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [balance, setBalance] = useState(0)

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction])
    if (transaction.category === 'income') {
      setTotalIncome(totalIncome + Number(transaction.amount))
      setBalance(balance + Number(transaction.amount))
    } else {
      setTotalExpense(totalExpense + Number(transaction.amount))
      setBalance(balance - Number(transaction.amount))
    }
  }

  return (
    <div>
      <h1>Budget Tracker</h1>
      <BudgetForm addTransaction={addTransaction} />
      <div>
        <h2>Total Income: {totalIncome}</h2>
        <h2>Total Expense: {totalExpense}</h2>
        <h2>Balance: {balance}</h2>
      </div>
      <div>
        <h2>Transactions:</h2>
        <ul>
          {transactions.map((transaction) => (
            <><li key={transaction.id}>
              {transaction.description} - {transaction.amount} - {transaction.category}
            </li></>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BudgetTracker
