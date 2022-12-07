import './index.css'

import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="home-bg">
    <Header />
    <div className="main-container-home">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your ability and potential.
      </p>

      <Link to="/jobs">
        <button type="button" className="jobs-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
