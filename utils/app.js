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
    return;
  }
  await app.emailPasswordAuth.registerUser({ email, password });
};

export { getAccessToken, createNewUser };
