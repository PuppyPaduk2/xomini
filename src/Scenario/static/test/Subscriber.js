import chai from 'chai';
import Subscriber from '../Subscriber';

const expect = chai.expect;

const test = () => {
   console.log('test');
};
const test2 = () => {
   console.log('test2');
};

let subscriber;

describe('Subscriber', () => {

   it('#new + add handlers', () => {
      subscriber = new Subscriber({
         test: test
      });

      expect(subscriber).to.have.key('handlers');
      expect(subscriber.handlers).to.have.key('test');
   });

   it('#off() all', () => {
      subscriber.off();

      expect(subscriber.handlers).to.have.not.key('test');
   });

   it('#on() "string"', () => {
      subscriber.on('test', test);

      expect(subscriber.handlers).to.have.key('test');
   });

   it('#off() "Function"', () => {
      subscriber.off(test);
      expect(subscriber.handlers).to.have.not.key('test');
   });

   it('#on() "object"', () => {
      subscriber.on({
         test: test,
         test2: test2
      });

      expect(subscriber.handlers).to.have.keys('test', 'test2');
   });

   it('#off() only "test"', () => {
      subscriber.on('test', test2);
      subscriber.on('test2', test);

      expect(subscriber.handlers.test).to.have.lengthOf(2);
      expect(subscriber.handlers.test2).to.have.lengthOf(2);

      subscriber.off(test);

      expect(subscriber.handlers).to.have.keys('test', 'test2');
      expect(subscriber.handlers.test).to.have.lengthOf(1);
      expect(subscriber.handlers.test2).to.have.lengthOf(1);
   });

   it('#off() by name event + callback', () => {
      subscriber.off('test', test2);
      subscriber.off('test2', test2);

      expect(subscriber.handlers).to.not.keys('test', 'test2');
   });

   it('#off() handlers event is not exist', () => {
      subscriber.off('test', test);
   });

   it('#off() by name event', () => {
      subscriber.on({
         test: test,
         test2: test2
      });

      expect(subscriber.handlers).to.have.keys('test', 'test2');

      subscriber.off('test2');

      expect(subscriber.handlers).to.have.key('test');
      expect(subscriber.handlers).to.have.not.key('test2');
   });

   it('#off() by object', () => {
      subscriber.on({
         test: test,
         test2: test2
      });

      subscriber.on('test', test2);

      expect(subscriber.handlers).to.have.keys('test', 'test2');

      subscriber.off({
         test: test,
         test2: test2
      });

      expect(subscriber.handlers).to.have.key('test');
      expect(subscriber.handlers.test).to.have.lengthOf(1);
      expect(subscriber.handlers).to.have.not.key('test2');
   });

   it('#off() by array handlers', () => {
      let hdls = [test, test2];

      subscriber.off().on('hdls', hdls);

      expect(subscriber.handlers).to.have.key('hdls');

      subscriber.off('hdls', hdls);

      expect(subscriber.handlers).to.have.not.key('hdls');

      subscriber.on({
         hdls: hdls,
         hdls2: hdls
      }).off(hdls);

      expect(subscriber.handlers).to.have.not.keys('hdls', 'hdls2');
   });

});
