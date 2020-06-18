const supertest = require('supertest');

const db = require('../data/dbConfig');
const server = require('./server.js');


it('should use the test environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('server', () => {
    beforeEach(async () => {
        await db('inventory').truncate();
    });

    describe('GET /', () => {
        it('should return 200 OK', () => {
            return supertest(server).get('/').then(res => {
                expect(res.status).toBe(200);
            });
        });

        it('should return api: up', () => {
            return supertest(server).get('/')
            .then(res => {
                expect(res.body.api).toBe('up');
            });
        });

        it('should return JSON', () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });
    });

    describe('GET /inventory', () => {
        it('should return 200 OK', () => {
            return supertest(server).get('/inventory').then(res => {
                expect(res.status).toBe(200);
            });
        });

        it('should return an empty array', () => {
            return supertest(server).get('/inventory').then(res => {
                expect(res.body).toHaveLength(0);
            })
        })
    });

    describe('POST /inventory', () => {
        const arrow = {
            name: 'arrow',
            type: 'ammo',
            quantity: 50
        }
        const food = {
            name: 'food',
            type: 'food',
            quantity: 1
        }
        it('should return 201 OK', () => {
            return supertest(server).post('/inventory')
            .send(arrow)
            .then(res => {
                expect(res.status).toBe(201);
            });
        });

        it('should save the item', () => {
            return supertest(server)
            .post('/inventory')
            .send(arrow)
            .then(res => {
                expect(res.body.name).toBe("arrow")
            });
        });

        it('should save all items', async () => {
            const items = [ arrow, food ];
            await supertest(server)
            .post('/inventory')
            .send(items);

            let allitems = await supertest(server).get("/inventory");
            expect(allitems.body).toHaveLength(2);
        });
    })
})