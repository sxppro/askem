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

const resetPassword = async (token, tokenId, password) => {
  if (!token || !tokenId || !password) {
    throw new Error('Password, token and token ID are required');
  }
  await app.emailPasswordAuth.resetPassword(token, tokenId, password);
};

export { getAccessToken, createNewUser, resetPassword };
