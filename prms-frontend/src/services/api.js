const API_BASE = "http://127.0.0.1:8000/api/v1";

export async function login(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  return response.json();
}

export async function register(userData) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  return response.json();
}

export async function getProperties() {
  const response = await fetch(`${API_BASE}/properties/`);
  return response.json();
}