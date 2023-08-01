import {Component} from 'react'
import UserNavBar from '../UserNavBar'
import './index.css'

class UserProfile extends Component {
  state = {
    profileDetails: {},
  }

  componentDidMount() {
    this.getTheProfile()
  }

  getTheProfile = async () => {
    const {match} = this.props
    const {id} = match.params
    const url = 'https://bursting-gelding-24.hasura.app/api/rest/profile'
    const headersDetails = {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret':
        'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      'x-hasura-role': 'user',
      'x-hasura-user-id': `${id}`,
    }
    const options = {
      headers: headersDetails,
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const responseData = data.users[0]

    const profileDetails = {
      city: responseData.city,
      country: responseData.country,
      dateOfBirth: responseData.date_of_birth,
      email: responseData.email,
      id: responseData.id,
      name: responseData.name,
      permanentAddress: responseData.permanent_address,
      postalCode: responseData.postal_code,
      presentAddress: responseData.present_address,
    }

    this.setState({
      profileDetails,
      id,
    })
  }

  render() {
    const {profileDetails, id} = this.state

    return (
      <div className="profilePage">
        <UserNavBar id={id} profileDetails={profileDetails} />
        <div>
          <div className="header">
            <h3 className="headerTitle">Profile</h3>
          </div>
          <div className="profile-space">
            <div className="profileBox">
              <div className="profileItem">
                <h5>Your Name</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.name}</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>User Name</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.name}</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>Email</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.email}</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>Password</h5>
                <div className="detailBox">
                  <p className="info">**********</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>Date of Birth</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.dateOfBirth}</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>Present Address</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.presentAddress}</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>Permanent Address</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.permanentAddress}</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>City</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.city}</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>Postal Code</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.postalCode}</p>
                </div>
              </div>
              <div className="profileItem">
                <h5>Country</h5>
                <div className="detailBox">
                  <p className="info">{profileDetails.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile
