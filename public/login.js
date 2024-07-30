document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const result = await response.json();
            // Handle success, e.g., redirect to another page or show a success message
            console.log('Login successful', result);
        } else {
            // Handle errors, e.g., show an error message
            console.error('Login failed', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
