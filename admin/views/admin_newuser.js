export function newCostumerView() {
    return `
    <h2>Create New Costumer</h2>
    <form id="new-costumer-form">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" name="phone" required>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="address">Address:</label>
        <input type="text" id="address" name="address" required>
        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value=1>Active</option>
            <option value=0>Inactive</option>
        </select>
        <label for="note">Note:</label>
        <textarea id="note" name="note"></textarea>
        <label for="city">City:</label>
        <input type="text" id="city" name="city">
        <label for="main_language">Main Language:</label>
        <input type="text" id="main_language" name="main_language">
        <button type="submit">Create Costumer</button>
    </form>
    <div id="form-message"></div>
    `;
}

export function setupNewCostumer() {
    document.getElementById('new-costumer-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const phone = document.getElementById('phone').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const status = document.getElementById('status').value;
        const note = document.getElementById('note').value;
        const city = document.getElementById('city').value;
        const mainLanguage = document.getElementById('main_language').value;

        const body = {
            phone,
            name,
            address,
            status,
            note,
            city,
            main_language: mainLanguage
        };

        try {
            const response = await fetch('http://localhost:3000/costumers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            document.getElementById('form-message').textContent = 'Costumer created successfully!';
            document.getElementById('new-costumer-form').reset();
            
        } catch (error) {
            alert('Error creating costumer:', error);
            document.getElementById('form-message').textContent = 'Error creating costumer. Please try again.';
        }
    });
}