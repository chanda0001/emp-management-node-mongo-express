// Logout function to clear local storage and redirect to login page
function logout() {
  localStorage.removeItem("userName");
  window.location.href = "/login.html";
}

document.addEventListener('DOMContentLoaded', function() {

  const user = localStorage.getItem('userName') || '';
  if (user === '') {
      window.location.href = "/login.html";
  } else {
      // window.location.href = 'dashboard.html';
  }

  // 
  const addEmpForm = document.getElementById('employeeForm');
  if (addEmpForm) {
    addEmpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const res = await fetch('/employee/create', {
        method: 'POST',
        body: formData
      });
    
      const result = await res.json();
      if (result.success) {
        alert('Employee Created!');
        form.reset();
      } else {
        alert(result.message);
      }
    });
  }
});

