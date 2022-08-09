const config = {
    endpoint: "https://wxyz.documents.azure.com:443/",
    key: "AtlhTHaywLguZgTJt8l6JODCq5WtDb9zskEyagr6c3J8R9Xx4RRNmueEGxNQyNitgpI2M8lRlSzPCaCb1qkbtw==",
    databaseId: "Details",
    containerId: "Employees",
    partitionKey: { kind: "Hash", paths: ["/name"] }
  };
  
  module.exports = config;