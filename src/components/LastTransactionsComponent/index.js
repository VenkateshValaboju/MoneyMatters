import {Component} from 'react'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

class LastTransactionsComponent extends Component {
  state = {
    transactionDetails: [],
    TDate: '',
    updateTransactionName: '',
    updateTransactionType: '',
    updateTransactionCategory: '',
    updateTransactionAmount: '',
    updateTransactionDate: '',
    isAdmin: 'false',
  }

  componentDidMount() {
    this.getTheTransactionsItem()
  }

  componentDidUpdate(prevProps, prevState) {
    const {transactionDetails} = this.props
    if (transactionDetails !== prevState.transactionDetails) {
      this.getTheTransactionsItem()
    }
  }

  getTheTransactionsItem = () => {
    const {transactionDetails, isAdmin} = this.props

    const D = Date(transactionDetails.date)
    const date = new Date(D.replace('IST', ''))

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const TDate = `${year}/${month}/${day}`

    this.setState({
      transactionDetails,
      TDate,
      updateTransactionName: transactionDetails.transactionName,
      updateTransactionType: transactionDetails.type,
      updateTransactionCategory: transactionDetails.category,
      updateTransactionAmount: transactionDetails.amount,
      updateTransactionDate: transactionDetails.date,
      isAdmin,
    })
  }

  onDeleteItem = () => {
    const {deleteTransaction, transactionDetails} = this.props
    const {id} = transactionDetails
    deleteTransaction(id)
  }

  onUpdateItem = () => {
    const {updateTransaction, transactionDetails} = this.props
    const {
      updateTransactionName,
      updateTransactionType,
      updateTransactionCategory,
      updateTransactionAmount,
      updateTransactionDate,
    } = this.state
    const {id} = transactionDetails

    updateTransaction(
      id,
      updateTransactionName,
      updateTransactionType,
      updateTransactionCategory,
      updateTransactionAmount,
      updateTransactionDate,
    )
  }

  transactionName = event => {
    this.setState({
      updateTransactionName: event.target.value,
    })
  }

  transactionType = event => {
    this.setState({
      updateTransactionType: event.target.value,
    })
  }

  transactionCategory = event => {
    this.setState({
      updateTransactionCategory: event.target.value,
    })
  }

  transactionAmount = event => {
    this.setState({
      updateTransactionAmount: event.target.value,
    })
  }

  transactionDate = event => {
    this.setState({
      updateTransactionDate: event.target.value,
    })
  }

  render() {
    const {
      transactionDetails,
      TDate,
      updateTransactionName,
      updateTransactionType,
      updateTransactionCategory,
      updateTransactionAmount,
      updateTransactionDate,
      isAdmin,
    } = this.state

    return (
      <li>
        <p className="list-tName">{transactionDetails.transactionName}</p>
        <p className="list-tcate">{transactionDetails.category}</p>
        <p className="list-tdate">{TDate}</p>
        <p className="list-tamo">$ {transactionDetails.amount}</p>
        {isAdmin === 'false' && (
          <div>
            <Popup
              trigger={
                <button type="button" className="list-tbut">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1_3974)">
                      <path
                        d="M14.9998 1.66675L18.3331 5.00008M1.66644 18.3334L2.73011 14.4333C2.79951 14.1789 2.8342 14.0516 2.88747 13.933C2.93476 13.8276 2.99288 13.7275 3.06087 13.6342C3.13745 13.5291 3.2307 13.4358 3.4172 13.2493L12.0284 4.63815C12.1934 4.47315 12.2759 4.39064 12.371 4.35973C12.4547 4.33254 12.5448 4.33254 12.6285 4.35973C12.7237 4.39064 12.8062 4.47315 12.9712 4.63815L15.3617 7.02868C15.5267 7.19368 15.6092 7.27619 15.6401 7.37132C15.6673 7.45501 15.6673 7.54515 15.6401 7.62884C15.6092 7.72398 15.5267 7.80648 15.3617 7.97149L6.75053 16.5827C6.56404 16.7692 6.47079 16.8624 6.36568 16.939C6.27235 17.007 6.17221 17.0651 6.06687 17.1124C5.94823 17.1657 5.82101 17.2004 5.56656 17.2697L1.66644 18.3334Z"
                        stroke="#2D60FF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_3974">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(-0.000244141 6.10352e-05)"
                        />
                      </clipPath>
                    </defs>
                  </svg>{' '}
                </button>
              }
              modal
              nested
            >
              {close => (
                <div className="modal">
                  <div className="content">
                    <h1>Update Transaction</h1>
                    <p>You can update your transaction here</p>

                    <form onSubmit={this.onUpdateItem}>
                      <label htmlFor="transName">Transaction Name</label>
                      <br />
                      <input
                        id="transName"
                        type="text"
                        placeholder=""
                        value={updateTransactionName}
                        onChange={this.transactionName}
                      />
                      <br />
                      <label htmlFor="transType">Transaction Type</label>
                      <br />
                      <select
                        id="transType"
                        name="transType"
                        value={updateTransactionType}
                        onChange={this.transactionType}
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
                        value={updateTransactionCategory}
                        onChange={this.transactionCategory}
                      />
                      <br />
                      <label htmlFor="Amount">Amount</label>
                      <br />
                      <input
                        id="Amount"
                        type="text"
                        placeholder=""
                        value={updateTransactionAmount}
                        onChange={this.transactionAmount}
                      />
                      <br />
                      <label htmlFor="date">Date</label>
                      <br />
                      <input
                        id="date"
                        type="date"
                        onChange={this.transactionDate}
                        value={updateTransactionDate}
                      />
                    </form>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={() => {
                        close()
                        this.onUpdateItem()
                      }}
                    >
                      Add Transaction
                    </button>
                  </div>
                </div>
              )}
            </Popup>
            <Popup
              trigger={
                <button type="button" onClick={this.onDeleteItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1_3976)">
                      <path
                        d="M13.3337 5.00008V4.33341C13.3337 3.39999 13.3337 2.93328 13.152 2.57676C12.9923 2.26316 12.7373 2.00819 12.4237 1.8484C12.0672 1.66675 11.6005 1.66675 10.667 1.66675H9.3337C8.40028 1.66675 7.93357 1.66675 7.57705 1.8484C7.26345 2.00819 7.00848 2.26316 6.84869 2.57676C6.66703 2.93328 6.66703 3.39999 6.66703 4.33341V5.00008M8.3337 9.58341V13.7501M11.667 9.58341V13.7501M2.50037 5.00008H17.5004M15.8337 5.00008V14.3334C15.8337 15.7335 15.8337 16.4336 15.5612 16.9684C15.3215 17.4388 14.9391 17.8212 14.4687 18.0609C13.9339 18.3334 13.2338 18.3334 11.8337 18.3334H8.16703C6.7669 18.3334 6.06684 18.3334 5.53206 18.0609C5.06165 17.8212 4.6792 17.4388 4.43952 16.9684C4.16703 16.4336 4.16703 15.7335 4.16703 14.3334V5.00008"
                        stroke="#FE5C73"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_3976">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.000366211 6.10352e-05)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              }
              modal
              nested
            >
              {close => (
                <div className="modal">
                  <div className="content">
                    <h1>Are you sure you want to delete the transaction?</h1>
                    <button type="button" onClick={() => close()}>
                      X
                    </button>
                    <p>
                      This transaction will be deleted immediately. You can’t
                      undo this action.
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        close()
                        this.onDeleteItem()
                      }}
                    >
                      Yes Delete
                    </button>
                    <button type="button" onClick={() => close()}>
                      No, Leave it
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        )}
      </li>
    )
  }
}

export default LastTransactionsComponent
