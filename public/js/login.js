document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Login form data:', data);
  
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    const result = await res.json();
    if (result.success) {
      localStorage.setItem('userName', result.userName);
      window.location.href = 'dashboard.html';
    } else {
      alert(result.message);
    }
  });