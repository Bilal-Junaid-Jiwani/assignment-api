// Signup
const signupForm = document.getElementById('signupForm');
if(signupForm){
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await res.json();
        alert(result.msg);
        if(res.ok) window.location.href = 'index.html';
    });
}

// Login
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const result = await res.json();
        alert(result.msg);
        if(res.ok) window.location.href = 'profile.html';
    });
}

// Get Profile
const profileDiv = document.getElementById('profileData');
if(profileDiv){
    fetch('/api/profile', {credentials: 'include'})
        .then(res => res.json())
        .then(data => {
            if(data.msg) alert(data.msg);
            else profileDiv.innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
            `;
        });
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
    logoutBtn.addEventListener('click', async () => {
        const res = await fetch('/api/auth/logout', {method: 'POST', credentials: 'include'});
        const result = await res.json();
        alert(result.msg);
        if(res.ok) window.location.href = 'index.html';
    });
}
