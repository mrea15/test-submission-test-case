//automation test add new pet data

describe('Petstore API Testing - Add Multiple Pets', () => {
  //Testcase Add pet data dengan 2 status available & pending
    const pets = [
    //data status available
      {
        id: 1001,
        category: {
          id: 1,
          name: 'anjing'
        },
        name: 'Helly',
        photoUrls: ['https://tinyurl.com/my8shpvs'],
        tags: [
          {
            id: 1,
            name: 'chihua'
          }
        ],
        status: 'available'
      },
      //data status pending
      {
        id: 1002,
        category: {
          id: 2,
          name: 'anjing'
        },
        name: 'siberian',
        photoUrls: ['https://tinyurl.com/2p97eekn'],
        tags: [
          {
            id: 2,
            name: 'bulldog'
          }
        ],
        status: 'pending'
      }
    ];
  
    pets.forEach((pet) => {
      it(`should add pet "${pet.name}" with status "${pet.status}" and verify response`, () => {
        cy.request({
          method: 'POST',
          url: 'https://petstore.swagger.io/v2/pet',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },
          body: pet
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.equal(pet);
        });
      });
    });
  
  });