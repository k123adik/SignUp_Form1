const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordMatchMessage = document.getElementById('passwordMatchMessage');

//form submit event
signupForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
 

  //check input fields are empty or not
  if(!username || !email || !password || !confirmPassword){
    signupMessage.innerText = 'Error: All fields are mandatory!'
    signupMessage.style.fontSize = '18px'
    signupMessage.style.color = '#625BF7'
    signupMessage.style.fontWeight = '700'
    return;
  }

 //validate username
  if (!isValidUsername(username)) {
    signupMessage.textContent = 'Username must be contain letters and spaces';
    signupMessage.style.color = '#dc3545'
    return;
  }

  //chech password is matched or not
  if (password !== confirmPassword) {
    signupMessage.textContent = 'Passwords do not match. Please try again.';
    signupMessage.style.color = '#dc3545';
    return;
  }

  //check password is strong or not
  if (!isPasswordStrong(password)) {
    signupMessage.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    signupMessage.style.fontSize = '12px';
    signupMessage.style.color = '#dc3545'
    return;
  }

  // Generate a random 16-byte access token
  const accessToken = generateRandomToken();

  // Store user details in local storage
  const user = {
    username: username,
    email: email,
    accessToken: accessToken,
    password: password
  };

  localStorage.setItem('user', JSON.stringify(user));//we have to send any object in JSON format

  signupMessage.textContent = 'Redirecting to your profile...';
  signupMessage.style.color = '#198754'
  setTimeout(() => {
    //after 2 sec it will be redirected to profile.html file
    window.location.href = 'profile.html';
  }, 2000);
});



//validate username
function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z ]+$/ ;
    return usernameRegex.test(username);
  }
