export default function Icon({ className, iconName }) {
  return (
    <svg className={className}>
      <use href={`/sprite.svg?v=${__BUILD_VERSION__}#${iconName}`}></use>
    </svg>
  );
}