document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed"); // Add this line for debugging

    const addIngredientBtn = document.getElementById('add-ingredient');
    const ingredientNameInput = document.getElementById('new-ingredient-name');
    const ingredientQuantityInput = document.getElementById('new-ingredient-quantity');
    const ingredientCostInput = document.getElementById('new-ingredient-cost');
    const ingredientsTableBody = document.querySelector('#ingredients-table tbody');
    const totalIngredientsCostSpan = document.getElementById('total-ingredients-cost');
    const calculateBtn = document.getElementById('calculate');
    const resultsIngredientsCostSpan = document.getElementById('results-ingredients-cost');
    const resultsOverheadCostSpan = document.getElementById('results-overhead-cost');
    const resultsLaborCostSpan = document.getElementById('results-labor-cost');
    const resultsDeliveryFeeSpan = document.getElementById('results-delivery-fee');
    const resultsTotalCostSpan = document.getElementById('results-total-cost');
    const resultsProfitSpan = document.getElementById('results-profit');
    const sellingPriceSpan = document.getElementById('selling-price');
    const electricityCostInput = document.getElementById('electricity-cost');
    const packagingCostInput = document.getElementById('packaging-cost');
    const laborTypeSelect = document.getElementById('labor-type');
    const fixedLaborDiv = document.getElementById('fixed-labor');
    const hourlyLaborDiv = document.getElementById('hourly-labor');
    const laborCostInput = document.getElementById('labor-cost');
    const hourlyRateInput = document.getElementById('hourly-rate');
    const hoursWorkedInput = document.getElementById('hours-worked');
    const deliveryMethodSelect = document.getElementById('delivery-method');
    const deliveryDistanceInput = document.getElementById('delivery-distance');
    const profitMarginInput = document.getElementById('profit-margin');
    const generateReceiptBtn = document.getElementById('generate-receipt');
    const receiptSection = document.getElementById('receipt-section');
    const receiptContent = document.getElementById('receipt-content');
    const convertToUsdBtn = document.getElementById('convert-to-usd');
    const exchangeRateSpan = document.getElementById('exchange-rate');

    // Add checks to make sure the elements exist
    if (!addIngredientBtn) console.error("addIngredientBtn is null");
    if (!ingredientNameInput) console.error("ingredientNameInput is null");
    if (!ingredientQuantityInput) console.error("ingredientQuantityInput is null");
     if (!ingredientCostInput) console.error(" ingredientCostInput is null");
     if (!ingredientsTableBody) console.error("ingredientsTableBody is null");
     if (!totalIngredientsCostSpan) console.error("totalIngredientsCostSpan is null");
     if (!calculateBtn) console.error("calculateBtn is null");
     if (!resultsIngredientsCostSpan) console.error("resultsIngredientsCostSpan is null");
     if (!resultsOverheadCostSpan) console.error("resultsOverheadCostSpan is null");
     if (!resultsLaborCostSpan) console.error("resultsLaborCostSpan is null");
     if (!resultsDeliveryFeeSpan) console.error("resultsDeliveryFeeSpan is null");
     if (!resultsTotalCostSpan) console.error("resultsTotalCostSpan is null");
     if (!resultsProfitSpan) console.error("resultsProfitSpan is null");
     if (!sellingPriceSpan) console.error("sellingPriceSpan is null");
     if (!electricityCostInput) console.error("electricityCostInput is null");
     if (!packagingCostInput) console.error("packagingCostInput is null");
     if (!laborTypeSelect) console.error("laborTypeSelect is null");
     if (!fixedLaborDiv) console.error("fixedLaborDiv is null");
     if (!hourlyLaborDiv) console.error("hourlyLaborDiv is null");
     if (!laborCostInput) console.error("laborCostInput is null");
     if (!hourlyRateInput) console.error("hourlyRateInput is null");
     if (!hoursWorkedInput) console.error("hoursWorkedInput is null");
     if (!deliveryMethodSelect) console.error("deliveryMethodSelect is null");
     if (!deliveryDistanceInput) console.error("deliveryDistanceInput is null");
     if (!profitMarginInput) console.error("profitMarginInput is null");
     if (!generateReceiptBtn) console.error("generateReceiptBtn is null");
     if (!receiptSection) console.error("receiptSection is null");
     if (!receiptContent) console.error("receiptContent is null");
     if (!convertToUsdBtn) console.error("convertToUsdBtn is null");
     if (!exchangeRateSpan) console.error("exchangeRateSpan is null");

    if (addIngredientBtn) {
        addIngredientBtn.addEventListener('click', function() {
            const name = ingredientNameInput.value.trim();
            const quantity = ingredientQuantityInput.value.trim();
            const cost = parseFloat(ingredientCostInput.value);

            if (name === '' || isNaN(cost)) {
                alert('Please enter a valid item name and cost.');
                return;
            }

            const totalCost = cost * (isNaN(parseFloat(quantity)) ? 1 : parseFloat(quantity));

            const newIngredient = { name: name, quantity: quantity, cost: cost, totalCost: totalCost };
            ingredients.push(newIngredient);
            addIngredientToTable(newIngredient);
            updateTotalIngredientsCost();

            ingredientNameInput.value = '';
            ingredientQuantityInput.value = '';
            ingredientCostInput.value = '';
        });
    }

   // Add the simplified test button code
    const testButton = document.getElementById('test-button');
    if (!testButton) {
        console.error("testButton is null!");
    } else {
        testButton.addEventListener('click', function() {
            alert("Test button clicked!");
        });
    }

    if (laborTypeSelect) {
        laborTypeSelect.addEventListener('change', function() {
            const laborType = this.value;
            fixedLaborDiv.style.display = (laborType === 'fixed') ? 'block' : 'none';
            hourlyLaborDiv.style.display = (laborType === 'hourly') ? 'block' : 'none';
        });
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const electricityCost = parseFloat(electricityCostInput.value) || 0;
            const packagingCost = parseFloat(packagingCostInput.value) || 0;
            const laborType = laborTypeSelect.value;
            let laborCost = 0;

            if (laborType === 'fixed') {
                laborCost = parseFloat(laborCostInput.value) || 0;
            } else {
                const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
                const hoursWorked = parseFloat(hoursWorkedInput.value) || 0;
                laborCost = hourlyRate * hoursWorked;
            }

            const deliveryMethod = deliveryMethodSelect.value;
            const deliveryDistance = parseFloat(deliveryDistanceInput.value) || 0;
            let deliveryFee = 0;

            if (deliveryMethod === 'standard') {
                deliveryFee = deliveryDistance * 15; // ₱15 per km
            } else if (deliveryMethod === 'express') {
                deliveryFee = deliveryDistance * 25; // ₱25 per km
            }

            const profitMargin = parseFloat(profitMarginInput.value) || 0;

            const totalOverheadCost = electricityCost + packagingCost;
            const totalCost = totalIngredientsCost + totalOverheadCost + laborCost + deliveryFee;
            const desiredProfit = totalCost * (profitMargin / 100);
            const sellingPrice = totalCost + desiredProfit;

            resultsIngredientsCostSpan.textContent = totalIngredientsCost.toFixed(2);
            resultsOverheadCostSpan.textContent = totalOverheadCost.toFixed(2);
            resultsLaborCostSpan.textContent = laborCost.toFixed(2);
            resultsDeliveryFeeSpan.textContent = deliveryFee.toFixed(2);
            resultsTotalCostSpan.textContent = totalCost.toFixed(2);
            resultsProfitSpan.textContent = desiredProfit.toFixed(2);
            sellingPriceSpan.textContent = sellingPrice.toFixed(2);

            // Store calculated results
            calculatedResults = {
                totalItemsCost: totalIngredientsCost.toFixed(2),
                totalOverheadCost: totalOverheadCost.toFixed(2),
                laborCost: laborCost.toFixed(2),
                deliveryFee: deliveryFee.toFixed(2),
                totalCost: totalCost.toFixed(2),
                sellingPrice: sellingPrice.toFixed(2)
            };
        });
    }

    let totalIngredientsCost = 0;
    let ingredients = [];
    let calculatedResults = {}; // Store calculated results
    let exchangeRate = 58.75; // Default exchange rate (as of Nov 12, 2024)
    let currentCurrency = 'PHP'; // Track the current currency

    // Function to update total ingredients cost
    function updateTotalIngredientsCost() {
        totalIngredientsCost = ingredients.reduce((sum, ingredient) => sum + ingredient.totalCost, 0);
        totalIngredientsCostSpan.textContent = totalIngredientsCost.toFixed(2);
    }

    // Function to add ingredient to the table
    function addIngredientToTable(ingredient) {
        const row = ingredientsTableBody.insertRow();
        const nameCell = row.insertCell(0);
        const quantityCell = row.insertCell(1);
        const costCell = row.insertCell(2);
        const totalCostCell = row.insertCell(3);
        const actionCell = row.insertCell(4);

        nameCell.textContent = ingredient.name;
        quantityCell.textContent = ingredient.quantity;
        costCell.textContent = ingredient.cost.toFixed(2);
        totalCostCell.textContent = ingredient.totalCost.toFixed(2);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-ingredient');
        removeButton.addEventListener('click', function() {
            ingredients = ingredients.filter(item => item !== ingredient);
            updateTotalIngredientsCost();
            ingredientsTableBody.removeChild(row);
        });
        actionCell.appendChild(removeButton);
    }

    if (generateReceiptBtn) {
        generateReceiptBtn.addEventListener('click', function() {
            generateReceipt('PHP'); // Generate receipt in PHP by default
        });
    }

    if (convertToUsdBtn) {
        convertToUsdBtn.addEventListener('click', function() {
            if (currentCurrency === 'PHP') {
                generateReceipt('USD');
                currentCurrency = 'USD';
                convertToUsdBtn.textContent = "Convert to PHP"; // Update the button text
            } else {
                generateReceipt('PHP');
                currentCurrency = 'PHP';
                convertToUsdBtn.textContent = "Convert to USD"; // Update the button text
            }
        });
    }

    function generateReceipt(currency) {
        receiptContent.innerHTML = ''; // Clear previous receipt
        let receiptDetails = '';
        let currencySymbol = (currency === 'PHP') ? '₱' : '$';

        if (currency === 'PHP') {
            receiptDetails = `
                <p><strong>Items:</strong></p>
                <ul>
                    ${ingredients.map(item => `<li>${item.name} (${item.quantity}) - ₱${item.totalCost.toFixed(2)}</li>`).join('')}
                </ul>
                <p>Total Items Cost: ₱${calculatedResults.totalItemsCost}</p>
                <p>Overhead Cost: ₱${calculatedResults.totalOverheadCost}</p>
                <p>Labor Cost: ₱${calculatedResults.laborCost}</p>
                <p>Delivery Fee: ₱${calculatedResults.deliveryFee}</p>
                <p><strong>Total: ₱${calculatedResults.totalCost}</strong></p>
            `;
        } else if (currency === 'USD') {
            receiptDetails = `
                <p><strong>Items:</strong></p>
                <ul>
                    ${ingredients.map(item => {
                        const usdCost = (item.totalCost / exchangeRate).toFixed(2);
                        return `<li>${item.name} (${item.quantity}) - $${usdCost}</li>`;
                    }).join('')}
                </ul>
                <p>Total Items Cost: $${(calculatedResults.totalItemsCost / exchangeRate).toFixed(2)}</p>
                <p>Overhead Cost: $${(calculatedResults.totalOverheadCost / exchangeRate).toFixed(2)}</p>
                <p>Labor Cost: $${(calculatedResults.laborCost / exchangeRate).toFixed(2)}</p>
                <p>Delivery Fee: $${(calculatedResults.deliveryFee / exchangeRate).toFixed(2)}</p>
                <p><strong>Total: $${(calculatedResults.totalCost / exchangeRate).toFixed(2)}</strong></p>
            `;
        }

        receiptContent.innerHTML = receiptDetails;
        receiptSection.style.display = 'block'; // Show receipt section
        exchangeRateSpan.textContent = exchangeRate.toFixed(2); // Show exchange rate
    }

    // Function to fetch exchange rate (replace with your API call)
    function getExchangeRate() {
        // Placeholder for API call
        // Example using a dummy API endpoint:
        // fetch('https://api.exchangerate-api.com/v4/latest/PHP')
        //   .then(response => response.json())
        //   .then(data => {
        //     exchangeRate = data.rates.USD;
        //     exchangeRateSpan.textContent = exchangeRate.toFixed(2);
        //   })
        //   .catch(error => console.error("Error fetching exchange rate:", error));
        console.log("Fetching exchange rate (replace with your API call)");
    }

    getExchangeRate(); // Call this function when the page loads
});
