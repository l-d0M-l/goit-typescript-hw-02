import css from "./LoadMoreBtn.module.css";
interface LoadMoreProps {
  onClick: () => void;
}

function LoadMoreBtn({ onClick }: LoadMoreProps) {
  return (
    <>
      <button onClick={onClick} className={css.loadMoreBtn}>
        Load more
      </button>
    </>
  );
}

export default LoadMoreBtn;
