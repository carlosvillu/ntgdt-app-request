import { Link } from 'remix'

interface MainHeaderProps {
  onGoBack?: () => void
}

export const MainHeader = ({ onGoBack }: MainHeaderProps) => {
  return (
    <header className="z-10">
      <div className="actions">
        {onGoBack && (
          <button onClick={onGoBack} className="back">
            <i className="fa-solid fa-arrow-left" />
          </button>
        )}
      </div>

      <Link to="/" className="logo">
        <h1 className="text-2xl font-bold">NTGDT</h1>
      </Link>

      <div className="actions" />
    </header>
  )
}
