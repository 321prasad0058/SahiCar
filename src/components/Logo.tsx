export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="logo">
      <img src="/icon-180.png" width={size} height={size} alt="" />
      <span className="logo-word">
        Sahi<span>Car</span>
      </span>
    </span>
  )
}
