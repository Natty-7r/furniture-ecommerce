// ------------------- HUMBER THNGS-----------------

const humburger = document.querySelector('.humburger');
const closeToggle = document.querySelector('.close_toggle');
const toggleList = document.querySelector('.toggle_list');
const adminMain = document.querySelector('.admin_main');
if (humburger)
	humburger.addEventListener('click', function () {
		toggleList.classList.remove('toggle_off');
		toggleList.classList.add('toggle_on');

		adminMain.classList.remove('visible_main');
		adminMain.classList.add('invisible_main');
	});
const removeToggleList = function () {
	adminMain.classList.remove('invisible_main');
	adminMain.classList.add('visible_main');

	toggleList.classList.add('toggle_off');
	toggleList.classList.remove('toggle_on');
};
toggleList.addEventListener('click', function () {
	adminMain.classList.remove('invisible_main');
	adminMain.classList.add('visible_main');

	toggleList.classList.add('toggle_off');
	toggleList.classList.remove('toggle_on');
});

const navbar = document.querySelector('.navbar');
// ------------------- HUMBER THNGS ENDS -----------------

////////  adding images
const acceptBtn = document.querySelector('.accept_btn');
const imageForm = document.querySelector('.image_form');
const imageNotice = document.querySelector('.image_notice');

if (acceptBtn)
	acceptBtn.addEventListener('click', (e) => {
		e.preventDefault();
		imageNotice.style.display = 'none';
		imageForm.style.display = 'flex';
	});

const multibtn = document.querySelector('.multiple');
if (multibtn)
	multibtn.addEventListener('click', () => {
		if (!multibtn.classList.contains('multiple_on')) {
			multibtn.classList.add('multiple_on');
			document.querySelector('.multiple_input').value = 'multiple';
			return;
		}
		if (multibtn.classList.contains('multiple_on')) {
			multibtn.classList.remove('multiple_on');
			document.querySelector('.multiple_input').value = '';
		}
	});


