import { Button } from "../Button/Button";
import css from "./SearchResultEmpty.module.css";

export default function SearchResultEmpty({
  cardText = "We’re sorry! We were not able to find a match.",
  actionLabel = "Reset search and filters",
  onAction,
}) {
  return (
    <div className={css.card}>
      <h3 className={css.title}>{cardText}</h3>
      {onAction && (
        <Button
          className={["white", css.button]}
          onClick={onAction}
          aria-label={actionLabel}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
