import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import UserTransactions from './components/UserTransactions'
import UserProfile from './components/UserProfile'
import AdminAllTransactions from './components/AdminAllTransactions'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute
        exact
        path="/admin-dashboard"
        component={AdminDashboard}
      />
      <ProtectedRoute exact path="/user/:id" component={UserDashboard} />
      <ProtectedRoute
        exact
        path="/user/:id/transactions"
        component={UserTransactions}
      />
      <ProtectedRoute exact path="/user/:id/profile" component={UserProfile} />
      <ProtectedRoute
        exact
        path="/admin/transactions"
        component={AdminAllTransactions}
      />
      <Route path="/not-found" exact component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
