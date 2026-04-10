export type Product = {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  description: string;
  price: string;
  media: {
    type: "image" | "video";
    src: string;
  };
  leftImage: string;
  rightImage: string;
  accent: string;
  notes: string[];
  link: string;
};

export const products: Product[] = [
  {
    id: "hiroshima",
    name: "Hiroshima",
    tagline: "Maestria olfativa.",
    subtitle: "Esencias seleccionadas.",
    description:
      "A warm, mineral fragrance with smoky woods, polished resins and a sharp citrus lift that settles with quiet intensity.",
    price: "US$ 120",
    media: {
      type: "image",
      src: "/images/hiroshima/hiroshima-studio-dark.png",
    },
    leftImage: "/images/hiroshima/hiroshima-pedestal-editorial-v2.png",
    rightImage: "/images/hiroshima/hiroshima-closeup-luxury.png",
    accent: "#C6A16E",
    notes: ["Bergamota", "Incienso", "Vetiver"],
    link: "/product/hiroshima",
  },
  {
    id: "nagasaki",
    name: "Nagasaki",
    tagline: "Aromas etereos.",
    subtitle: "Perfumes atemporales.",
    description:
      "A luminous floral-amber blend that opens airy and bright before drifting into velvet woods and clean skin musks.",
    price: "US$ 110",
    media: {
      type: "image",
      src: "/images/nagasaki/nagasaki-warm-editorial.png",
    },
    leftImage: "/images/nagasaki/nagasaki-studio-pedestal.png",
    rightImage: "/images/nagasaki/nagasaki-closeup-luxury.png",
    accent: "#927357",
    notes: ["Neroli", "Gamuza", "Almizcle blanco"],
    link: "/product/nagasaki",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
