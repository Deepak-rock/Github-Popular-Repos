// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFilterDetails, setActiveLanguage} = props
  const {id, language} = languageFilterDetails
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickLanguageFilter = () => {
    setActiveLanguage(id)
  }
  return (
    <li>
      <button
        className={btnClassName}
        type="button"
        onClick={onClickLanguageFilter}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
