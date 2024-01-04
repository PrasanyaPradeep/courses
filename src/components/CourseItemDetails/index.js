import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseDetails: [],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        description: data.course_details.description,
        name: data.course_details.name,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
      }
      console.log(data)
      console.log(updatedData)
      this.setState({
        courseDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderItemDetails = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="main-details-container">
        <img src={imageUrl} alt={name} className="details-image" />
        <div className="description-container">
          <h1 className="details-course-name">{name}</h1>
          <p className="details-description-name">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="description-failure">
        we cannot seem to find the page you are looking for{' '}
      </p>
      <button
        type="button"
        onClick={this.getCourseDetails}
        className="button-retry"
      >
        Retry
      </button>
    </div>
  )

  renderViewsBasedOnApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        <div className="course-details-container">
          {apiStatus === apiStatusConstants.initial && (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          )}
          {apiStatus !== apiStatusConstants.initial &&
            this.renderViewsBasedOnApi()}
        </div>
      </>
    )
  }
}
export default CourseItemDetails
