/**
 * @param {String[]} logins
 */
export default function(logins = []) {
   let result = {
      users: {},
      begin: false,
      end: false,
      state: [],
      step: null,
      point: 0,
      summPoints: 0
   };

   if (logins instanceof Array && logins.length) {
      logins.forEach(login => {
         result = addUser(result, gameAddUser(login));
      });
   }

   return result;
};