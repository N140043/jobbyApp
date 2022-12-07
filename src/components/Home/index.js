import './index.css'

import Header from '../Header'

const Home = () => (
  <div className="home-bg">
    <Header />
    <div className="main-container">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fit's your ability and potential.
      </p>
      <button type="button" className="jobs-btn">
        Find Jobs
      </button>
    </div>
  </div>
)

export default Home
