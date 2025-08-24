import css from "./Button.module.css";

export const Button = ({ children, color, width, height, font, ...props }) => {
  let padding;

  if (height === "54px") {
    padding = "16px";
  } else if (height === "44px") {
    padding = "16px 12px";
  } else {
    padding = "8px";
  }
  return (
    <button
      className={css[color]}
      style={{
        "--btn-width": width,
        "--btn-height": height,
        "--btn-font": font,
        "--btn-padding": padding,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
