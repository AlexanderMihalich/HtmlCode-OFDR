function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
function textTest(input) {
	return /^[A-Za-zА-Яа-яЁё\s]/.test(input.value);
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
//=================
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
//=================
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
//=================
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let i = 0; i < popup_link.length; i++) {
	const el = popup_link[i];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');

			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let i = 0; i < popups.length; i++) {
	const popup = popups[i];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {

	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	// let curent_popup = document.querySelector('.popup_' + item);
	let curent_popup = document.querySelector('.popup');
	let textForm = document.querySelector('.popup__form').innerHTML = item;

	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let i = 0; i < popups.length; i++) {
				const popup = popups[i];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.which == 27) {
		popup_close();
	}
});
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//=================
function addingClasses() {
	let namesRoditel = document.querySelectorAll('.pagging__list');
	for (let i = 0; i < namesRoditel.length; i++) {
		let nameKajdogo = namesRoditel[i];
		let nameKnopki = nameKajdogo.querySelectorAll(".pagging__item");
		for (let i = 0; i < nameKnopki.length; i++) {
			let nameKlika = nameKnopki[i];
			nameKlika.addEventListener("click", function (e) {
				for (let i = 0; i < nameKnopki.length; i++) {
					let nameKlika = nameKnopki[i];
					nameKlika.classList.remove('_active');
				}
				nameKlika.classList.add('_active');
				e.preventDefault();

			});
		}
	}
} addingClasses();
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
document.addEventListener('DOMContentLoaded', function () {	
	let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
	// const form = document.querySelector('form');
	// form.addEventListener('submit', formSend);
	let forms = document.querySelectorAll('form');
	if (forms.length > 0) {
		for (let i = 0; i < forms.length; i++) {
			const el = forms[i];
			el.addEventListener('submit', formSend);
		}
	}
	async function formSend(e) {
		// e.preventDefault();
		let btn = e.target;
		let form = btn.closest('form');
		let message = form.getAttribute('data-message');
		let error = formValidate(form);

		let formData = new FormData(form);
		// formData.append('image', formImage.files[0]);

		if (error == 0) {
			//SendForm
			formClean(form);
			if (message) {
				popup_open(message, '');
				e.preventDefault();
			}
			//отправка через АЯКС на почту
			// form.classList.add('_sending');
			// let responce = await fetch('sendmail.php', {
			// 	method: 'POST',
			// 	body: formData
			// })
			// if (responce.ok) {
			// 	let result = await Response.json();
			// 	alert(result.message);
			// 	formPreview.innerHTML = '';
			// 	form.reset();
			// 	form.classList.remove('_sending');
			// } else {
			// 	alert('Подключите почту для отправки форм');
			// 	form.classList.remove('_sending');
			// }
			e.preventDefault();
		} else {
			let formError = form.querySelectorAll('._error');
			if (formError && form.classList.contains('_goto-error')) {
				_goto(formError[0], 1000, 50);
			}
			e.preventDefault();
			// alert('Заполните обязательные поля')
		}
	}
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		if (formReq.length > 0) {
			for (let i = 0; i < formReq.length; i++) {
				const el = formReq[i];
				error += formValidateInput(el);
			}
		}
		
		return error;
	}
	function formValidateInput(input) {
		let error = 0;
		let input_g_value = input.getAttribute('data-value');
		console.log(input.getAttribute("type"));
		
		if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
			if (input.value != input_g_value) {
				let em = input.value.replace(" ", "");
				
				input.value = em;
			}
			if (emailTest(input) || input.value == input_g_value) {
				formAddError(input);
				error++;
			} else {
				formRemoveError(input);
			}
		} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {//не работает
			formAddError(input);
			error++;
		} else {
			if (input.value == '' || input.value == input_g_value) {
				formAddError(input);
				error++;
			} else {
				formRemoveError(input);
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');

		let inputError = input.parentElement.querySelector('.form__error');
		if (inputError) {
			input.parentElement.removeChild(inputError);
		}
		let inputErrorText = input.getAttribute('data-error');
		if (inputErrorText && inputErrorText != '') {
			input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + inputErrorText + '</div>');
		}
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
		
		let inputError = input.parentElement.querySelector('.form__error');
		if (inputError) {
			input.parentElement.removeChild(inputError);
		}
	}
	function formClean(form) {
		let inputs = form.querySelectorAll('input,textarea');
		
		for (let index = 0; index < inputs.length; index++) {
			const el = inputs[index];
			el.parentElement.classList.remove('_focus');
			el.classList.remove('_focus');
			el.value = el.getAttribute('data-value');
		}
		let checkboxes = form.querySelectorAll('.checkbox__input');
		if (checkboxes.length > 0) {
			for (let index = 0; index < checkboxes.length; index++) {
				const checkbox = checkboxes[index];
				checkbox.checked = false;
			}
		}
		let selects = form.querySelectorAll('select');
		if (selects.length > 0) {
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_default_value = select.getAttribute('data-default');
				select.value = select_default_value;
				select_item(select);
			}
		}
	}

	let viewPass = document.querySelectorAll('.form__viewpass');
	for (let index = 0; index < viewPass.length; index++) {
		const element = viewPass[index];
		element.addEventListener("click", function (e) {
			if (element.classList.contains('_active')) {
				element.parentElement.querySelector('input').setAttribute("type", "password");
			} else {
				element.parentElement.querySelector('input').setAttribute("type", "text");
			}
			element.classList.toggle('_active');
		});
	}
	
	// const formImage = document.getElementById('formImage')
	// const formPreview = document.getElementById('formPreview')
	// formImage.addEventListener('change', () => {
	// 	uploadFile(formImage.files[0]);
	// })
	// function uploadFile(file) {
	// 	//проверка типа файла
	// 	if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
	// 		alert('Разрешены только изображения')
	// 		formImage.value = '';
	// 		return;
	// 	}
	// 	//проверка размера фалйа (<2МБ)
	// 	if (file.size > 2 * 1024 * 1024) {
	// 		alert('Файл должен быть менее 2 МБ.')
	// 		return;
	// 	}
	// 	var reader = new FileReader();
	// 	reader.onload = function (e) {
	// 		formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
	// 	};
	// 	reader.onerror = function (e) {
	// 		alert('Ошибка')
	// 	};
	// 	reader.readAsDataURL(file);
	// }



	//Placeholers
	let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
	inputs_init(inputs);

	function inputs_init(inputs) {
		if (inputs.length > 0) {
			for (let i = 0; i < inputs.length; i++) {
				const input = inputs[i];
				const input_g_value = input.getAttribute('data-value');
				input_placeholder_add(input);
				if (input.value != '' && input.value != input_g_value) {
					input_focus_add(input);
				}
				input.addEventListener('focus', function (e) {
					if (input.value == input_g_value) {
						input_focus_add(input);
						input.value = '';
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'password');
					}
					if (input.classList.contains('_date')) {
						/*
						input.classList.add('_mask');
						Inputmask("99.99.9999", {
							//"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
						*/
					}
					if (input.classList.contains('_phone')) {
						// '+7(999) 999 9999'
						//'+38(999) 999 9999'
						//'+375(99)999-99-99'
						input.classList.add('_mask');
						Inputmask("+7(999) 999 9999", {
							"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
					}
					if (input.classList.contains('_digital')) {
						input.classList.add('_mask');
						Inputmask("9{1,}", {
							"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
						
					}
					formRemoveError(input);
				});
				input.addEventListener('blur', function (e) {
					if (input.value == '') {
						input.value = input_g_value;
						input_focus_remove(input);
						if (input.classList.contains('_mask')) {
							input_clear_mask(input, input_g_value);
						}
						if (input.getAttribute('data-type') === "pass") {
							input.setAttribute('type', 'text');
						}
					}
				});
				if (input.classList.contains('_date')) {
					datepicker(input, {
						customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
						customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
						formatter: (input, date, instance) => {
							const value = date.toLocaleDateString()
							input.value = value
						},
						onSelect: function (input, instance, date) {
							input_focus_add(input.el);
						}
					});
				}
			}
		}
	}
	//СКРЫТЬ
	function input_placeholder_add(input) {
		const input_g_value = input.getAttribute('data-value');
		if (input.value == '' && input_g_value != '') {
			input.value = input_g_value;
		}
	}
	function input_focus_add(input) {
		input.classList.add('_focus');
		input.parentElement.classList.add('_focus');
	}
	function input_focus_remove(input) {
		input.classList.remove('_focus');
		input.parentElement.classList.remove('_focus');
	}
	function input_clear_mask(input, input_g_value) {
		input.inputmask.remove();
		input.value = input_g_value;
		input_focus_remove(input);
	}
});



//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}


let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
//=================
$(document).ready(function () {
	$('.parallax__list>li').addClass('layer');
	$('.parallax__list').parallax();
	$('.main-screen__image').parallax();
	$('.column-icon_header').parallax();

});
//=================
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let slider_education = new Swiper('.card ', {
	loop: true,
	// watchOverflow: true,
	spaceBetween: 30,
	slidesPerView: 4,
	speed: 800,
	// Dotts
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
		1200: {
			slidesPerView: 2,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
});
let slider_entry = new Swiper('.entry__images', {
	// effect: 'fade',
	// autoplay: {
	// 	delay: 3000,
	// 	disableOnInteraction: false,
	// },
	loop: true,
	slidesPerView: 4,
	spaceBetween: 24,
	speed: 800,
	// Arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1200: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
});



