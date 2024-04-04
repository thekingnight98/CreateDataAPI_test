import request from "supertest";
import app from "../src/app";

describe("GET /users/group-by-department", () => {
  test("It should respond with an array of users grouped by department", async () => {
    const response = await request(app).get("/users/group-by-department");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  test("It should return an object with department keys containing arrays of users", async () => {
    const response = await request(app).get("/users/group-by-department");
    // ตรวจสอบว่ามี key ของแผนกและค่าเป็นอาร์เรย์
    Object.values(response.body).forEach(value => {
      expect(Array.isArray(value)).toBe(true);
    });
  });
  test("It should handle errors", async () => {
    const response = await request(app).get("/users/unknown-route");
    expect(response.statusCode).toBe(404);
  });
});

