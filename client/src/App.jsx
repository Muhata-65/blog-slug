import { useEffect, useState } from "react";

async function readResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "The request could not be completed.");
  }

  return data;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(value));
}

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    fetch("/posts")
      .then(readResponse)
      .then((data) => {
        if (isCurrent) setPosts(data);
      })
      .catch((requestError) => {
        if (isCurrent) setError(requestError.message);
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  async function openPost(slug) {
    setError("");
    setLoading(true);

    try {
      const post = await readResponse(
        await fetch(`/posts/${encodeURIComponent(slug)}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      setSelectedPost(post);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function showPosts() {
    setSelectedPost(null);
    setError("");
  }

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" onClick={(event) => {
          event.preventDefault();
          showPosts();
        }}>
          <span className="brand-mark">F</span>
          Fieldnotes
        </a>
        <span className="topbar-note">A little space for good ideas</span>
      </header>

      <section className="intro">
        <p className="eyebrow">THE JOURNAL</p>
        <h1>{selectedPost ? selectedPost.title : "Stories for slower days."}</h1>
        <p className="intro-copy">
          {selectedPost
            ? selectedPost.description
            : "Thoughtful notes on finding inspiration in the everyday."}
        </p>
      </section>

      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}

      {selectedPost ? (
        <article className="post-detail">
          <button className="back-link" type="button" onClick={showPosts}>
            <span aria-hidden="true">←</span> All stories
          </button>
          <div className="post-meta">
            <time dateTime={selectedPost.created}>
              {formatDate(selectedPost.created)}
            </time>
            <span className={`status status-${selectedPost.status}`}>
              {selectedPost.status}
            </span>
          </div>
          <p className="post-content">{selectedPost.content}</p>
        </article>
      ) : (
        <section aria-label="Blog posts" className="posts-section">
          <div className="section-heading">
            <h2>Latest stories</h2>
            <span>{posts.length} notes</span>
          </div>
          {loading ? (
            <p className="empty-state">Loading stories…</p>
          ) : (
            <div className="post-list">
              {posts.map((post, index) => (
                <article className="post-card" key={post.id}>
                  <div className="post-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="post-summary">
                    <div className="post-meta">
                      <time dateTime={post.created}>{formatDate(post.created)}</time>
                      <span className={`status status-${post.status}`}>
                        {post.status}
                      </span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <button
                      className="read-link"
                      type="button"
                      onClick={() => openPost(post.slug)}
                    >
                      Read story <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          )}
          <form
            className="token-panel"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="api-token">API token for opening stories</label>
            <input
              id="api-token"
              type="password"
              autoComplete="off"
              placeholder="Enter the BLOG_API_TOKEN value"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
          </form>
        </section>
      )}

      <footer className="footer">
        <span>Fieldnotes Journal</span>
        <span>Made for curious minds</span>
      </footer>
    </main>
  );
}
