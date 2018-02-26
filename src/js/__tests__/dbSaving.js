const mongoose = require('mongoose');
const Form = require('../../../controllers/formController');

describe('Saving records to the database', () => {
    let record;
    let testData = {
      firstName: 'Ted',
      lastName: 'Testing',
      email: 'test@test',
      date: '2018-02-26',
    };

    beforeEach(() => {
      record = new Form(testData);
      return record.save();
    });

    it('Created record can be found in database', function() {
      Form.findOne({_id:record._id}).then(function(result) {
          expect(result._id.toString()).toEqual(record._id.toString());
        });
    });

    afterAll((done) => {
      Form.findOneAndRemove({_id: record._id}).then(function() {
      mongoose.disconnect(done);
    });
  });
});
