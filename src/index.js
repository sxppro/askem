const axios = require('axios');

const endpoint =
  'https://ap-southeast-2.aws.realm.mongodb.com/api/client/v2.0/app/qa-mwchg/graphql';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjJiYTdmY2FiNDI0YmM5MTkwYWMzMmM0IiwiZXhwIjoxNjU2NDY1NzEwLCJpYXQiOjE2NTY0NjM5MTAsImlzcyI6IjYyYmJhMjI2MTVmNDBhN2VkNDA1MDI3NSIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjYyYmE3ZmNhYjQyNGJjOTE5MGFjMzJjNCIsInN1YiI6IjYyYmJhMjI2MTVmNDBhN2VkNDA1MDI3MyIsInR5cCI6ImFjY2VzcyJ9.7aEZ_qi3N4K4u8mpXCyvZh1VDkKYrLRxI6fEh9bhuq4';

const headers = {
  Authorization: `Bearer ${token}`,
};

const query = {
  operationName: '',
  query: `query {
    customers {
      _id
      name
      email
      address
      accounts {
        account_id
        limit
      }
    }
  }`,
  variables: {},
};

const options = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(query),
};

(async function fetchData() {
  const response = await axios({
    url: endpoint,
    method: 'POST',
    headers: headers,
    data: query,
  });

  console.log(response.data.data);
})();
