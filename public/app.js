const toCurrency = price => {
	return new Intl.NumberFormat('ru-RU', {
		currency: 'rub',
		style: 'currency'
	}).format(price);
}
const toDate = date => {
	return new Intl.DateTimeFormat('ru-Ru', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(new Date(date));
}

document.querySelectorAll('.price').forEach(price => {
	price.textContent = toCurrency(price.textContent);
});

document.querySelectorAll('.date').forEach(date => {
	date.textContent = toDate(date.textContent);
});

const $card = document.querySelector("#card");
if ($card) {
	$card.addEventListener('click', event => {
		if (event.target.classList.contains('js-remove')) {
			const id = event.target.dataset.id;
			const csrf = event.target.dataset.csrf;

			fetch('/card/remove/' + id, {
				method: 'delete',
				headers: {
					'X-XSRF-TOKEN': csrf
				}
			})
			.then(res => res.json())
			.then(card => {
				if (card.courses.length) {
					const html = card.courses.map(c => {

					return `
					<tr>
						<td>${c.title}</td>
						<td>${c.count}</td>
						<td>
							<button class="btn btm-small js-remove" data-id="${c.id}">Delete</button>
						</td>
					</tr>
					`
					}).join('');
					$card.querySelector('tbody').innerHTML = html;
					$card.querySelector('.price').textContent = toCurrency(card.price);
				} else {
					$card.innerHTML = "<p>Card is empty</p>"
				}
			});
		}
	});
}

var instance = M.Tabs.init(document.querySelector('.tabs'));