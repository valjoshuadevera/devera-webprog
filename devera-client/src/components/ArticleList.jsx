import Button from "../components/button";
import articles from "../assets/article-content.js";

const ArticleListPage = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 px-6">

      {/* Header */}
      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          Tickets
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Upcoming & Featured WWE Events
        </h1>
      </section>

      {/* Horizontal Scroll Cards */}
      <section className="overflow-x-auto">
        <div className="flex gap-6">

          {articles.map((event) => (
            <div
              key={event.name}
              className="min-w-[280px] bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300"
            >
              {/* Image */}
              <img
                src={event.img}
                alt={event.title}
                className="h-44 w-full object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {event.title}
                </h3>

                <Button
                  to={`/articles/${event.name}`}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Get Tickets
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