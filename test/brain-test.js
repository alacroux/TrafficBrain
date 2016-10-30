var chai        = require('chai');
var expect      = chai.expect;
var brain       = require('../components/brain').getSingleton();

describe('Brain', function() {
    
    it('setColor() should change the color of northSouth from red to green', function() {
        expect(brain.getIntersection()).to.have.property('northSouth', 'red');
        brain.setColor("northSouth", 'green');
        expect(brain.getIntersection()).to.have.property('northSouth', 'green');
    });

});


