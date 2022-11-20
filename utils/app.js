import * as Realm from 'realm-web';

const app = new Realm.App({
  id: process.env.NEXT_PUBLIC_APP_ID,
});

const getAccessToken = async () => {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
};

const createNewUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  await app.emailPasswordAuth.registerUser({ email, password });
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    return user;
  } catch (err) {
    console.error('Failed to authenticate', err.message);
  }
};

const resetPassword = async (token, tokenId, password) => {
  if (!token || !tokenId || !password) {
    throw new Error('Password, token and token ID are required');
  }
  await app.emailPasswordAuth.resetPassword(token, tokenId, password);
};

const getUser = () => {
  return app.currentUser;
};

export { getAccessToken, createNewUser, resetPassword, login, getUser };
