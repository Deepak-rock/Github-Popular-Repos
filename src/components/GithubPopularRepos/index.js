// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeLanguage: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getFetchData()
  }

  getFetchData = async () => {
    const {activeLanguage} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiURL = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(apiURL)
    if (response.ok) {
      const fetchData = await response.json()
      const updatedDate = fetchData.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        repositoriesData: updatedDate,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repositories-list">
        {repositoriesData.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoriesDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguage = id => {
    this.setState({activeLanguage: id}, this.getFetchData)
  }

  renderLanguageFiltersList = () => {
    const {activeLanguage} = this.state
    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachlanguage => (
          <LanguageFilterItem
            key={eachlanguage.id}
            isActive={eachlanguage.id === activeLanguage}
            languageFilterDetails={eachlanguage}
            setActiveLanguage={this.setActiveLanguage}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="github-popular-repos-page">
            <h1 className="heading">Popular</h1>
            {this.renderLanguageFiltersList()}
            {this.renderRepositories()}
          </div>
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
