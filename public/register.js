document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            const result = await response.json();
            // Handle success, e.g., redirect to another page or show a success message
            console.log('Registration successful', result);
        } else {
            // Handle errors, e.g., show an error message
            console.error('Registration failed', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
});