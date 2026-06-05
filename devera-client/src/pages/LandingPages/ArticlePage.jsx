import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import staticArticles from "../../data/article-content.js";
import wweLogo from "../../assets/images/wwelogo.png";
import constants from "../../constants.js";
import { createApiError, readApiResponse } from "../../utils/api.js";

function ArticlePage() {
  const { name } = useParams();
  const [apiArticle, setApiArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const staticArticle = staticArticles.find(a => a.name === name);
  const article = apiArticle || staticArticle;

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${constants.HOST}/articles/${name}`);

        if (response.status === 404) {
          setApiArticle(null);
          return;
        }

        const data = await readApiResponse(response);

        if (!response.ok) {
          throw createApiError(data, "Unable to load article.");
        }

        if (data.status !== "published" || data.isActive === false) {
          setApiArticle(null);
          return;
        }

        setApiArticle({
          title: data.title,
          img: wweLogo,
          content: [data.paragraph],
        });
      } catch (err) {
        console.error(err);
        setApiArticle(null);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (loading && !staticArticle) {
    return (
      <div className="text-center p-10 text-white bg-black min-h-screen">
        <h2 className="text-2xl mb-4">Loading article...</h2>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center p-10 text-white bg-black min-h-screen">
        <h2 className="text-2xl mb-4">Article not found</h2>
        <Button to="/articles">Back to Articles</Button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-24 px-6">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          {article.title}
        </h1>

        <img
          src={article.img}
          alt={article.title}
          className="w-full mb-6 rounded-lg"
        />

        {article.content.map((p, i) => (
          <p key={i} className="mb-4 text-zinc-300">
            {p}
          </p>
        ))}

        <Button to="/articles" className="mt-6">
          Back to Events
        </Button>

      </div>

    </div>
  );
}

export default ArticlePage;
