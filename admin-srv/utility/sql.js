/**
 * Funtion execute sql query
 * @param {string} query sql query
 * @param {*} hanaClient DB client
 * @return {Promise<any>}
 */
async function executeQuery(query, hanaClient) {
  return new Promise((resolve, reject) => {
    hanaClient.exec(query, (err, result) => {
      hanaClient.disconnect();
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = executeQuery;
