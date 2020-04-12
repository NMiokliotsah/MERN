document.querySelectorAll('.price').forEach(price => {
    price.textContent = new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price.textContent);
});