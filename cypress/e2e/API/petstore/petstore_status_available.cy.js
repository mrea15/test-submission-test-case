//Test case check available status based on addpetstore
describe('Petstore API Testing - Find Pets by Status "available"', () => {

    it('should return only pets with status "available"', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/pet/findByStatus',
        qs: {
          status: 'available'
        },
        headers: {
          'accept': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
  
        response.body.forEach((pet) => {
          expect(pet).to.have.property('status', 'available');
        });
  
        cy.log(`Jumlah pet dengan status 'available': ${response.body.length}`);
      });
    });
  
  });
  