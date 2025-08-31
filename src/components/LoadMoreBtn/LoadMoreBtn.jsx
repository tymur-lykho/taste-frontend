import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, disabled = false, loading = false }) {
  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? "Loading..." : "Load More"}
    </button>
  );
}