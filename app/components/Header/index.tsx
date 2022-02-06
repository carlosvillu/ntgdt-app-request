interface MainHeaderProps {
  onGoBack?: () => void
}

export const MainHeader = ({ onGoBack }: MainHeaderProps) => {
  return (
    <header>
      <div className="actions">
        {onGoBack && (
          <button onClick={onGoBack} className="back">
            &#8592;
          </button>
        )}
      </div>
      <h1>NTGDT</h1>
      <div className="actions" />
    </header>
  )
}
