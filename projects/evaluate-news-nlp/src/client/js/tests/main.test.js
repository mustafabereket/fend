import {expect} from "@jest/globals";
import {handleSubmit, submitSentimentQuery} from '../formHandler'
const request = require('supertest');
import app from '../../../server/index';
test('HandleSubmit function is defined ', () => {
    expect(handleSubmit).toBeDefined();

});
test('submitSentimentQuery is defined ', () => {
    expect(submitSentimentQuery).toBeDefined();

});

describe("GET / test", () => {
    test("It should respond with an mock api response", async () => {
        const response = await request(app).get("/test");
        expect(response.body).toEqual({
            'title': 'test json response',
            'message': 'this is a message',
            'time': 'now'
        })
        expect(response.statusCode).toBe(200);
    });

    test("It should return an actual api response when using a proper sentence", async () => {
        const response = await request(app).post("/sentiment").send({input: 'I am so hurt and I feel so much pain, I miss her'});
        expect(response.body).toHaveProperty("text")
        expect(response.body).toHaveProperty("subjectivity")
        expect(response.statusCode).toBe(200);
    });
});
