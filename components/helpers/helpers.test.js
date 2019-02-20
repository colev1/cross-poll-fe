import { cleanPets, cleanPet, cleanShelters } from './helpers';
import { cleanPhotos } from './helpers';

describe('helpers', () => {
  let pets;
  let result;
  let pet;

  describe('cleanPets helper', () => {
    it('takes in an array of pets and returns a cleaned version', () => {
      pets = [
        {
          age: { $t: 'Adult' },
          animal: { $t: 'Small & Furry' },
          breeds: { breed: { $t: 'Rat' } },
          contact: {
            address1: { $t: '1 dog st' },
            address2: {},
            city: { $t: 'The Colony' },
            email: { $t: 'bob@gmail.com' },
            fax: {},
            phone: {},
            state: { $t: 'TX' },
            zip: { $t: '75056' },
          },
          description: { $t: 'Curly is a bit more timid than his buddies, but he… adopted with Larry and Mo (and hopefully Notty).' },
          id: { $t: '42642357' },
          lastUpdate: { $t: '2018-09-02T19:54:04Z' },
          media: {
            photos: {
              photo: [
                { size: 'pnt', $t: 'img1', id: '1' },
                { size: 'fpm', $t: 'img2', id: '1' },
                { size: 'x', $t: 'img3', id: '1' },
                { size: 'pn', $t: 'img4', id: '1' },
                { size: 't', $t: 'img5', id: '1' },
              ],
            },
          },
          mix: { $t: 'no' },
          name: { $t: 'Curly' },
          options: {},
          sex: { $t: 'M' },
          shelterId: { $t: 'TX2295' },
          shelterPetId: {},
          size: { $t: 'S' },
          status: { $t: 'A' },
        },
      ];
      const expected = [{
        name: 'Curly',
        age: 'Adult',
        animal: 'Small & Furry',
        breed: 'Rat',
        id: '42642357',
        sex: 'M',
        shelterId: 'TX2295',
        size: 'S',
        contactInfo: {
          address: '1 dog st',
          zip: '75056',
          state: 'TX',
          email: 'bob@gmail.com',
          city: 'The Colony',
        },
        photos: [
          'img1',
          'img2',
          'img3',
          'img4',
          'img5',
        ],
        description: 'Curly is a bit more timid than his buddies, but he… adopted with Larry and Mo (and hopefully Notty).',
  
      },
      ];
      result = cleanPets(pets);
      expect(result).toEqual(expected);
    });
  });
  
  describe('clean photos', () => {
    let mockPhotos;
    let result;
  
    it('returns a cleaned version of photos array', () => {
      mockPhotos = [
        { size: 'pnt', $t: 'img1', id: '1' },
        { size: 'fpm', $t: 'img2', id: '1' },
        { size: 'x', $t: 'img3', id: '1' },
        { size: 'pn', $t: 'img4', id: '1' },
        { size: 't', $t: 'img5', id: '1' },
      ];
      const expected = [
        'img1',
        'img2',
        'img3',
        'img4',
        'img5',
      ];
      result = cleanPhotos(mockPhotos);
      expect(result).toEqual(expected);
    });
  })

  describe('cleanPet helper', () => {
    it('takes in a pet and returns a clean pet version', () => {
      pet = {
          age: { $t: 'Adult' },
          animal: { $t: 'Small & Furry' },
          breeds: { breed: { $t: 'Rat' } },
          contact: {
            address1: { $t: '1 dog st' },
            address2: {},
            city: { $t: 'The Colony' },
            email: { $t: 'bob@gmail.com' },
            fax: {},
            phone: {},
            state: { $t: 'TX' },
            zip: { $t: '75056' },
          },
          description: { $t: 'Curly is a bit more timid than his buddies, but he… adopted with Larry and Mo (and hopefully Notty).' },
          id: { $t: '42642357' },
          lastUpdate: { $t: '2018-09-02T19:54:04Z' },
          media: {
            photos: {
              photo: [
                { size: 'pnt', $t: 'img1', id: '1' },
                { size: 'fpm', $t: 'img2', id: '1' },
                { size: 'x', $t: 'img3', id: '1' },
                { size: 'pn', $t: 'img4', id: '1' },
                { size: 't', $t: 'img5', id: '1' },
              ],
            },
          },
          mix: { $t: 'no' },
          name: { $t: 'Curly' },
          options: {},
          sex: { $t: 'M' },
          shelterId: { $t: 'TX2295' },
          shelterPetId: {},
          size: { $t: 'S' },
          status: { $t: 'A' },
        };

      const expected = {
        name: 'Curly',
        age: 'Adult',
        animal: 'Small & Furry',
        breed: 'Rat',
        id: '42642357',
        sex: 'M',
        shelterId: 'TX2295',
        size: 'S',
        contactInfo: {
          address: '1 dog st',
          zip: '75056',
          state: 'TX',
          email: 'bob@gmail.com',
          city: 'The Colony',
        },
        photos: [
          'img1',
          'img2',
          'img3',
          'img4',
          'img5',
        ],
        description: 'Curly is a bit more timid than his buddies, but he… adopted with Larry and Mo (and hopefully Notty).',
  
      };

      result = cleanPet(pet);
      expect(result).toEqual(expected);
    });
  });
  
  describe('cleanShelters', () => {
    it('takes in a shelter returns a cleaned version', ()=> {
      const mockShelter = {
        address1: {$t: "1517 Meadow Street"},
        address2: {$t: "1517 Meadow Street"},
        city: {$t: "North Haverhill"},
        country: {$t: "US"},
        email: {$t: "nereptilewelfare@gmail.com"},
        fax: {},
        id: {$t: "NH125"},
        latitude: {$t: "44.0901"},
        longitude: {$t: "-72.0235"},
        name: {$t: "Northeastern Reptile Welfare League"},
        phone: {$t: "(603) 259-3244"},
        state: {$t: "NH"},
        zip: {$t: "03774"}
      }
      const result = cleanShelters(mockShelter)
      const expected = {
        name: "Northeastern Reptile Welfare League",
        id: "NH125",
        zip: "03774",
        state: "NH",
        city: "North Haverhill",
        phone: "(603) 259-3244",
        email: "nereptilewelfare@gmail.com",
        latitude: "44.0901",
        longitude: "-72.0235"
      }
      expect(result).toEqual(expected)
    })
  })
});