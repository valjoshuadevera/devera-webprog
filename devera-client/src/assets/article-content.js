import raw from "/src/assets/images/rawtics.jpg";
import wrestlemania from "/src/assets/images/wrestlemaniatics.jpg";
import smackdown from "/src/assets/images/smackrawtics.jpg";
import backlash from "/src/assets/images/backlash.jpg";
import italy from "/src/assets/images/penta.jpg";

const articles = [
  {
    name: "raw-returns-msg", // MUST match URL
    title: "RAW Returns to MSG",
    img: raw,
    content: [
      "RAW is back in Madison Square Garden!",
      "Experience the electrifying atmosphere of WWE live.",
      "Watch your favorite superstars compete in iconic matches."
    ],
  },
  {
    name: "wrestlemania",
    title: "WrestleMania",
    img: wrestlemania,
    content: [
      "The biggest WWE event of the year.",
      "Two nights filled with unforgettable moments.",
      "Legends are made at WrestleMania."
    ],
  },
  {
    name: "smackdown-live",
    title: "SmackDown Live",
    img: smackdown,
    content: [
      "Friday Night SmackDown brings high-energy action.",
      "Top superstars clash in intense rivalries.",
      "Expect drama, action, and surprises."
    ],
  },
  {
    name: "backlash",
    title: "Backlash",
    img: backlash,
    content: [
      "Backlash continues the biggest rivalries.",
      "Expect explosive matches and shocking results."
    ],
  },
  {
    name: "clash-italy",
    title: "Clash in Italy",
    img: italy,
    content: [
      "WWE goes international in Italy.",
      "A historic night for European fans.",
      "Experience WWE like never before."
    ],
  },
];

export default articles;