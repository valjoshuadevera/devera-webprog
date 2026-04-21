import Button from "../../components/button";

import hero from "../../assets/images/hhh.jpg";
import becky from "../../assets/images/becky.jpg";
import randy from "../../assets/images/randy.jpg";
import hardyBoys from "../../assets/images/hardyboys.jpg";
const stats = [
  { value: "50+", label: "Championship Titles" },
  { value: "1000+", label: "Matches Fought" },
  { value: "40+", label: "Years of History" },
  { value: "30+", label: "Hall of Famers" },
];

const articles = [
  {
    title: "Early Life & Beginnings",
    description:
      "Learn where your favorite superstars come from and how they started their journey to WWE fame.",
  },
  {
    title: "Career Milestones",
    description:
      "Discover major highlights, iconic matches, and defining moments that shaped their careers.",
  },
  {
    title: "Legacy & Impact",
    description:
      "Explore how these superstars influenced wrestling culture and inspired generations of fans.",
  },
];

const AboutPage = () => {
  const visualImages = [hero, becky, randy, hardyBoys];
  const altTexts = [
    "CM Punk vs Roman Reigns",
    "Becky Lynch Highlight",
    "Randy Orton Highlight",
    "Hardy Boys Tag Team Highlight",
  ];

  return (
    <div className="bg-black text-white flex flex-col gap-12">
      {/* HERO SECTION */}
      <section className="grid lg:grid-cols-2">
        <div className="relative h-[400px] lg:h-[520px]">
          <img
            src={hero}
            alt="CM Punk vs Roman Reigns"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        <div className="flex flex-col justify-center bg-red-700 p-8 lg:p-12">
          <p className="text-xs uppercase tracking-widest text-white/70">
            Superstar Spotlight
          </p>
          <h1 className="mt-3 text-3xl font-bold lg:text-4xl">
            Get to Know WWE’s Most Iconic Superstars
          </h1>
          <p className="mt-4 text-red-100">
            Discover the journeys, achievements, and unique stories of the
            biggest names in WWE history. From legends to rising stars, explore
            what makes them unforgettable.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="primary">Back Home</Button>
            <Button variant="secondary">View Articles</Button>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-8 py-10 border-t-2 border-red-600 bg-black">
        <h2 className="text-2xl font-bold text-white mb-6">
          Superstar Achievements
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-red-900 border-2 border-red-600 rounded-3xl p-5 text-white text-center"
            >
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section className="px-8 py-10 border-t-2 border-red-600 bg-black">
        <h2 className="text-2xl font-bold text-white mb-6">
          Stories Behind the Superstars
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <div
              key={i}
              className="bg-red-900 border-2 border-red-600 rounded-3xl p-5"
            >
              <h3 className="text-lg font-semibold text-white">{a.title}</h3>
              <p className="mt-3 text-white/80">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VISUAL HIGHLIGHTS */}
      <section className="px-8 py-10 border-t-2 border-red-600">
        <h2 className="text-2xl font-bold text-red-400 mb-6">
          Visual Highlights
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {visualImages.map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-3xl border-2 border-red-600 group"
            >
              <img
                src={img}
                alt={altTexts[i]}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-2xl text-white">▶</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="primary">View Gallery</Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
