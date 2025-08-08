export function costumersView() {
    return `
    <button id="addUser">Add User</button>
    <table id="user-table">
        <tr>
            <th>ID</th>
            <th>Phone</th>
            <th>Name</th>
            <th>Address</th>
            <th>Status</th>
            <th>Note</th>
            <th>City</th>
            <th>Main Language</th>
            <th>Actions</th>
        </tr>
  `;
}

export function setupCostumers() {
    showUsers();
    document.getElementById('user-table').addEventListener('click', async function (event) {
        if (event.target.id === 'editUser') {
            event.preventDefault();
            const phone = event.target.closest('tr').querySelector('td:nth-child(2)');
            phone.innerHTML = `<input type="text" value="${phone.textContent}">`;
            const costumer = event.target.closest('tr').querySelector('td:nth-child(3)');
            costumer.innerHTML = `<input type="text" value="${costumer.textContent}">`;
            const address = event.target.closest('tr').querySelector('td:nth-child(4)');
            address.innerHTML = `<input type="text" value="${address.textContent}">`;
            const costumerStat = event.target.closest('tr').querySelector('td:nth-child(5)');
            costumerStat.innerHTML = `<select>
                <option value=1>Active</option>
                <option value=0>Inactive</option>
            </select>`;
            const note = event.target.closest('tr').querySelector('td:nth-child(6)');
            note.innerHTML = `<textarea>${note.textContent}</textarea>`;
            const city = event.target.closest('tr').querySelector('td:nth-child(7)');
            city.innerHTML = `<input type="text" value="${city.textContent}">`;
            const mainLanguage = event.target.closest('tr').querySelector('td:nth-child(8)');
            mainLanguage.innerHTML = `<input type="text" value="${mainLanguage.textContent}">`;
            event.target.textContent = 'Save';
            event.target.id = 'saveUser';
        } else if (event.target.id === 'saveUser') {
            event.preventDefault();
            const row = event.target.closest('tr');
            const id = row.querySelector('td:nth-child(1)').textContent;
            const phone = row.querySelector('td:nth-child(2) input').value;
            const name = row.querySelector('td:nth-child(3) input').value;
            const address = row.querySelector('td:nth-child(4) input').value;
            const status = row.querySelector('td:nth-child(5) select').value;
            const note = row.querySelector('td:nth-child(6) textarea').value;
            const city = row.querySelector('td:nth-child(7) input').value;
            const mainLanguage = row.querySelector('td:nth-child(8) input').value;

            // Aquí puedes agregar la lógica para enviar los datos actualizados al servidor
            let body = {
                phone,
                name,
                address,
                status,
                note,
                city,
                main_language: mainLanguage
            };
            try {
                const response = await fetch(`http://localhost:3000/costumers/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                row.querySelector('td:nth-child(2)').textContent = phone;
                row.querySelector('td:nth-child(3)').textContent = name;
                row.querySelector('td:nth-child(4)').textContent = address;
                row.querySelector('td:nth-child(5)').textContent = status === '1' ? 'Active' : 'Inactive';
                row.querySelector('td:nth-child(6)').textContent = note;
                row.querySelector('td:nth-child(7)').textContent = city;
                row.querySelector('td:nth-child(8)').textContent = mainLanguage;
                event.target.textContent = 'Edit';
                event.target.id = 'editUser';
            } catch (error) {
                alert('Error updating user:', error);
                return;
            }
        }
    });
    document.getElementById('addUser').addEventListener('click', function () {
        window.location.hash = 'newuser';
    });
}

function showUsers() {
    fetch('http://localhost:3000/costumers')
        .then(response => response.json())
        .then(data => {
            let content = document.getElementById('user-table');
            data.forEach(user => {
                content.innerHTML += `<tr>
          <td>${user.id_costumer}</td>
          <td>${user.phone}</td>
          <td>${user.name}</td>
          <td>${user.address}</td>
          <td>${user.status ? "Active" : "Inactive" }</td>
          <td>${user.note}</td>
          <td>${user.city}</td>
          <td>${user.main_language}</td>
          <td><button id="editUser">Edit</button></td>
        </tr>`;
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}