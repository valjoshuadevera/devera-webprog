import { useParams } from "react-router-dom";
import Button from "../../components/button.jsx";
import articles from "../../assets/article-content.js";

function ArticlePage() {
  const { name } = useParams();

  const article = articles.find(a => a.name === name);

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