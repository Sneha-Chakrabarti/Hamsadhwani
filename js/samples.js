/* Sample catalogue shown while SAMPLE_MODE is true.
   Set SAMPLE_MODE to false once you have added real products in the admin panel.
   Sample orders are never recorded. */
const SAMPLE_MODE = true;

const SAMPLE_PRODUCTS = [
  { id: "sample-1",  category: "earrings", collection: "celeste",   piece_type: "stud",    name: "Starry Stud",      price: 249, available: true,  description: "Small clay studs painted with a swirling night sky." },
  { id: "sample-2",  category: "earrings", collection: "celeste",   piece_type: "jhumka",  name: "Moonrise Jhumka",  price: 399, available: true,  description: "A painted clay jhumka in deep indigo with golden stars." },
  { id: "sample-3",  category: "earrings", collection: "celeste",   piece_type: "dangler", name: "Swirl Dangler",    price: 329, available: true,  description: "A fishhook dangler with a hand-painted crescent moon." },
  { id: "sample-4",  category: "earrings", collection: "silk-road", piece_type: "stud",    name: "Cobalt Stud",      price: 249, available: true,  description: "Blue and white clay studs with a fine gold edge." },
  { id: "sample-5",  category: "earrings", collection: "silk-road", piece_type: "jhumka",  name: "Porcelain Jhumka", price: 399, available: false, description: "A blue china motif painted on a small clay jhumka." },
  { id: "sample-6",  category: "earrings", collection: "silk-road", piece_type: "dangler", name: "Caravan Dangler",  price: 329, available: true,  description: "A long clay dangler in cobalt with a golden accent." },
  { id: "sample-7",  category: "earrings", collection: "flora",     piece_type: "stud",    name: "Gul Stud",         price: 249, available: true,  description: "Tiny painted clay blossoms on a stud post." },
  { id: "sample-8",  category: "earrings", collection: "flora",     piece_type: "jhumka",  name: "Bagh Jhumka",      price: 399, available: true,  description: "A clay jhumka painted with a slender flowering stem." },
  { id: "sample-9",  category: "earrings", collection: "flora",     piece_type: "dangler", name: "Lata Dangler",     price: 329, available: true,  description: "A painted floral dangler, with a small pearl on some pieces." }
];
