import 'dotenv/config';
import Realm from 'realm-web';
import axios from 'axios';

// Realm setup
const app = new Realm.App({
  id: process.env.NEXT_PUBLIC_APP_ID,
});
const credentials = Realm.Credentials.anonymous();
const user = await app.logIn(credentials);
console.assert(user.id === app.currentUser.id);

// Endpoint setup
const endpoint = process.env.NEXT_PUBLIC_API_URL;
const token = user.accessToken;

const headers = {
  Authorization: `Bearer ${token}`,
};

// Fetch questions
const query = {
  operationName: '',
  query: `query {
    qandAS {
      _id
      content {
        title
        description
      }
    }
  }`,
  variables: {},
};

(async function fetchData() {
  try {
    const response = await axios({
      url: endpoint,
      method: 'POST',
      headers: headers,
      data: query,
    });
    console.log(response.data.data);
  } catch (err) {
    console.error(err);
  }
})();
