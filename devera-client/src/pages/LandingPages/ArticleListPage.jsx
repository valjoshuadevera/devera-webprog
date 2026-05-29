import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import staticArticles from "../../data/article-content.js";
import wweLogo from "../../assets/images/wwelogo.png";
import constants from "../../constants.js";

const mapStaticArticle = (article) => ({
  slug: article.name,
  title: article.title,
  preview: article.content?.[0] || "",
  img: article.img,
  source: "static",
});

const ArticleListPage = () => {
  const [articles, setArticles] = useState(staticArticles.map(mapStaticArticle));

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch(`${constants.HOST}/articles`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load articles.");
        }

        const apiArticles = (data.articles || [])
          .filter((article) => article.status === "published" && article.isActive !== false)
          .map((article) => ({
            slug: article.slug,
            title: article.title,
            preview: article.preview,
            img: wweLogo,
            source: "api",
          }));

        setArticles([...apiArticles, ...staticArticles.map(mapStaticArticle)]);
      } catch (err) {
        console.error(err);
      }
    };

    loadArticles();
  }, []);

  return (  
    <div className="bg-black text-white min-h-screen pt-24 px-6">

      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          Tickets
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Upcoming & Featured WWE Events
        </h1>
      </section>

      <section className="overflow-x-auto">
        <div className="flex gap-6">

          {articles.map((event) => (
            <div
              key={`${event.source}-${event.slug}`}
              className="min-w-[280px] bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 hover:shadow-lg transition duration-300"
            >
              <img
                src={event.img}
                alt={event.title}
                className="h-44 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {event.title}
                </h3>

                <Button
                  to={`/articles/${event.slug}`}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
};

export default ArticleListPage;
