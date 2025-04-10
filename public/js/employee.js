// Logout function to clear local storage and redirect to login page
function logout() {
  localStorage.removeItem("userName");
  window.location.href = "/login";
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('DOMContentLoaded', function() {

  const user = localStorage.getItem('userName') || '';  
  document.getElementById("userName").innerText = capitalizeFirstLetter(user);
  if (user === '') {
      window.location.href = "/login";
  } else {
      // window.location.href = 'home';
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

  // Active menue
  const currentPath = window.location.pathname;

  if (currentPath.includes("employee")) {
    document.getElementById("nav-employee").classList.add("active");
  } else if (currentPath === "/" || currentPath === "/home") {
    document.getElementById("nav-home").classList.add("active");
  }
});

