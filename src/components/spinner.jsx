import './Spinner.css'

function Spinner() {
  return (
    <span className="spinner">
      <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,10 L25,10 L32,2 L40,18 L48,10 L100,10" />
      </svg>
    </span>
  )
}

export default Spinner