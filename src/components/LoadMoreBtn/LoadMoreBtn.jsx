import css from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onClick }) {
  return (
    <>
      <button onClick={onClick} className={css.loadMoreBtn}>
        Load more
      </button>
    </>
  );
}

export default LoadMoreBtn;
