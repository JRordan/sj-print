export default function Logo({ light = false }) {
  return (
    <span className="logo-wordmark">
      <span className="logo-sj">SJ</span>
      <span className={light ? 'logo-print-light' : 'logo-print'}>Print.us</span>
    </span>
  );
}
