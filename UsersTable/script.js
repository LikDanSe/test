
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('search');

    // Функция для отображения данных в таблице
    function displayUsers(users) {
        tableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.gender === 'male' ? 'М' : 'Ж'}</td>
                <td>${user.phone}</td>
                <td>${user.address.city}, ${user.address.address} </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Fetch данные пользователей с сервера
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            displayUsers(data.users);

            // Добавить обработчик события на поиск после загрузки данных
            searchInput.addEventListener('keyup', () => searchTable(data.users));
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));

    // Функция для поиска по таблице
    function searchTable(users) {
        const searchValue = searchInput.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            (`${user.firstName} ${user.lastName}`).toLowerCase().includes(searchValue) ||
            user.age.toString().includes(searchValue) ||
            user.gender.toLowerCase().includes(searchValue) ||
            user.phone.toLowerCase().includes(searchValue) ||
            `${user.address.city}, ${user.address.street}`.toLowerCase().includes(searchValue)
        );
        displayUsers(filteredUsers);
    }
});
