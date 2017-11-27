// Set test ENV
process.env.NODE_ENV = 'test';

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.css'] = function () {return null;};
require.extensions['.png'] = function () {return null;};
require.extensions['.jpg'] = function () {return null;};
require.extensions['.html'] = function () {return null;};

const chai = require('chai');

// To ba able test promices
const chaiAsPrimised = require('chai-as-promised');
chai.use(chaiAsPrimised);

// Use chai BDD assertion style
global.expect = chai.expect;
global.should = chai.should();

// Mocking with sinon
global.sinon = require('sinon');