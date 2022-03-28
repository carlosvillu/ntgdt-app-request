import { Link } from 'remix'

interface MainHeaderProps {
  onGoBack?: () => void
}

export const MainHeader = ({ onGoBack }: MainHeaderProps) => {
  return (
    <header
      style={{ height: 'var(--header-height)' }}
      className="z-10 w-full bg-gray-900/90 flex justify-center items-center decoration-gray-50 px-5 top-0 sticky shadow-md"
    >
      <div className="flex basis-1/4">
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="flex-none border-0 bg-gray-200 text-gray-900 font-bold px-4 rounded cursor-pointer hover:bg-gray-50 active:bg-gray-50"
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
        )}
      </div>

      <Link
        to="/"
        className="flex basis-1/2 text-gray-50 visited:text-gray-50 justify-center hover:text-sky-500"
      >
        <h1 className="text-2xl font-bold">NTGDT</h1>
      </Link>

      <div className="flex basis-1/4" />
    </header>
  )
}
