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

const confirmUser = async (token, tokenId) => {
  if (!token || !tokenId) {
    throw new Error('Invalid token or token ID');
  }
  await app.emailPasswordAuth.confirmUser({ token, tokenId });
};

export { getAccessToken, confirmUser };
