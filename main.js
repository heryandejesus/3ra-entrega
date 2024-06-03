document.addEventListener("DOMContentLoaded", () => {
    const stockContainer = document.getElementById('stock-container');
    const restockBtn = document.getElementById('restock-btn');

    const initialStock = [
        { marca: "Nike", modelo: "Air Max", stock: 10 },
        { marca: "Adidas", modelo: "Ultra Boost", stock: 8 },
        { marca: "Puma", modelo: "Suede Classic", stock: 5 },
        { marca: "Reebok", modelo: "Classic Leather", stock: 7 },
        { marca: "Converse", modelo: "Chuck Taylor", stock: 12 }
    ];

    function loadStock() {
        const stock = JSON.parse(localStorage.getItem('shoeStock')) || initialStock;
        return stock;
    }

    function saveStock(stock) {
        localStorage.setItem('shoeStock', JSON.stringify(stock));
    }

    function displayStock() {
        const stock = loadStock();
        stockContainer.innerHTML = '';
        stock.forEach((item, index) => {
            const shoeCard = document.createElement('div');
            shoeCard.classList.add('shoe-card');
            shoeCard.innerHTML = `
                <h2>${item.marca}</h2>
                <p>Modelo: ${item.modelo}</p>
                <p>Stock: ${item.stock}</p>
                <button onclick="reduceStock(${index})">Vender</button>
            `;
            stockContainer.appendChild(shoeCard);
        });
    }

    window.reduceStock = function(index) {
        const stock = loadStock();
        if (stock[index].stock > 0) {
            stock[index].stock -= 1;
            saveStock(stock);
            displayStock();
        } else {
            alert('No hay más stock de este modelo');
        }
    }

    restockBtn.addEventListener('click', () => {
        saveStock(initialStock);
        displayStock();
    });

    displayStock();
});
