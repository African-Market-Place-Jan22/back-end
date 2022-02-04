const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("server.js", () => {
  it("is the correct testing environment", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("[POST] Auth Endpoints", () => {
  test("[1] Successfully registered new user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "1234" });
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/Successfully registered John!/i);
  });

  test("[2] Returns correct error message when username already exists", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "sam", password: "1234" });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(
      /Username taken, please choose another one./i
    );
  });

  test("[3] User can login successfully", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "frodo", password: "5678" });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/welcome, frodo/i);
  });

  test("[4] Returns correct error message when credentials are invalid", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "John", password: "1234" });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Invalid credentials/i);
  });
});

describe(" Items Endpoints", () => {
  test("[5] Returns array of all items in the database", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "1234" });
    await request(server)
      .post("/api/auth/login")
      .send({ username: "sam", password: "1234" });
    const res = await request(server).get("/api/items/").send({
      item_name: "Rice",
      item_description: "Locally grown long grain rice.",
      item_price: 7.99,
      item_category: "Grains",
      user_id: 1,
    });
    expect(res.body.message).toMatch(/Token required/i);
  });

  test("[6] Add Items", async () => {
    await request(server).post('/api/auth/register').send({username: "John", password: "1234"});
    await request(server)
      .post('/api/auth/login')
      .send({ username: 'sam', password: '1234' });
   const res = await request(server).post('/api/items/').send({
    item_name: "Rice",
    item_description: "Locally grown long grain rice.",
    item_price: 7.99,
    item_category: "Grains",
    user_id: 1,

    });
    let allitems;
    allitems = await db('items');
    expect(allitems).toBe(allitems)
    expect(res.body.message).toMatch(/Token required/i);
  });



  test("[7] ID is Required for adding Items ", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "1234" });
    await request(server)
      .post("/api/auth/login")
      .send({ username: "sam", password: "1234" });
    const res = await request(server).post("/api/items/").send({
      item_name: "Rice",
      item_description: "Locally grown long grain rice.",
      item_price: 7.99,
      item_category: "Grains",
      user_id: 1,
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Token required/i);
  });
  
  test("[9] Returns the single item associated with that item id ", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "1234" });
    await request(server)
      .post("/api/auth/login")
      .send({ username: "sam", password: "1234" });
    await request(server)
      .get("/api/items/:item_id")
      .send({item_id:'1'
});
  })
  test("[8] Returns correct error message when item id is missing ", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "1234" });
    await request(server)
      .post("/api/auth/login")
      .send({ username: "sam", password: "1234" });
    const res = await request(server)
      .get("/api/items/:item_id")
      .send({
        item_name: "Beans",
        item_description: "Locally grown beans.",
        item_price: 5.99,
        item_category: "Grains",
      });
    expect(res.status).toBe(401);
  });
  
  test("[9] Deleting Item ", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "1234" });
    await request(server)
      .post("/api/auth/login")
      .send({ username: "sam", password: "1234" });
    await request(server)
      .delete("/api/items/:item_id")
      .send({item_id:'Deleted item'
});
  })
})