import { useEffect, useState } from "react";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn.jsx";

const API = "http://localhost:3000";
const LIMIT = 12;

async function fetchRecipesPage(page) {
  const res = await fetch(`${API}/api/recipes?page=${page}&limit=${LIMIT}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  async function loadPage(pageToLoad) {
    const data = await fetchRecipesPage(pageToLoad);
    const chunk = data.items ?? [];
    if (pageToLoad === 1) setItems(chunk);
    else setItems(prev => [...prev, ...chunk]);
    setPage(pageToLoad);
  }

  useEffect(() => {
    (async () => {
      try {
        await loadPage(1);
      } finally {
        setInitialLoading(false);
      }
    })();
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      await loadPage(page + 1);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <ul>
        {items.map(r => <li key={r._id}>{r.title}</li>)}
      </ul>

      {!initialLoading && page < 12 && (  
        <LoadMoreBtn onClick={handleLoadMore} isLoading={loadingMore} />
      )}
    </>
  );
}