import './index.css'

import {BiSearch} from 'react-icons/bi'
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const status = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProcess: 'IN PROCESS',
}

class Jobs extends Component {
  state = {
    jobsApiStatus: '',
    profileApiStatus: '',
    profile: '',
    jobs: [],
    salary: '',
    employType: [],
    search: '',
  }

  componentDidMount() {
    this.getJobsAvailable()
    this.getProfileDetails()
  }

  getJobsAvailable = async () => {
    this.setState({jobsApiStatus: status.inProcess})
    const {salary, employType, search} = this.state
    // console.log(search)
    const employTypes = employType.join(',')
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${salary}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    const updateJobs = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      location: each.location,
      jobDescription: each.job_description,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    // console.log(updateJobs)
    if (response.ok) {
      this.setState({jobs: updateJobs, jobsApiStatus: status.success})
    } else {
      this.setState({jobsApiStatus: status.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: status.inProcess})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profileDetails = {
      name: data.profile_details.name,
      profileImgUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    // console.log(data)
    if (response.ok) {
      this.setState({profile: profileDetails, profileApiStatus: status.success})
    } else {
      this.setState({jobsApiStatus: status.failure})
    }
  }

  enterSearch = event => {
    this.setState({search: event.target.value})
  }

  updateResultOnSearch = () => {
    this.getJobsAvailable()
  }

  searchElement = () => (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search"
        className="search-input"
        onChange={this.enterSearch}
      />
      <button
        type="button"
        className="search-btn"
        onClick={this.updateResultOnSearch}
      >
        <BiSearch className="search-icon" />
      </button>
    </div>
  )

  loading = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileDetails = () => {
    const {profile, profileApiStatus} = this.state
    const {name, profileImgUrl, shortBio} = profile

    switch (profileApiStatus) {
      case status.inProcess:
        return this.loading()
      case status.success:
        return (
          <div className="profile-container">
            <img src={profileImgUrl} alt="profile" className="profile-img" />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-bio">{shortBio}</p>
          </div>
        )
      case status.failure:
        return (
          <div className="profile-failure-container">
            <button
              type="button"
              className="failure-retry-btn"
              onClick={this.getProfileDetails}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  typeOfEmployment = () => (
    <ul className="job-type-bg">
      <h1 className="job-type-heading">Type of Employment</h1>
      {employmentTypesList.map(each => {
        const onClickEmployType = () => {
          const {employType} = this.state
          let updateEmployType
          // console.log(employType, id, employType.includes(id))
          if (employType.includes(each.employmentTypeId)) {
            updateEmployType = employType.filter(
              eachId => eachId !== each.employmentTypeId,
            )
          } else {
            updateEmployType = [...employType, each.employmentTypeId]
          }
          this.setState({employType: updateEmployType}, this.getJobsAvailable)
        }
        return (
          <li key={each.employmentTypeId} className="employ-type-item">
            <input type="checkbox" id={each.employmentTypeId} />
            <label
              className="job-type-label"
              htmlFor={each.employmentTypeId}
              onClick={onClickEmployType}
            >
              {each.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  salaryRange = () => (
    <ul className="job-type-bg">
      <h1 className="job-type-heading">Salary Range</h1>
      {salaryRangesList.map(each => {
        const changeSalary = () => {
          this.setState({salary: each.salaryRangeId}, this.getJobsAvailable)
        }
        return (
          <li key={each.salaryRangeId} className="employ-type-item">
            <input
              type="radio"
              name="salary"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
            />
            <label
              className="job-type-label"
              htmlFor={each.salaryRangeId}
              onClick={changeSalary}
            >
              {each.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  jobsList = () => {
    const {jobs} = this.state
    if (jobs.length === 0) {
      return (
        <div className="jobs-failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failure-icon"
          />
          <h1 className="failure-heading">No Jobs Found</h1>
          <p className="failure-para">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list-container">
        {jobs.map(each => (
          <JobItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

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
        onClick={this.getJobsAvailable}
      >
        Retry
      </button>
    </div>
  )

  jobsListResult = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case status.inProcess:
        return this.loading()
      case status.failure:
        return this.jobsFailureView()
      case status.success:
        return this.jobsList()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="search-ele-sm">{this.searchElement()}</div>
          <div className="filter-container">
            {this.profileDetails()}
            {this.typeOfEmployment()}
            {this.salaryRange()}
          </div>
          <div className="jobs-main-container">
            <div className="search-ele-lg">{this.searchElement()}</div>
            {this.jobsListResult()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
