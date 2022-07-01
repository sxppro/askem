import * as Realm from 'realm-web';

const app = new Realm.App({
  id: 'qa-mwchg',
});

const getAccessToken = async () => {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    await app.currentUser.refreshCustomData();
  }

  return app.currentUser.accessToken;
};

export { getAccessToken };
