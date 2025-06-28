function formatDate(date) {
    return new Date(date).toLocaleString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function validateInput(amount, description) {
    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Iltimos, to'g'ri summa kiriting!");
        return false;
    }
    if (!description.trim()) {
        alert("Iltimos, tavsif kiriting!");
        return false;
    }
    return true;
}