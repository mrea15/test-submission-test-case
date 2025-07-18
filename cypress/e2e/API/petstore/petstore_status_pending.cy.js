////Test case check pending status based on addpetstore
describe('Petstore API Testing - Find Pets by Status "pending"', () => {

    it('should return only pets with status "pending"', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/pet/findByStatus',
        qs: {
          status: 'pending' 
        },
        headers: {
          'accept': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
  
        response.body.forEach((pet) => {
          expect(pet).to.have.property('status', 'pending');
        });
  
        cy.log(`Jumlah pet dengan status "pending": ${response.body.length}`);
      });
    });
  
  });