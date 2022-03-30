const httpMocks = require("node-mocks-http");

const { getById } = require("./products");

const mockFindOneProduct = jest.fn();
jest.mock("../../storage", () => {
  return {
    models: {
      product: {
        findOne: () => mockFindOneProduct(),
      },
    },
  };
});

test("getById returns an existing product", async () => {
  const request = httpMocks.createRequest({
    methode: "GET",
    url: "api/products/5",
    params: {
      id: 10,
    },
  });

  const response = httpMocks.createResponse();
  mockFindOneProduct.mockResolvedValue({
    id: "1",
    name: "product 1",
  });

  await getById(request, response);

  expect(response.statusCode).toEqual(200);
  expect(response._getJSONData()).toEqual({
    id: "1",
    name: "product 1",
  });
});

// test("getById returns 404 when a merchant id does not exists", async () => {
//   const request = httpMocks.createRequest({
//     methode: "GET",
//     url: "/api/merchants/2",
//     params: {
//       id: 2,
//     },
//   });

//   const response = httpMocks.createResponse();
//   mockFindOneMerchant.mockResolvedValue(null);

//   await getById(request, response);

//   expect(response.statusCode).toEqual(404);
//   expect(response._getData()).toEqual("404 - Not Found");
// });

// test("deleteById returns an remove merchant", async () => {
//   const request = httpMocks.createRequest({
//     methode: "DELETE",
//     url: "api/merchants/1",
//     params: {
//       id: 42,
//     },
//   });

//   const response = httpMocks.createResponse();
//   mockFindOneProduct.mockResolvedValue({
//     id: "1",
//     name: "Warteg Kharisma Bahari",
//   });

//   await getById(request, response);

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
//   mockFindOneProduct.mockResolvedValue({
//     id: "1",
//     name: "Warteg Kharisma Bahari",
//   });

//   await getById(request, response);

//   expect(response.statusCode).toEqual(200);
//   expect(response._getJSONData()).toEqual({
//     id: "1",
//     name: "Warteg Kharisma Bahari",
//   });
// });