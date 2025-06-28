function calculateFoiz(amount, foiz) {
    if (!foiz || !amount) return 0;
    return (amount * foiz) / 100;
}

function calculateDekret(amount, months) {
    if (!amount || !months) return 0;
    // Oddiy dekret hisoblash (masalan, oylik 30% to'lov)
    const monthlyPayment = amount * 0.3;
    return monthlyPayment * months;
}