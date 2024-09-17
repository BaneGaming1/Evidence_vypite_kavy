document.addEventListener('DOMContentLoaded', () => {
    window.updateTextInput = function(rangeInput, labelId) {
        const labelElement = document.getElementById(labelId);
        if (labelElement) {
            labelElement.innerText = rangeInput.value;
        } else {
            console.error(`Element s ID ${labelId} nebyl nalezen.`);
        }
    };

    function saveData(formData) {
        let drinksData = JSON.parse(localStorage.getItem('drinksData')) || {};

        const user = formData.user;
        if (!drinksData[user]) {
            drinksData[user] = {
                milk: 0,
                espresso: 0,
                coffee: 0,
                long: 0,
                doppio: 0
            };
        }

        drinksData[user].milk += parseInt(formData.milk, 10);
        drinksData[user].espresso += parseInt(formData.espresso, 10);
        drinksData[user].coffee += parseInt(formData.coffee, 10);
        drinksData[user].long += parseInt(formData.long, 10);
        drinksData[user].doppio += parseInt(formData.doppio, 10);

        localStorage.setItem('drinksData', JSON.stringify(drinksData));
    }

    document.getElementById('coffeeForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = {
            user: document.querySelector('input[name="user"]:checked')?.value,
            milk: document.querySelector('input[name="milk"]').value,
            espresso: document.querySelector('input[name="espresso"]').value,
            coffee: document.querySelector('input[name="coffee"]').value,
            long: document.querySelector('input[name="long"]').value,
            doppio: document.querySelector('input[name="doppio"]').value
        };

        if (!formData.user) {
            alert("Vyberte osobu!");
            return;
        }

        saveData(formData);
        alert('Data byla úspěšně uložena!');
    });

    document.getElementById('showResults').addEventListener('click', () => {
        const drinksData = JSON.parse(localStorage.getItem('drinksData')) || {};
        const resultsDiv = document.getElementById('results');
        
        if (Object.keys(drinksData).length === 0) {
            resultsDiv.innerHTML = "<p>Žádná data nebyla uložena.</p>";
            return;
        }

        let html = "<h3>Seznam vypité kávy:</h3>";
        for (const user in drinksData) {
            const data = drinksData[user];
            html += `
                <p><strong>${user}:</strong></p>
                <ul>
                    <li>Mléko: ${data.milk}</li>
                    <li>Espresso: ${data.espresso}</li>
                    <li>Káva: ${data.coffee}</li>
                    <li>Long: ${data.long}</li>
                    <li>Doppio: ${data.doppio}</li>
                </ul>
            `;
        }
        resultsDiv.innerHTML = html;
    });

    document.getElementById('showSummary').addEventListener('click', () => {
        const month = parseInt(document.getElementById('month').value, 10);
        if (isNaN(month) || month < 1 || month > 12) {
            alert("Zadejte platný měsíc (1-12).");
            return;
        }
        
        const summaryDiv = document.getElementById('summary');
        summaryDiv.innerHTML = `<p>...</p>`;
    });
});
