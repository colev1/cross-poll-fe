export const cleanPhotos = photos => photos.map(photo => photo.$t);

export const cleanPets = (pets) => pets.map((pet) => {
  let cleanedPhotos;
  if (pet.media.photos) {
    cleanedPhotos = cleanPhotos(pet.media.photos.photo);
  } else {
    cleanedPhotos = [];
  }
  return {
    name: pet.name.$t,
    age: pet.age.$t,
    animal: pet.animal.$t,
    breed: pet.breeds.breed.$t,
    id: pet.id.$t,
    sex: pet.sex.$t,
    shelterId: pet.shelterId.$t,
    size: pet.size.$t,
    description: pet.description.$t,
    contactInfo: {
      address: pet.contact.address1.$t,
      zip: pet.contact.zip.$t,
      state: pet.contact.state.$t,
      email: pet.contact.email.$t,
      city: pet.contact.city.$t,
    },
    photos: cleanedPhotos,
  };
});

export const cleanPet = (pet) => {
  console.log('cleaning pet!')
  let cleanedPhotos;
  if (pet.media.photos) {
    cleanedPhotos = cleanPhotos(pet.media.photos.photo);
  } else {
    cleanedPhotos = [];
  }
  const cleanPet = {
    name: pet.name.$t,
    age: pet.age.$t,
    animal: pet.animal.$t,
    breed: pet.breeds.breed.$t,
    id: pet.id.$t,
    sex: pet.sex.$t,
    shelterId: pet.shelterId.$t,
    size: pet.size.$t,
    description: pet.description.$t,
    contactInfo: {
      address: pet.contact.address1.$t,
      zip: pet.contact.zip.$t,
      state: pet.contact.state.$t,
      email: pet.contact.email.$t,
      city: pet.contact.city.$t,
    },
    photos: cleanedPhotos,
  };
  console.log('cleaned pet!')

  return cleanPet
}

export const cleanShelters = (shelter) => {
  console.log('cleaning shelter!')
  const cleanedShelter = {
    name: shelter.name.$t,
    id: shelter.id.$t,
    zip: shelter.zip.$t,
    state: shelter.state.$t,
    city: shelter.city.$t,
    phone: shelter.phone.$t,
    email: shelter.email.$t,
    longitude: shelter.longitude.$t,
    latitude: shelter.latitude.$t,
  };
  console.log('cleaned shelter!')
  return cleanedShelter;
};


