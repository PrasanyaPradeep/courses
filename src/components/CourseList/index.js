import {Link} from 'react-router-dom'
import './index.css'

const CourseList = props => {
  const {details} = props
  const {id, name, logoUrl} = details

  return (
    <Link to={`courses/${id}`} className="link">
      <li className="course-list-container">
        <div className="card-container">
          <img src={logoUrl} alt={name} className="card-logo" />
          <p className="course-name">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default CourseList
