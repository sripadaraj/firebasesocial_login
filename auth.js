const authForm = document.getElementById('auth-form');
const message = document.getElementById('message');

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = authForm.email.value;
  const password = authForm.password.value;

  try {
    // Sign in user
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    message.textContent = `Logged in as: ${user.email}`;
  } catch (error) {
    message.textContent = `Error: ${error.message}`;
  }
});
