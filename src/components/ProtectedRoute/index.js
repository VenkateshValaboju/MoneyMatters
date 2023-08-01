import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const id = Cookie.get('id')
  if (id === undefined) {
    return <Redirect to="/login" />
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />
}
export default ProtectedRoute
