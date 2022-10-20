export default function ChevronLeftIcon(props: { size?: string }) {
  const { size = '1.5rem' } = props;

  return (
    <svg
      style={{ width: size, height: size }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  );
}
