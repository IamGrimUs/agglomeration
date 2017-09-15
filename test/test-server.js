const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const mongoose = require('mongoose');

const should = chai.should();
const jwt = require('jsonwebtoken');

const server = require('../server');
const { runServer, closeServer } = require('../server');
const Department = require('../app/department/department.model');
const User = require('../app/user/user.model');
const { TEST_DATABASE_URL } = require('../config');
const config = require('../config');

const app = server.app;

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

chai.use(chaiHttp);

const departments = [
  'department-0',
  'department-1',
  'department-2',
  'department-3',
  'department-4',
  'department-5',
  'department-6'
];

describe('index page display', function() {
  it('exists', function(done) {
    chai
      .request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
});

// used to generate data for db
function seedUserData() {
  const seedData = [];

  for (let i = 1; i <= 10; i++) {
    seedData.push(generateUserData());
  }

  return User.insertMany(seedData);
}

// generate an object represnting a user
// can be used to generate seed data for db
// or request.body data
function generateUserData() {
  let departmentName = generateDepartmentName();
  let departmentObject = new userDepartment(
    departmentName,
    '41224d776a326fb40f00000' + departments.indexOf(departmentName)
  );
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    biography: faker.lorem.sentences(),
    email: faker.internet.email(),
    telephone: '123-456-7890',
    departmentId: departmentObject.id,
    departmentName: departmentObject.name,
    position: faker.lorem.words(),
    state: faker.address.usState,
    country: faker.lorem.words(),
    favoritePartOfDay: faker.lorem.sentences(),
    hobbies: faker.lorem.words(),
    password: 'password'
  };
}

function userDepartment(name, id) {
  (this.name = name), (this.id = id);
}

function seedDepartmentData() {
  const seedData = [];

  for (let i = 1; i <= 7; i++) {
    seedData.push(generateDepartmentData());
  }
  return Department.insertMany(seedData);
}

// generate an object represnting a department
// can be used to generate seed data for db
function generateDepartmentData() {
  return {
    name: generateDepartmentName()
  };
}

// used to generate data to put in db
function generateDepartmentName() {
  let departmentName =
    departments[Math.floor(Math.random() * departments.length)];

  return departmentName;
}
// used to delete the entire database.
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

function userLogin() {
  console.info('Hello world');
}

describe('User API resource', function() {
  let mockUser;
  let mockJwt;
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(async function() {
    let users = await seedUserData();
    mockUser = users[0];
    mockJwt = createAuthToken(users[0]);
    return seedUserData();
  });

  beforeEach(function() {
    return seedDepartmentData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {
    it('should return all existing users', function() {
      // strategy:
      //    1. get back all users returned by by GET request to `/user`
      //    2. prove user has right status, data type
      //    3. prove the number of uerss we got back is equal to number in db.

      let res;
      return chai
        .request(app)
        .get('/user')
        .set('Authorization', `Bearer ${mockJwt}`)
        .then(function(_res) {
          // so subsequent .then blocks can access resp obj.
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.users.should.have.length.of.at.least(1);
          return res.body.users.length;
        })
        .then(function(count) {
          res.body.users.should.have.lengthOf(count);
        });
    });

    it('should return users with the right fields', function() {
      // Strategy: Get back all restaurants, and ensure they have expected keys

      let resUser;
      return chai
        .request(app)
        .get('/user')
        .set('Authorization', `Bearer ${mockJwt}`)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.users.should.be.a('array');
          res.body.users.should.have.length.of.at.least(1);

          res.body.users.forEach(function(user) {
            user.should.be.a('object');
            user.should.include.keys(
              'id',
              'firstName',
              'lastName',
              'fullName',
              'email',
              'telephone',
              'biography',
              'position',
              'departmentId',
              'departmentName',
              'country',
              'favoritePartOfDay',
              'hobbies'
            );
          });
          resUser = res.body.users[0];
          return User.findById(resUser.id);
        })
        .then(function(user) {
          resUser.id.should.equal(user.id);
          resUser.firstName.should.equal(user.firstName);
          resUser.lastName.should.equal(user.lastName);
          resUser.fullName.should.equal(user.fullName);
          resUser.email.should.equal(user.email);
          resUser.telephone.should.equal(user.telephone);
          resUser.biography.should.equal(user.biography);
          resUser.position.should.equal(user.position);
          resUser.departmentId.should.equal(user.departmentId);
          resUser.hobbies.should.equal(user.hobbies);
          resUser.country.should.equal(user.country);
          resUser.favoritePartOfDay.should.equal(user.favoritePartOfDay);
        });
    });
  });

  describe('GET endpoint', function() {
    it('should return all existing departments', function() {
      // strategy:
      //    1. get back all departments returned by by GET request to `/departments`
      //    2. prove department has right status, data type
      //    3. prove the number of departments we got back is equal to number in db.

      let res;
      return chai
        .request(app)
        .get('/department')
        .set('Authorization', `Bearer ${mockJwt}`)
        .then(function(_res) {
          // so subsequent .then blocks can access resp obj.
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.departments.should.have.length.of.at.least(1);
          return res.body.departments.length;
        })
        .then(function(count) {
          res.body.departments.should.have.lengthOf(count);
        });
    });

    it('should return departments with the right fields', function() {
      // Strategy: Get back all restaurants, and ensure they have expected keys

      let resDepartment;
      return chai
        .request(app)
        .get('/department')
        .set('Authorization', `Bearer ${mockJwt}`)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.departments.should.be.a('array');
          res.body.departments.should.have.length.of.at.least(1);

          res.body.departments.forEach(function(department) {
            department.should.be.a('object');
            department.should.include.keys('id', 'name');
          });
          resDepartment = res.body.departments[0];
          return Department.findById(resDepartment.id);
        })
        .then(function(department) {
          resDepartment.name.should.equal(department.name);
        });
    });
  });

  describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the user we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new user', function() {
      const newUser = generateUserData();
      return chai
        .request(app)
        .post('/user/')
        .set('Authorization', `Bearer ${mockJwt}`)
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id',
            'firstName',
            'lastName',
            'fullName',
            'email',
            'telephone',
            'biography',
            'position',
            'departmentId',
            'departmentName',
            'country',
            'hobbies'
          );
          // cause Mongo should have created id on insertion
          res.body.id.should.not.be.null;
          res.body.firstName.should.equal(newUser.firstName);
          res.body.lastName.should.equal(newUser.lastName);
          res.body.email.should.equal(newUser.email);
          res.body.telephone.should.equal(newUser.telephone);
          res.body.biography.should.equal(newUser.biography);
          res.body.position.should.equal(newUser.position);
          res.body.departmentId.should.equal(newUser.departmentId);
          res.body.hobbies.should.equal(newUser.hobbies);
          res.body.country.should.equal(newUser.country);
          return User.findById(res.body.id);
        })
        .then(function(user) {
          user.fullName.should.equal(
            newUser.firstName + ' ' + newUser.lastName
          );
          user.firstName.should.equal(newUser.firstName);
          user.lastName.should.equal(newUser.lastName);
          user.email.should.equal(newUser.email);
          user.telephone.should.equal(newUser.telephone);
          user.biography.should.equal(newUser.biography);
          user.position.should.equal(newUser.position);
          user.departmentId.should.equal(newUser.departmentId);
          user.country.should.equal(newUser.country);
          user.hobbies.should.equal(newUser.hobbies);
        });
    });
  });

  describe('PUT endpoint', function() {
    // strategy:
    //  1. Get an existing user from db
    //  2. Make a PUT request to update that user
    //  3. Prove user returned by request contains data we sent
    //  4. Prove user in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = {
        firstName: 'Rumbleton',
        lastName: 'Fingerbanger'
      };

      return User.findOne()
        .then(function(user) {
          updateData.id = user.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai
            .request(app)
            .put(`/user/${user.id}`)
            .set('Authorization', `Bearer ${mockJwt}`)
            .send(updateData);
        })
        .then(function(res) {
          res.should.have.status(204);

          return User.findById(updateData.id);
        })
        .then(function(user) {
          user.firstName.should.equal(updateData.firstName);
          user.lastName.should.equal(updateData.lastName);
        });
    });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a user
    //  2. make a DELETE request for that user's id
    //  3. assert that response has right status code
    //  4. prove that user with the id doesn't exist in db anymore
    it('delete a user by id', function() {
      let user;

      return User.findOne()
        .then(function(_user) {
          user = _user;
          return chai
            .request(app)
            .delete(`/user/${user.id}`)
            .set('Authorization', `Bearer ${mockJwt}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return User.findById(user.id);
        })
        .then(function(_user) {
          // when a variable's value is null, chaining `should`
          // doesn't work. so `_user.should.be.null` would raise
          // an error. `should.be.null(_user)` is how we can
          // make assertions about a null value.
          should.not.exist(_user);
        });
    });
  });
});
