const {handleHDICreation, handleHDIDeletion}= require('../srv/hdiController');
const {dbHandler} = require('../utility/dbHandler');
var hdi;
describe('Create HDI Container using service manager, Connect to DB', () => {
    test('should create a new HDI container', async () => {
            hdi = await handleHDICreation('test-tenant', console);
            expect(hdi).toBeDefined();
            expect(hdi.status).toBe('CREATION_SUCCEEDED');
        },40000);
    test('should create HANA DB Connection', async () => {
            const client = await dbHandler(hdi.credentials, 'test-tenant', console);
            expect(client).toBeDefined();
    }, 40000);
    test('should delete the HDI container', async () => {
        const deltedHdi = await handleHDIDeletion('test-tenant', console);
        expect(deltedHdi).toBeDefined();
        expect(deltedHdi).toBe('Instance Deleted');
    }, 40000);
});
