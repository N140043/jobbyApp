import './index.css'

import {ImStarFull, ImLocation2, ImBriefcase} from 'react-icons/im'

import {Link} from 'react-router-dom'

import {AiOutlineSelect} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'

const status = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProcess: 'IN PROCESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: status.initial,
    jobItemDetails: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: status.inProcess})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {
      params: {id},
    } = match
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    const updateData = {
      jobDetails: {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        title: data.job_details.title,
      },
      similarJobs: data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        location: each.location,
        rating: each.rating,
        title: each.title,
      })),
    }
    console.log(updateData)
    if (response.ok) {
      this.setState({jobItemDetails: updateData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  loading = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-icon"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        we cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-retry-btn"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  apiSuccessView = () => {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      jobDescription,
      packagePerAnnum,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobItemDetails.jobDetails
    return (
      <>
        <div className="job-item-details-container">
          <div className="company-details-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <div className="heading-container">
              <h1 className="description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="visit-heading">
                Visit
                <AiOutlineSelect className="visit" />
              </a>
            </div>
            <p className="description">{jobDescription}</p>
          </div>
          <div className="skills-outer-container">
            <h1 className="description-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <li key={each.name} className="each-skill">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skill-icon"
                  />
                  <p className="skill-name">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="description-heading">Life at Company</h1>
            <div className="description-container-job-item">
              <p className="description">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-job-items-container">
          {jobItemDetails.similarJobs.map(similarJob => (
            <Link to={`/jobs/${similarJob.id}`} className="link">
              <li key={similarJob.id} className="similar-job-item">
                <div className="company-details-container">
                  <img
                    src={similarJob.companyLogoUrl}
                    alt="similar job company logo"
                    className="company-logo"
                  />
                  <div className="company-name-container">
                    <h1 className="company-title">{similarJob.title}</h1>
                    <p className="company-rating">
                      <ImStarFull className="star-icon" />
                      {similarJob.rating}
                    </p>
                  </div>
                </div>
                <div className="description-container">
                  <h1 className="description-heading">Description</h1>
                  <p className="description">{similarJob.jobDescription}</p>
                </div>
                <div className="location-job-type">
                  <p className="company-location">
                    <ImLocation2 className="location-icon" />
                    {similarJob.location}
                  </p>
                  <p className="company-location">
                    <ImBriefcase className="location-icon" />
                    {similarJob.employmentType}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  jobItemDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.inProcess:
        return this.loading()
      case status.success:
        return this.apiSuccessView()
      case status.failure:
        return this.jobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container-bg">
          {this.jobItemDetailsView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
