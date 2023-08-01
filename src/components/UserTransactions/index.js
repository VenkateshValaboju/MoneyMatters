import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import LastTransactionsComponent from '../LastTransactionsComponent'
import UserNavBar from '../UserNavBar'
import './index.css'

class UserTransactions extends Component {
  state = {
    transactions: [],
    displayTransactions: [],
    id: '',
    addTransactionName: '',
    addTransactionType: '',
    addTransactionCategory: '',
    addTransactionAmount: '',
    addTransactionDate: '',
  }

  componentDidMount() {
    console.log('RSM')
    this.getTheTransactionsList()
  }

  getTheTransactionsList = async () => {
    const {match} = this.props
    const {id} = match.params
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=500&offset=0'
    const headersDetails = {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret':
        'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      'x-hasura-role': 'admin',
      'x-hasura-user-id': `${id}`,
    }
    const options = {
      headers: headersDetails,
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const allTransactions = data.transactions.map(eachItem => ({
      amount: eachItem.amount,
      category: eachItem.category,
      date: eachItem.date,
      id: eachItem.id,
      transactionName: eachItem.transaction_name,
      type: eachItem.type,
      userId: eachItem.user_id,
    }))
    this.setState({
      transactions: allTransactions,
      displayTransactions: allTransactions,
      id,
    })
  }

  getTheTransactionsListTabChange = () => {
    const {transactions} = this.state
    this.setState({
      displayTransactions: transactions,
    })
  }

  getTheDebitList = () => {
    const {transactions} = this.state
    const DebitList = transactions.filter(eachItem => {
      if (eachItem.type === 'debit') {
        return true
      }
      return false
    })

    this.setState({
      displayTransactions: DebitList,
    })
  }

  getTheCreditList = () => {
    const {transactions} = this.state
    const CreditList = transactions.filter(eachItem => {
      if (eachItem.type === 'credit') {
        return true
      }
      return false
    })

    this.setState({
      displayTransactions: CreditList,
    })
  }

  deleteTransaction = id => {
    const {transactions} = this.state
    const newTransactionList = transactions.filter(eachItem => {
      if (id === eachItem.id) {
        return false
      }
      return true
    })
    this.setState({
      transactions: newTransactionList,
      displayTransactions: newTransactionList,
    })
  }

  updateTransaction = (
    id,
    updateTransactionName,
    updateTransactionType,
    updateTransactionCategory,
    updateTransactionAmount,
    updateTransactionDate,
  ) => {
    const {transactions} = this.state
    const newTransactionList = transactions.map(eachItem => {
      if (id === eachItem.id) {
        return {
          amount: updateTransactionAmount,
          category: updateTransactionCategory,
          date: Date(updateTransactionDate),
          id,
          transactionName: updateTransactionName,
          type: updateTransactionType,
          userId: eachItem.userId,
        }
      }
      return eachItem
    })

    this.setState({
      transactions: newTransactionList,
      displayTransactions: newTransactionList,
    })
  }

  addTransactionName = event => {
    this.setState({
      addTransactionName: event.target.value,
    })
  }

  addTransactionType = event => {
    this.setState({
      addTransactionType: event.target.value,
    })
  }

  addTransactionCategory = event => {
    this.setState({
      addTransactionCategory: event.target.value,
    })
  }

  addTransactionAmount = event => {
    this.setState({
      addTransactionAmount: event.target.value,
    })
  }

  addTransactionDate = event => {
    this.setState({
      addTransactionDate: event.target.value,
    })
  }

  AddTransaction = () => {
    const {
      addTransactionName,
      addTransactionType,
      addTransactionCategory,
      addTransactionAmount,
      addTransactionDate,
      transactions,
      id,
    } = this.state

    transactions.unshift({
      amount: addTransactionAmount,
      category: addTransactionCategory,
      date: Date(addTransactionDate),
      id: transactions.length + 1,
      transactionName: addTransactionName,
      type: addTransactionType,
      userId: id,
    })

    this.setState({
      transactions,
      displayTransactions: transactions,
    })
  }

  render() {
    const {
      displayTransactions,
      id,
      addTransactionName,
      addTransactionType,
      addTransactionCategory,
      addTransactionAmount,
      addTransactionDate,
    } = this.state

    return (
      <div className="transPage">
        <UserNavBar id={id} profileDetails="" />
        <div>
          <div>
            <div className="headerUser">
              <div className="bandt">
                <h3 className="headerTitle">Transactions</h3>
                <div>
                  <Popup
                    trigger={<button type="button">+ Add Transaction</button>}
                    modal
                    nested
                  >
                    {close => (
                      <div className="modal">
                        <div className="content">
                          <h1>Add Transaction</h1>
                          <p>Lorem ipsum dolor sit amet, consectetur </p>

                          <form onSubmit={this.AddTransaction}>
                            <label htmlFor="transName">Transaction Name</label>
                            <br />
                            <input
                              id="transName"
                              type="text"
                              placeholder=""
                              value={addTransactionName}
                              onChange={this.addTransactionName}
                            />
                            <br />
                            <label htmlFor="transType">Transaction Type</label>
                            <br />
                            <select
                              id="transType"
                              name="transType"
                              onChange={this.addTransactionType}
                              value={addTransactionType}
                            >
                              <option value="debit">Debit</option>
                              <option value="credit">Credit</option>
                            </select>
                            <br />
                            <label htmlFor="category">Category</label>
                            <br />
                            <input
                              id="category"
                              type="text"
                              onChange={this.addTransactionCategory}
                              value={addTransactionCategory}
                            />
                            <br />
                            <label htmlFor="Amount">Amount</label>
                            <br />
                            <input
                              id="Amount"
                              type="text"
                              placeholder=""
                              onChange={this.addTransactionAmount}
                              value={addTransactionAmount}
                            />
                            <br />
                            <label htmlFor="date">Date</label>
                            <br />
                            <input
                              id="date"
                              type="date"
                              onChange={this.addTransactionDate}
                              value={addTransactionDate}
                            />
                          </form>
                        </div>
                        <div>
                          <button
                            type="submit"
                            onClick={() => {
                              close()
                              this.AddTransaction()
                            }}
                          >
                            Add Transaction
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={this.getTheTransactionsListTabChange}
                >
                  All Transactions
                </button>
                <button onClick={this.getTheDebitList} type="button">
                  Debit
                </button>
                <button onClick={this.getTheCreditList} type="button">
                  Credit
                </button>
              </div>
            </div>

            <div>
              <ul>
                <li className="specialList">
                  <p className="label1">Transaction Name</p>
                  <p className="label2">Category</p>
                  <p className="label3">Date</p>
                  <p className="label4">Amount</p>
                </li>
                {displayTransactions.map(eachItem => (
                  <LastTransactionsComponent
                    transactionDetails={eachItem}
                    key={eachItem.id}
                    deleteTransaction={this.deleteTransaction}
                    updateTransaction={this.updateTransaction}
                    isAdmin="false"
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserTransactions
