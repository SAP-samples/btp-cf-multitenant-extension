
const xsenv = require('@sap/xsenv');
const hana = require('@sap/hana-client');
const services = xsenv.getServices({
    hana: { name: 'easyfranchise-tenant-hdiconatiner' },
  });



/**
 * function to execute HANA query
 * @param {string} query 
 * @returns Promise
 */
const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        try{
            const conn = hana.createConnection();
            if(process.env.NODE_ENV === 'dev'){
                resolve([{SUBACCOUNTID: 'ga-saas-3', TENANTID: '1459aa4b-9d18-4f0e-8f87-fb6f9d03a19b'}]);
            }else{
                conn.connect(services.hana, (err) => {
                    if (err) throw err;
                    conn.exec(`SET SCHEMA ${services.hana.schema}`, (err1, result)=>{
                        if(err1){
                            console.error('Error connecting to HANA: ', err1);
                        reject(err1);                    
                    }
                    console.log('Connected to default schema', result);
                    conn.exec(query, (err2, result1)=>{
                        if(err2){
                            console.error(err2);
                            reject(err2);
                        }
                        conn.disconnect();
                        resolve(result1);
                    });
                    });
                });
            }
            
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
};

module.exports = executeQuery;