const request = require("supertest");
const { expect } = require("chai");

const BASE_URL = "https://restful-booker.herokuapp.com";

describe("Restful-Booker API tests", () => {
  let token;
  let bookingId;

  it("should create an auth token", async () => {
    const res = await request(BASE_URL)
      .post("/auth")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ username: "admin", password: "password123" });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    token = res.body.token;
  });

  it("should create a booking", async () => {
    const res = await request(BASE_URL)
      .post("/booking")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        firstname: "John",
        lastname: "Doe",
        totalprice: 123,
        depositpaid: true,
        bookingdates: { checkin: "2025-01-01", checkout: "2025-01-05" },
        additionalneeds: "Breakfast",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("bookingid");
    bookingId = res.body.bookingid;
  });

  it("should get booking by id", async () => {
    const res = await request(BASE_URL)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");

    expect(res.status).to.equal(200);
    expect(res.body.firstname).to.equal("John");
    expect(res.body.lastname).to.equal("Doe");
  });

  it("should update booking", async () => {
    const res = await request(BASE_URL)
      .put(`/booking/${bookingId}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Cookie", `token=${token}`)
      .send({
        firstname: "Jane",
        lastname: "Doe",
        totalprice: 150,
        depositpaid: true,
        bookingdates: { checkin: "2025-02-01", checkout: "2025-02-05" },
        additionalneeds: "Lunch",
      });

    expect(res.status).to.equal(200);
    expect(res.body.firstname).to.equal("Jane");
    expect(res.body.totalprice).to.equal(150);
  });

  it("should delete booking", async () => {
    const res = await request(BASE_URL)
      .delete(`/booking/${bookingId}`)
      .set("Accept", "application/json")
      .set("Cookie", `token=${token}`);

    // Restful-Booker vraća 201 na uspešan DELETE
    expect(res.status).to.equal(201);
  });
});
