console.log('Le script JavaScript est chargé.');


document.addEventListener('DOMContentLoaded', () => 
{
    fetchStatus();
});

// Fonction pour récupérer les commentaires du stockage local
function getCommentsFromLocalStorage() 
{
    const storedComments = localStorage.getItem('carComments');
    return storedComments ? JSON.parse(storedComments) : {};
}

// Fonction pour sauvegarder les commentaires dans le stockage local
function saveCommentsToLocalStorage(comments) 
{
    localStorage.setItem('carComments', JSON.stringify(comments));
}

// Charger les commentaires depuis le stockage local au chargement de la page
let carComments = getCommentsFromLocalStorage();

async function fetchStatus() 
{
    try {
        const loadingElement = document.getElementById('loading');
        if (!loadingElement) 
        {
            throw new Error('Loading element not found');
        }
        loadingElement.style.display = 'block'; // Afficher l'élément de chargement
        const response = await fetch('/status');
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const cars5_5HP = {};
        const cars5_5HP_jr = {};
        const cars6_5HP = {};
        const cars9HP = {};
        const cars9HP_adapt = {};
        const cars13HP = {};

        for (const car_id in data) 
            {
            if (car_id == 0)
            {
                cars5_5HP[car_id] = data[car_id];
            }
            else if (car_id == 87 || car_id == 98 || car_id == 99)
            {
                cars5_5HP_jr[car_id] = data[car_id];
            }
            else if (car_id >= 21 && car_id <= 41) 
            {
                cars6_5HP[car_id] = data[car_id];
            } 
            else if ((car_id >= 1 && car_id <= 19) || (car_id >= 42 && car_id <= 67) || car_id == 92 || car_id == 96) 
            {
                cars9HP[car_id] = data[car_id];
            }
            else if (car_id == 21 || car_id == 94)
            {
                cars9HP_adapt[car_id] = data[car_id];
            }
            else if (car_id >= 68 && car_id <= 85)
            {
                cars13HP[car_id] = data[car_id];
            }
        }

        console.log('Voitures de classe 6.5 HP :', cars6_5HP);
        console.log('Voitures de classe 9 HP :', cars9HP);

        const statusDiv = document.getElementById('car-status');
        if (!statusDiv) 
        {
            throw new Error('Car status element not found');
        }
        statusDiv.innerHTML = '';

        statusDiv.innerHTML += '<h2>5.5 HP</h2>';
        for (const car_id in cars5_5HP) 
        {
            const statusClass = cars5_5HP[car_id] === 'active' ? 'active' : 'inactive';
            const inputStyle = cars5_5HP[car_id] === 'active' ? 'color: white;' : '';
            const commentText = carComments[car_id] || ''; // Récupérer le commentaire stocké
            statusDiv.innerHTML += `
                <p class="${statusClass}">
                    Car ID: ${car_id}, Status: ${cars5_5HP[car_id]}
                    <button onclick="updateStatus(${car_id}, 'active')">Set Active</button>
                    <button onclick="updateStatus(${car_id}, 'inactive')">Set Inactive</button>
                    <input type="text" id="comment-${car_id}" style="${inputStyle}" value="${commentText}" placeholder="Enter comment" ${cars5_5HP[car_id] === 'active' ? 'readonly' : ''} oninput="saveComment(${car_id}, this.value)">
                </p>
            `;
        }

        statusDiv.innerHTML += '<h2>5.5 HP junior</h2>';
        for (const car_id in cars5_5HP_jr) 
        {
            const statusClass = cars5_5HP_jr[car_id] === 'active' ? 'active' : 'inactive';
            const inputStyle = cars5_5HP_jr[car_id] === 'active' ? 'color: white;' : '';
            const commentText = carComments[car_id] || ''; // Récupérer le commentaire stocké
            statusDiv.innerHTML += `
                <p class="${statusClass}">
                    Car ID: ${car_id}, Status: ${cars5_5HP_jr[car_id]}
                    <button onclick="updateStatus(${car_id}, 'active')">Set Active</button>
                    <button onclick="updateStatus(${car_id}, 'inactive')">Set Inactive</button>
                    <input type="text" id="comment-${car_id}" style="${inputStyle}" value="${commentText}" placeholder="Enter comment" ${cars5_5HP_jr[car_id] === 'active' ? 'readonly' : ''} oninput="saveComment(${car_id}, this.value)">
                </p>
            `;
        }

        statusDiv.innerHTML += '<h2>6.5 HP</h2>';
        for (const car_id in cars6_5HP) 
        {
            const statusClass = cars6_5HP[car_id] === 'active' ? 'active' : 'inactive';
            const inputStyle = cars6_5HP[car_id] === 'active' ? 'color: white;' : '';
            const commentText = carComments[car_id] || ''; // Récupérer le commentaire stocké
            statusDiv.innerHTML += `
                <p class="${statusClass}">
                    Car ID: ${car_id}, Status: ${cars6_5HP[car_id]}
                    <button onclick="updateStatus(${car_id}, 'active')">Set Active</button>
                    <button onclick="updateStatus(${car_id}, 'inactive')">Set Inactive</button>
                    <input type="text" id="comment-${car_id}" style="${inputStyle}" value="${commentText}" placeholder="Enter comment" ${cars6_5HP[car_id] === 'active' ? 'readonly' : ''} oninput="saveComment(${car_id}, this.value)">
                </p>
            `;
        }

        statusDiv.innerHTML += '<h2>9 HP</h2>';
        for (const car_id in cars9HP) 
        {
            const statusClass = cars9HP[car_id] === 'active' ? 'active' : 'inactive';
            const inputStyle = cars9HP[car_id] === 'active' ? 'color: white;' : '';
            const commentText = carComments[car_id] || ''; // Récupérer le commentaire stocké
            statusDiv.innerHTML += `
                <p class="${statusClass}">
                    Car ID: ${car_id}, Status: ${cars9HP[car_id]}
                    <button onclick="updateStatus(${car_id}, 'active')">Set Active</button>
                    <button onclick="updateStatus(${car_id}, 'inactive')">Set Inactive</button>
                    <input type="text" id="comment-${car_id}" style="${inputStyle}" value="${commentText}" placeholder="Enter comment" ${cars9HP[car_id] === 'active' ? 'readonly' : ''} oninput="saveComment(${car_id}, this.value)">
                </p>
            `;
        }

        statusDiv.innerHTML += '<h2>9 HP adpate</h2>';
        for (const car_id in cars9HP_adapt) 
        {
            const statusClass = cars9HP_adapt[car_id] === 'active' ? 'active' : 'inactive';
            const inputStyle = cars9HP_adapt[car_id] === 'active' ? 'color: white;' : '';
            const commentText = carComments[car_id] || ''; // Récupérer le commentaire stocké
            statusDiv.innerHTML += `
                <p class="${statusClass}">
                    Car ID: ${car_id}, Status: ${cars9HP_adapt[car_id]}
                    <button onclick="updateStatus(${car_id}, 'active')">Set Active</button>
                    <button onclick="updateStatus(${car_id}, 'inactive')">Set Inactive</button>
                    <input type="text" id="comment-${car_id}" style="${inputStyle}" value="${commentText}" placeholder="Enter comment" ${cars9HP_adapt[car_id] === 'active' ? 'readonly' : ''} oninput="saveComment(${car_id}, this.value)">
                </p>
            `;
        }

        statusDiv.innerHTML += '<h2>13 HP sodi</h2>';
        for (const car_id in cars13HP) 
            {
                const statusClass = cars13HP[car_id] === 'active' ? 'active' : 'inactive';
                const inputStyle = cars13HP[car_id] === 'active' ? 'color: white;' : '';
                const commentText = carComments[car_id] || ''; // Récupérer le commentaire stocké
                statusDiv.innerHTML += `
                    <p class="${statusClass}">
                        Car ID: ${car_id}, Status: ${cars13HP[car_id]}
                        <button onclick="updateStatus(${car_id}, 'active')">Set Active</button>
                        <button onclick="updateStatus(${car_id}, 'inactive')">Set Inactive</button>
                        <input type="text" id="comment-${car_id}" style="${inputStyle}" value="${commentText}" placeholder="Enter comment" ${cars13HP[car_id] === 'active' ? 'readonly' : ''} oninput="saveComment(${car_id}, this.value)">
                    </p>
                `;
            }

    } 
    catch (error) 
    {
        alert('Failed to fetch status: ' + error.message);
    } 
    finally 
    {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) 
        {
            loadingElement.style.display = 'none'; // Masquer l'élément de chargement
        }
    }
}

function displayCarStatus(sorted_cars) {
    const carStatusDiv = document.getElementById('car-status');

    for (const [carClass, cars] of Object.entries(sorted_cars)) {
        if (!carClass.endsWith('_active_count')) {
            const classHeader = document.createElement('h2');
            classHeader.textContent = carClass;
            carStatusDiv.appendChild(classHeader);

            const carList = document.createElement('ul');
            let activeCount = 0; // Initialize active count for this class
            cars.forEach(car => {
                const carItem = document.createElement('li');
                carItem.innerHTML = `
                    ID: ${car.id}, Status: <span class="${car.status}">${car.status}</span>
                    <button onclick="updateStatus(${car.id}, 'active')">Active</button>
                    <button onclick="updateStatus(${car.id}, 'inactive')">Inactive</button>
                    <input type="text" placeholder="Add comment" value="${car.comment}" onchange="updateComment(${car.id}, this.value)">
                `;
                carList.appendChild(carItem);
                if (car.status === 'active') {
                    activeCount++; // Increment active count if car is active
                }
            });
            carStatusDiv.appendChild(carList);

            const activeCountElement = document.createElement('p');
            activeCountElement.textContent = `Active cars in ${carClass}: ${activeCount}`;
            carStatusDiv.appendChild(activeCountElement);
        }
    }
}
async function updateStatus(car_id, status) 
{
    try 
    {
        document.getElementById('loading').style.display = 'block';
        const response = await fetch('/update_status', 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ car_id: car_id, status: status })
        });
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }
        
        if (status === 'active') 
        {
            // Si la voiture est activée, sauvegarder le commentaire avant de vider le champ
            const commentInput = document.getElementById(`comment-${car_id}`);
            carComments[car_id] = commentInput.value;
            saveCommentsToLocalStorage(carComments); // Sauvegarder les commentaires dans le stockage local
        }

        fetchStatus();
    } 
    catch (error) 
    {
        alert('Failed to update status: ' + error.message);
    } 
    finally 
    {
        document.getElementById('loading').style.display = 'none';
    }
}

// Fonction pour sauvegarder le commentaire au fur et à mesure de la saisie
function saveComment(car_id, comment) 
{
    carComments[car_id] = comment;
    saveCommentsToLocalStorage(carComments); // Sauvegarder les commentaires dans le stockage local
}

// Charger les commentaires depuis le stockage local au chargement de la page
fetchStatus(); // Appel initial pour charger les données
