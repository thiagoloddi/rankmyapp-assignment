import { expect } from 'chai';
import app from '../server';
import mongodb from '../api/db';
import { create, getAll, getOne, edit, remove } from '../api/controllers/alarms.controller';

const SAMPLE_ALARM = {
  name: 'Sample Alarm',
  email: 'test@test.com',
  period: 2,
  search_term: 'Alarm Clock'
};

describe('test connection', () => {
  it('sould connect to db', done => {
    mongodb(app)
      .then(() => done());
  });
});

describe('POST /alarms', () => {
  it('should create an alarm', done => {
    create(null, SAMPLE_ALARM)
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('email');
        expect(response.data).to.have.property('period');
        expect(response.data).to.have.property('search_term');

        SAMPLE_ALARM.id = response.data._id;

        done();
      });
  });

  it('should fail with 500', done => {
    create(null, {})
      .then(response => {
        expect(response.status).to.equal(500);
        done();
      });
  });
});

describe('GET /alarms', () => {
  it('should get all alarms', done => {
    getAll()
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.data).to.be.a('array');
        done();
      })
  });
});

describe('GET /alarms/:alarm_id', () => {
  it('should get one alarm', done => {
    getOne({ alarm_id: SAMPLE_ALARM.id })
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('email');
        expect(response.data).to.have.property('period');
        expect(response.data).to.have.property('search_term');

        done();
      });
  });

  it('should fail with 500', done => {
    getOne({})
      .then(response => {
        expect(response.status).to.equal(500);
        done();
      });
  });
});

describe('PUT /alarms/:alarm_id', () => {
  it('should edit one alarm', done => {
    edit({ alarm_id: SAMPLE_ALARM.id }, SAMPLE_ALARM)
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('email');
        expect(response.data).to.have.property('period');
        expect(response.data).to.have.property('search_term');

        done();
      });
  });

  it('should fail with 500', done => {
    edit({})
      .then(response => {
        expect(response.status).to.equal(500);
        done();
      });
  });
});

describe('DELETE /alarms/:alarm_id', () => {
  it('should delete one alarm', done => {
    remove({ alarm_id: SAMPLE_ALARM.id })
      .then(response => {
        expect(response.status).to.equal(200);
        done();
      });
  });
});