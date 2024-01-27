export function Logo({ color }: { color: 'white' | 'indigo' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none">
      <path
        fillRule="evenodd"
        d="M25.556 11.685A10 10 0 0 0 20 10V0A20 20 0 1 1 0 20h10a10 10 0 1 0 15.556-8.315Z"
        className={`ccustom fill-${color === 'white' ? 'white' : 'indigo-600'}`}
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M10 0A10 10 0 0 1 0 10v10A20 20 0 0 0 20 0H10Z"
        className={`ccustom ${
          color === 'white' ? 'fill-white' : 'fill-indigo-600'
        }`}
        clipRule="evenodd"
      />
    </svg>
  )
}
