export const signUp = credentials => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    const res = await firestore
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);

    console.log(res);
  } catch (err) {}
};
