// Romanian cities and counties data
export interface City {
  name: string;
  county: string;
  value: string;
}

export const romanianCities: City[] = [
  // Bucharest
  { name: "Bucharest", county: "Bucharest", value: "bucharest" },
  
  // Major cities by county
  { name: "Cluj-Napoca", county: "Cluj", value: "cluj-napoca" },
  { name: "Timișoara", county: "Timiș", value: "timisoara" },
  { name: "Iași", county: "Iași", value: "iasi" },
  { name: "Constanța", county: "Constanța", value: "constanta" },
  { name: "Craiova", county: "Dolj", value: "craiova" },
  { name: "Brașov", county: "Brașov", value: "brasov" },
  { name: "Galați", county: "Galați", value: "galati" },
  { name: "Ploiești", county: "Prahova", value: "ploiesti" },
  { name: "Oradea", county: "Bihor", value: "oradea" },
  { name: "Brăila", county: "Brăila", value: "braila" },
  { name: "Arad", county: "Arad", value: "arad" },
  { name: "Pitești", county: "Argeș", value: "pitesti" },
  { name: "Sibiu", county: "Sibiu", value: "sibiu" },
  { name: "Bacău", county: "Bacău", value: "bacau" },
  { name: "Târgu Mureș", county: "Mureș", value: "targu-mures" },
  { name: "Baia Mare", county: "Maramureș", value: "baia-mare" },
  { name: "Buzău", county: "Buzău", value: "buzau" },
  { name: "Botoșani", county: "Botoșani", value: "botosani" },
  { name: "Satu Mare", county: "Satu Mare", value: "satu-mare" },
  { name: "Râmnicu Vâlcea", county: "Vâlcea", value: "ramnicu-valcea" },
  { name: "Drobeta-Turnu Severin", county: "Mehedinți", value: "drobeta-turnu-severin" },
  { name: "Suceava", county: "Suceava", value: "suceava" },
  { name: "Piatra Neamț", county: "Neamț", value: "piatra-neamt" },
  { name: "Târgu Jiu", county: "Gorj", value: "targu-jiu" },
  { name: "Tulcea", county: "Tulcea", value: "tulcea" },
  { name: "Târgoviște", county: "Dâmbovița", value: "targoviste" },
  { name: "Focșani", county: "Vrancea", value: "focsani" },
  { name: "Bistrița", county: "Bistrița-Năsăud", value: "bistrita" },
  { name: "Slatina", county: "Olt", value: "slatina" },
  { name: "Călărași", county: "Călărași", value: "calarasi" },
  { name: "Alba Iulia", county: "Alba", value: "alba-iulia" },
  { name: "Giurgiu", county: "Giurgiu", value: "giurgiu" },
  { name: "Deva", county: "Hunedoara", value: "deva" },
  { name: "Hunedoara", county: "Hunedoara", value: "hunedoara" },
  { name: "Vaslui", county: "Vaslui", value: "vaslui" },
  { name: "Mangalia", county: "Constanța", value: "mangalia" },
  { name: "Medgidia", county: "Constanța", value: "medgidia" },
  { name: "Onești", county: "Bacău", value: "onesti" },
  { name: "Miercurea Ciuc", county: "Harghita", value: "miercurea-ciuc" },
  { name: "Sfântu Gheorghe", county: "Covasna", value: "sfantu-gheorghe" },
  { name: "Petrosani", county: "Hunedoara", value: "petrosani" },
  { name: "Lugoj", county: "Timiș", value: "lugoj" },
  { name: "Medias", county: "Sibiu", value: "medias" },
  { name: "Reghin", county: "Mureș", value: "reghin" },
  { name: "Porți", county: "Mureș", value: "porti" },
  { name: "Câmpina", county: "Prahova", value: "campina" },
  { name: "Câmpulung", county: "Argeș", value: "campulung" },
  { name: "Curtea de Argeș", county: "Argeș", value: "curtea-de-arges" },
  { name: "Moreni", county: "Dâmbovița", value: "moreni" },
  { name: "Rămnicu Sărat", county: "Buzău", value: "ramnicu-sarat" },
  { name: "Turda", county: "Cluj", value: "turda" },
  { name: "Dej", county: "Cluj", value: "dej" },
  { name: "Gherla", county: "Cluj", value: "gherla" },
  { name: "Carei", county: "Satu Mare", value: "carei" },
  { name: "Sighetul Marmației", county: "Maramureș", value: "sighetul-marmatiei" },
  { name: "Borșa", county: "Maramureș", value: "borsa" },
  { name: "Vatra Dornei", county: "Suceava", value: "vatra-dornei" },
  { name: "Câmpulung Moldovenesc", county: "Suceava", value: "campulung-moldovenesc" },
  { name: "Rădăuți", county: "Suceava", value: "radauti" },
  { name: "Dorohoi", county: "Botoșani", value: "dorohoi" },
  { name: "Săveni", county: "Botoșani", value: "saveni" },
  { name: "Pașcani", county: "Iași", value: "pascani" },
  { name: "Hârlău", county: "Iași", value: "harlau" },
  { name: "Târgu Neamț", county: "Neamț", value: "targu-neamt" },
  { name: "Roman", county: "Neamț", value: "roman" },
  { name: "Moinești", county: "Bacău", value: "moinesti" },
  { name: "Comănești", county: "Bacău", value: "comanesti" },
  { name: "Adjud", county: "Vrancea", value: "adjud" },
  { name: "Panciu", county: "Vrancea", value: "panciu" },
  { name: "Tecuci", county: "Galați", value: "tecuci" },
  { name: "Bârlad", county: "Vaslui", value: "barlad" },
  { name: "Huși", county: "Vaslui", value: "husi" },
  { name: "Negrești-Oaș", county: "Satu Mare", value: "negresti-oas" },
];

export const romanianCounties = [
  { name: "Alba", value: "alba" },
  { name: "Arad", value: "arad" },
  { name: "Argeș", value: "arges" },
  { name: "Bacău", value: "bacau" },
  { name: "Bihor", value: "bihor" },
  { name: "Bistrița-Năsăud", value: "bistrita-nasaud" },
  { name: "Botoșani", value: "botosani" },
  { name: "Brașov", value: "brasov" },
  { name: "Brăila", value: "braila" },
  { name: "Bucharest", value: "bucharest" },
  { name: "Buzău", value: "buzau" },
  { name: "Călărași", value: "calarasi" },
  { name: "Caraș-Severin", value: "caras-severin" },
  { name: "Cluj", value: "cluj" },
  { name: "Constanța", value: "constanta" },
  { name: "Covasna", value: "covasna" },
  { name: "Dâmbovița", value: "dambovita" },
  { name: "Dolj", value: "dolj" },
  { name: "Galați", value: "galati" },
  { name: "Giurgiu", value: "giurgiu" },
  { name: "Gorj", value: "gorj" },
  { name: "Harghita", value: "harghita" },
  { name: "Hunedoara", value: "hunedoara" },
  { name: "Ialomița", value: "ialomita" },
  { name: "Iași", value: "iasi" },
  { name: "Ilfov", value: "ilfov" },
  { name: "Maramureș", value: "maramures" },
  { name: "Mehedinți", value: "mehedinti" },
  { name: "Mureș", value: "mures" },
  { name: "Neamț", value: "neamt" },
  { name: "Olt", value: "olt" },
  { name: "Prahova", value: "prahova" },
  { name: "Sălaj", value: "salaj" },
  { name: "Satu Mare", value: "satu-mare" },
  { name: "Sibiu", value: "sibiu" },
  { name: "Suceava", value: "suceava" },
  { name: "Teleorman", value: "teleorman" },
  { name: "Timiș", value: "timis" },
  { name: "Tulcea", value: "tulcea" },
  { name: "Vaslui", value: "vaslui" },
  { name: "Vâlcea", value: "valcea" },
  { name: "Vrancea", value: "vrancea" },
];

// Helper function to get cities by county
export const getCitiesByCounty = (countyValue: string): City[] => {
  return romanianCities.filter(city => 
    city.county.toLowerCase().replace(/[^a-z]/g, '') === countyValue.replace(/[^a-z]/g, '')
  );
};

// Helper function to get county by city
export const getCountyByCity = (cityValue: string): string => {
  const city = romanianCities.find(city => city.value === cityValue);
  return city ? city.county : '';
}; 