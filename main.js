function addTransaction() {
    const type = document.getElementById('operationType').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const date = new Date();

    if (!validateInput(amount, description)) return;

    const transaction = { type, amount, description, date };
    db.addTransaction(transaction);
    updateReport();
    clearInputs();
}

function calculateAll() {
    const foiz = parseFloat(document.getElementById('foiz').value);
    const foizAmount = parseFloat(document.getElementById('foizAmount').value);
    const dekretMonths = parseInt(document.getElementById('dekretMonths').value);

    const foizResult = calculateFoiz(foizAmount, foiz);
    const dekretResult = calculateDekret(foizAmount, dekretMonths);

    document.getElementById('foizResult').textContent = foizResult.toFixed(2);
    document.getElementById('dekretResult').textContent = dekretResult.toFixed(2);
}

function updateReport() {
    const reportBody = document.getElementById('reportBody');
    reportBody.innerHTML = '';

    let totalDebet = 0, totalKredit = 0, totalAktiv = 0, totalPassiv = 0, monthlyIncome = 0;
    const now = new Date();
    const currentMonth = now.getMonth();

    db.getTransactions().forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border p-2">${transaction.type}</td>
            <td class="border p-2">${transaction.amount.toFixed(2)}</td>
            <td class="border p-2">${transaction.description}</td>
            <td class="border p-2">${formatDate(transaction.date)}</td>
        `;
        reportBody.appendChild(row);

        if (transaction.type === 'debet') totalDebet += transaction.amount;
        if (transaction.type === 'kredit') totalKredit += transaction.amount;
        if (transaction.type === 'aktiv') totalAktiv += transaction.amount;
        if (transaction.type === 'passiv') totalPassiv += transaction.amount;
        if (transaction.type === 'debet' && new Date(transaction.date).getMonth() === currentMonth) {
            monthlyIncome += transaction.amount;
        }
    });

    const balance = totalAktiv - totalPassiv;

    document.getElementById('totalDebet').textContent = totalDebet.toFixed(2);
    document.getElementById('totalKredit').textContent = totalKredit.toFixed(2);
    document.getElementById('totalAktiv').textContent = totalAktiv.toFixed(2);
    document.getElementById('totalPassiv').textContent = totalPassiv.toFixed(2);
    document.getElementById('monthlyIncome').textContent = monthlyIncome.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function clearInputs() {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('foiz').value = '';
    document.getElementById('foizAmount').value = '';
    document.getElementById('dekretMonths').value = '';
}

// Sahifa yuklanganda hisobotni yangilash
document.addEventListener('DOMContentLoaded', updateReport);