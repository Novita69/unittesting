// const req = require("express/lib/request");
const httpMocks = require("node-mocks-http");

const { login } = require("./auth");

const mockFindOneAuth = jest.fn();
jest.mock("../../storage", () => {
  return {
    models: {
      auth: {
        findOne: () => mockFindOneAuth(),
      },
    },
  };
});

test("login returns an existing merchant", async () => {
  const request = httpMocks.createRequest({
    methode: "POST",
    url: "api/merchants/1",
    params: {
        name: req.body.name
    },
  });

  const response = httpMocks.createResponse();
  mockFindOneAuth.mockResolvedValue({
    name: req.body.name
  });

  await login(request, response);

  expect(response.statusCode).toEqual(200);
  expect(response._getJSONData()).toEqual({
    name: req.body.name
  });
});

// // test("getById returns 404 when a merchant id does not exists", async () => {
// //   const request = httpMocks.createRequest({
// //     methode: "GET",
// //     url: "/api/merchants/2",
// //     params: {
// //       id: 2,
// //     },
// //   });

// //   const response = httpMocks.createResponse();
// //   mockFindOneMerchant.mockResolvedValue(null);

// //   await getById(request, response);

// //   expect(response.statusCode).toEqual(404);
// //   expect(response._getData()).toEqual("404 - Not Found");
// // });

// test("deleteById returns an remove merchant", async () => {
//   const request = httpMocks.createRequest({
//     methode: "DELETE",
//     url: "api/merchants/1",
//     params: {
//       id: 42,
//     },
//   });

//   const response = httpMocks.createResponse();
//   mockFindOneAuth.mockResolvedValue({
//     id: "1",
//     name: "Warteg Kharisma Bahari",
//   });

//   await login(request, response);

//   expect(response.statusCode).toEqual(200);
//   expect(response._getJSONData()).toEqual({
//     id: "1",
//     name: "Warteg Kharisma Bahari",
//   });
// });

// test("createById returns an add merchant", async () => {
//   const request = httpMocks.createRequest({
//     methode: "POST",
//     url: "api/merchants/1",
//     params: {
//       id: 42,
//     },
//   });

//   const response = httpMocks.createResponse();
//   mockFindOneAuth.mockResolvedValue({
//     id: "1",
//     name: "Warteg Kharisma Bahari",
//   });

//   await login(request, response);

//   expect(response.statusCode).toEqual(200);
//   expect(response._getJSONData()).toEqual({
//     id: "1",
//     name: "Warteg Kharisma Bahari",
//   });
// });