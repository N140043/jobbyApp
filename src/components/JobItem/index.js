import './index.css'

import {ImStarFull, ImLocation2, ImBriefcase} from 'react-icons/im'

import {Link} from 'react-router-dom'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
    packagePerAnnum,
    id,
  } = details
  //   console.log(details)
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-item-container">
        <div className="company-details-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-name-container">
            <h1 className="company-title">{title}</h1>
            <p className="company-rating">
              <ImStarFull className="star-icon" />
              {rating}
            </p>
          </div>
        </div>
        <div className="location-container">
          <div className="location-job-type">
            <p className="company-location">
              <ImLocation2 className="location-icon" />
              {location}
            </p>
            <p className="company-location">
              <ImBriefcase className="location-icon" />
              {employmentType}
            </p>
          </div>
          <p className="company-location">{packagePerAnnum}</p>
        </div>
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
