import Button from "../components/button";


import raw from "/src/assets/images/rawtics.jpg";
import backlash from "/src/assets/images/backlash.jpg";
import smackdown from "/src/assets/images/smackrawtics.jpg";
import wrestlemania from "/src/assets/images/wrestlemaniatics.jpg";
import italy from "/src/assets/images/penta.jpg";

const tickets = [
  {
    img: raw,
    title: "RAW Returns to MSG",
    date: "Monday, March 30",
    location: "New York, NY",
  },
  {
    img: wrestlemania,
    title: "WrestleMania",
    date: "April 18–19",
    location: "Las Vegas, NV",
  },
  {
    img: smackdown,
    title: "SmackDown Live",
    date: "Friday Night",
    location: "Chicago, IL",
  },
  {
    img: backlash,
    title: "Backlash",
    date: "May 9",
    location: "Tampa, FL",
  },
  {
    img: italy,
    title: "Clash in Italy",
    date: "May 31",
    location: "Turin, Italy",
  },
];

const packages = [
  {
    img: raw,
    title: "RAW Priority Pass",
    date: "March 30, 2026",
  },
  {
    img: wrestlemania,
    title: "WrestleMania Package",
    date: "April 18–19, 2026",
  },
  {
    img: backlash,
    title: "Backlash Package",
    date: "May 9, 2026",
  },
];

const TicketsPage = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 px-6">

      {/* 🔴 HEADER */}
      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          Tickets
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Upcoming & Featured WWE Events
        </h1>
      </section>

      {/* 🔴 EVENTS */}
      <section className="overflow-x-auto mb-12">
        <div className="flex gap-6">
          {tickets.map((event, i) => (
            <div
              key={i}
              className="min-w-[260px] bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={event.img}
                alt={event.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-zinc-400">{event.date}</p>
                <p className="text-sm text-zinc-500">{event.location}</p>

                <Button className="mt-4 w-full" variant="primary">
                  Get Tickets
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔴 PACKAGES */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          On Location Priority Pass Packages
        </h2>

        <div className="flex gap-6 overflow-x-auto">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="min-w-[260px] bg-yellow-500/10 border border-yellow-500 rounded-xl p-4 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={pkg.img}
                alt={pkg.title}
                className="h-32 w-full object-cover rounded"
              />

              <h3 className="mt-4 font-semibold">{pkg.title}</h3>
              <p className="text-sm text-zinc-400">{pkg.date}</p>

              <Button className="mt-4 w-full" variant="secondary">
                View Package
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TicketsPage;