import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseList from '../CourseList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coursesList: [],
  }

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedList = data.courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))
      console.log(updatedList)
      this.setState({
        coursesList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="description-failure">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.getCoursesList}
        className="button-retry"
      >
        Retry
      </button>
    </div>
  )

  renderCoursesListView = () => {
    const {coursesList} = this.state
    return (
      <ul className="un-order-course-list">
        {coursesList.map(eachCourse => (
          <CourseList key={eachCourse.id} details={eachCourse} />
        ))}
      </ul>
    )
  }

  renderViewsBasedOnApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesListView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
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
        <div className="main-container">
          <h1 className="main-heading">Courses</h1>
          {apiStatus === apiStatusConstants.initial && (
            <div data-testid="loader" className="loader-container">
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

export default Home
