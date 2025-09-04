const Icon = ({
  name,
  width = 32,
  height = 30,
  className = "",
  fill = "currentColor",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      fill={fill}
      {...props}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
