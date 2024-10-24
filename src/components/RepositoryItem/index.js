// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoriesDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoriesDetails
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="name">{name}</h1>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="stars">{starsCount} stars</p>
      </div>
      <div className="forks-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="forks">{forksCount} forks</p>
      </div>
      <div className="open-issues-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="open-issues">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
