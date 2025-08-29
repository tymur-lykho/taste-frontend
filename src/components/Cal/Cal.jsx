import css from "./Cal.module.css";

export default function Cal({ cal }) {
  return (
    <span className={css["card-cal"]}>
      {cal != null ? `~${cal} cals` : "n/a"}
    </span>
  );
}
