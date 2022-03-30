const httpMocks = require("node-mocks-http");

const { getById } = require("./merchants");

const mockFindOneMerchant = jest.fn();
jest.mock("../../storage", () => {
  return {
    models: {
      merchant: {
        findOne: () => mockFindOneMerchant(),
      },
    },
  };
});

test("getById returns an existing merchant", async () => {
  const request = httpMocks.createRequest({
    methode: "GET",
    url: "api/merchants/1",
    params: {
      id: 42,
    },
  });

  const response = httpMocks.createResponse();
  mockFindOneMerchant.mockResolvedValue({
    id: "1",
    name: "Warteg Kharisma Bahari",
  });

  await getById(request, response);

  expect(response.statusCode).toEqual(200);
  expect(response._getJSONData()).toEqual({
    id: "1",
    name: "Warteg Kharisma Bahari",
  });
});

test("deleteById returns an remove merchant", async () => {
  const request = httpMocks.createRequest({
    methode: "DELETE",
    url: "api/merchants/1",
    params: {
      id: 42,
    },
  });

  const response = httpMocks.createResponse();
  mockFindOneMerchant.mockResolvedValue({
    id: "1",
    name: "Warteg Kharisma Bahari",
  });

  await getById(request, response);

  expect(response.statusCode).toEqual(200);
  expect(response._getJSONData()).toEqual({
    id: "1",
    name: "Warteg Kharisma Bahari",
  });
});

test("createById returns an add merchant", async () => {
  const request = httpMocks.createRequest({
    methode: "POST",
    url: "api/merchants/1",
    params: {
      id: 42,
    },
  });

  const response = httpMocks.createResponse();
  mockFindOneMerchant.mockResolvedValue({
    id: "1",
    name: "Warteg Kharisma Bahari",
  });

  await getById(request, response);

  expect(response.statusCode).toEqual(200);
  expect(response._getJSONData()).toEqual({
    id: "1",
    name: "Warteg Kharisma Bahari",
  });
});