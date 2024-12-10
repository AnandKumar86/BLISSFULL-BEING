
document.querySelector('.sign-up-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = e.target.querySelector('input[type="text"]').value;
  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;

  fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: username, email, password })
  })
  .then(response => response.json().then(result => ({ status: response.status, body: result })))
  .then(({ status, body }) => {
    if (status === 201) {
      alert('User created successfully! Redirecting to your profile...');
      window.location.href = 'profile.html';
    } else if (status === 409) {
      alert('User already exists. Please try logging in.');
      window.location.href = 'login.html';
    } else {
      alert(body.message || 'Registration failed. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
});


document.querySelector('.sign-in-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.querySelector('input[type="text"]').value;
  const password = e.target.querySelector('input[type="password"]').value;

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      window.location.href = 'profile.html';
    } else {
      alert(result.message || 'Login failed. Redirecting to login page...');
      window.location.href = 'login.html';
    }
  } catch (error) {
    alert('An error occurred. Please check your network connection.');
    console.error('Login error:', error);
    window.location.href = 'login.html'; // Redirect to login page on network or server error
  }

});


