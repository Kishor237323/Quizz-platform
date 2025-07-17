const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('Health:', healthData);

    // Test auth register endpoint
    console.log('\nTesting auth register endpoint...');
    const registerResponse = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@test.com',
        password: '123456'
      })
    });
    
    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('Register success:', registerData);
    } else {
      const errorData = await registerResponse.json();
      console.log('Register error:', errorData);
    }

    // Test auth login endpoint
    console.log('\nTesting auth login endpoint...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: '123456'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('Login success:', loginData);
    } else {
      const errorData = await loginResponse.json();
      console.log('Login error:', errorData);
    }

  } catch (error) {
    console.error('Test error:', error.message);
  }
}

testAPI(); 