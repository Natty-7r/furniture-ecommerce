// ------------------- HUMBER THNGS-----------------

const humburger = document.querySelector('.humburger');
const closeToggle = document.querySelector('.close_toggle');
const toggleList = document.querySelector('.toggle_list');
let langAmharic = false;
let aboutOne = true;
let aboutStart = true;
let aboutLangChange = false;
humburger.addEventListener('click', function () {
	toggleList.classList.remove('toggle_off');
	toggleList.classList.add('toggle_on');
});
const removeToggleList = function () {
	toggleList.classList.add('toggle_off');
	toggleList.classList.remove('toggle_on');
};
toggleList.addEventListener('click', function () {
	toggleList.classList.add('toggle_off');
	toggleList.classList.remove('toggle_on');
});
const toggleContent = function (lang) {
	const content = lang.textContent;
	if (content.includes('amharic')) lang.textContent = 'english';
	if (content.includes('english')) lang.textContent = 'amharic';
};

const navbar = document.querySelector('.navbar');
// ------------------- HUMBER THNGS ENDS -----------------

// ------------------- HERO SUB WRITING   THNGS STARTS -----------------

// ------------------- LANGUAGE  THNGS STARTS -----------------
const heroBtn = document.querySelector('.hero_btn');
const heroText = document.querySelector('.hero_text');
const languageSetter = function () {
	const toggleMainContent = function (content) {
		if (content.includes('amharic')) {
			heroText.innerHTML = `	
					<div>
						<div class="hero_main">
						<h1 class="company_name">ናኔ</h1>
						ፍረኒቸርስ<br />
						
					   </div>
					<h4 class="hero_sub">
						ውብ እና ዘመናዊ የእንጨት እና የብረት ዉጤቶች በአስተማማኝ ዋጋ ለማቅረብ እንተጋለን
					</h4>
					<div class="home_btn">
						<button class="btn hero_btn">Discover more</button>
					    <button class=" hero_btn order_now">Order Now</button>
					</div>
					
				</div>
					
				`;
			heroText.classList.add('amharic');
		}
		if (content.includes('english')) {
			heroText.innerHTML = `
			<div>
						<div class="hero_main">
						<h1 class="company_name">Nane</h1>
						furnitures <br />
						
					   </div>
					<h4 class="hero_sub">
					we dedicate to proived beautiful and modern furnitures and<br />
					metal work cheaper
					</h4>
					<div class="home_btn">
						<button class="btn hero_btn">Discover more</button>
					    <button class=" hero_btn order_now">Order Now</button>
					</div>
					
				</div>`;

			heroText.classList.remove('amharic');
		}
	};
	const toggleProducts = function (lang) {
		const products = document.querySelectorAll('.products');
		const product = document.querySelector('.product');
		// cheching if at least produt exits
		if (product)
			products.forEach((product) => {
				if (lang == 'english') {
					product.querySelector(
						'.amount'
					).innerHTML = `<span class="amount_name">Price</span>
									 
					<span class="amount_value">Negotiatable</span>
					`;

					product.querySelector('.days').innerHTML = ` 
			                <span class="days_name">Delivery Date</span>									<span class="days_value">Negotiable</span>`;
					document.querySelector('.product_text').classList.remove('amharic');
				}
				if (lang == 'amharic') {
					product.querySelector(
						'.amount'
					).innerHTML = `<span class="amount_name">ዋጋ</span>
									 
					<span class="amount_value">በድርድር</span>
					`;

					product.querySelector('.days').innerHTML = ` 
			                <span class="days_name">የሚወጣብት ቀን</span>									<span class="days_value">በድርድር</span>`;
					document.querySelector('.product_text').classList.add('amharic');
				}
			});
	};
	const toggleAboutcontent = function (lang) {
		// setting about informaiton
		if (lang == 'amharic') langAmharic = true;
		if (lang == 'english') langAmharic = false;
		aboutLangChange = true;
		buttonsClicked();
	};
	//
	const lang = document.querySelector('.lang');
	lang.addEventListener('click', () => {
		toggleContent(lang);
		// toggleMainContent(lang.textContent);
		toggleProducts(lang.textContent);
		toggleAboutcontent(lang.textContent);
	});
	// reset(heroSub.innerHTML);
};

languageSetter();
// on navbar link changes
const linkChange = function () {
	let currentLink = document.querySelector('#hero');
	const navbarLinks = document.querySelectorAll('.navbar_link');
	if (navbarLinks)
		navbarLinks.forEach((link) =>
			link.addEventListener('mouseover', function (e) {
				const target = e.target;
				navbarLinks.forEach((link) =>
					link.classList.remove('navbar_link_active')
				);
				target.classList.add('navbar_link_active');
			})
		);
	navbarLinks.forEach((link) =>
		link.addEventListener('mouseleave', function (e) {
			navbarLinks.forEach((link) => {
				link.classList.remove('navbar_link_active');
				currentLink.classList.add('navbar_link_active');
			});
		})
	);

	window.addEventListener('scroll', function () {
		console.log();
		const sections = this.document.querySelectorAll('section');
		let currentSection;
		const navHeight = navbar.offsetHeight + 20;
		const position = this.window.scrollY + navHeight;
		sections.forEach((section) => {
			let hash, linkActive, sectionHome;
			if (section.getAttribute('id') == 'hero') sectionHome = section;

			if (
				section.offsetTop <= position &&
				section.offsetHeight + section.offsetTop >= position
			) {
				hash = section.getAttribute('id');
				navbarLinks.forEach((link) => {
					link.classList.remove('navbar_link_active');
					if (link.getAttribute('href') == `#${hash}`) {
						currentLink = link;
						link.classList.add('navbar_link_active');
					}
				});
			}
		});
	});
};
linkChange();
// navbar shadowing
window.addEventListener('scroll', function () {
	const heroTextTop = heroText.getBoundingClientRect().top;
	const navbarHight = navbar.getBoundingClientRect().height;
	if (heroTextTop <= navbarHight + 20) navbar.classList.add('navbar_shadow');
	if (heroTextTop >= navbarHight + 20) navbar.classList.remove('navbar_shadow');
});
//  rotating about images

const buying = function () {
	// selections
	let buyTimer;
	const buyBtns = document.querySelectorAll('.buyBtn');
	const order = document.querySelector('#order');
	const orderForm = document.querySelector('.order_form');
	const orderErrorMessage = document.querySelector('.order_form_error');
	const orderSuccedMessage = document.querySelector('.order_form_message');

	const orderOwner = orderSuccedMessage.querySelector('.order_owner');
	const orderedProduct = orderSuccedMessage.querySelector('.order_product ');

	//  when buy btn is clicked
	if (buyBtns)
		buyBtns.forEach((buyBtn) =>
			buyBtn.addEventListener('click', function (e) {
				order.classList.remove('centered_section');
				order.classList.remove('order_visible');
				const productId = buyBtn
					.closest('.product')
					.querySelector('.productId')
					.textContent.trim();

				const productType = buyBtn
					.closest('.product')
					.querySelector('.type')
					.textContent.trim();

				const inputId = document.querySelector('.inputId');
				const inputType = document.querySelector('.inputType');

				inputId.value = productId;
				inputType.value = productType;
				clearInterval(buyTimer);
				orderForm.classList.add('order_form_visible');
				orderSuccedMessage.classList.remove('order_form_message_visible');

				order.classList.add('centered_section');
				order.classList.add('order_visible');
				order.scrollIntoView({ behavior: 'smooth' });
			})
		);
	// when oredr form is submitted
	orderForm.addEventListener('submit', function (e) {
		e.preventDefault();
		//
		orderErrorMessage.classList.remove('order_form_error_visible');
		orderSuccedMessage.classList.remove('order_form_message_visible');
		// data selection
		const fullName = e.target.elements.fullname.value.trim();
		const phone = e.target.elements.phone.value.trim();
		const email = e.target.elements.email.value.trim();
		const address = e.target.elements.address.value.trim();
		const productId = e.target.elements.productId.value.trim();
		const type = e.target.elements.type.value.trim();
		const description = e.target.elements.description.value.trim();

		const data = {
			fullName,
			phone,
			email,
			address,
			productId,
			type,
			description,
		};

		fetch('/orders', {
			method: 'POST',
			body: JSON.stringify({
				...data,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((result) => {
				if (!result.ok)
					return Promise.resolve({
						status: 'fail',
						data: {
							message:
								'ይቅርታ ትዕዛዞ በትክክል አልተላክም ድጋሚ ይሞክሩ ! *  Order failed  please try again  !',
						},
					});
				if (result.ok) return result.json();
			})
			.then((orderData) => {
				if (orderData.status == 'fail') {
					const amharicMessage = orderData.data.message.split('*')[0];
					const englishMessage = orderData.data.message.split('*')[1];
					const erroMessage = `${amharicMessage} <br />${englishMessage}`;
					orderErrorMessage.innerHTML = erroMessage;
					orderErrorMessage.classList.add('order_form_error_visible');
					setTimeout(() => {
						orderErrorMessage.classList.remove('order_form_error_visible');
					}, 5000);
				}
				if (orderData.status == 'success') {
					// clering inputs
					e.target.elements.fullname.value =
						e.target.elements.phone.value =
						e.target.elements.email.value =
						e.target.elements.address.value =
						e.target.elements.description.value =
							'';
					orderErrorMessage.classList.remove('order_form_error_visible');

					orderOwner.textContent = orderData.data.order.owner;
					orderedProduct.textContent = orderData.data.order.orderedProduct;

					orderSuccedMessage.classList.add('order_form_message_visible');

					orderForm.classList.remove('order_form_visible');
					// clearing the order stuffs
					buyTimer = setTimeout(() => {
						orderSuccedMessage.classList.remove('order_form_message_visible');
						order.classList.remove('order_visible');
						order.classList.remove('centered_section');
					}, 5000);
				}
			});
	});
};
buying();

// contact commenting
const commenting = function () {
	//selection
	const contactForm = document.querySelector('.contact_form');
	const contactErrorMessage = document.querySelector('.contact_form_error');
	const contactSuccedMessage = document.querySelector('.contact_form_message');

	contactForm.addEventListener('submit', function (e) {
		e.preventDefault();

		contactErrorMessage.classList.remove('contact_form_error_visible');
		contactSuccedMessage.classList.remove('contact_form_message_visible');

		const fullName = e.target.elements.fullName.value.trim();
		const email = e.target.elements.email.value.trim();
		const subject = e.target.elements.subject.value.trim();
		const message = e.target.elements.message.value.trim();
		const contactMessage = { fullName, email, subject, message };

		// clearing inputs
		e.target.elements.fullName.value =
			e.target.elements.email.value =
			e.target.elements.subject.value =
			e.target.elements.message.value =
				'';

		fetch('/contactMessage', {
			method: 'POST',
			body: JSON.stringify({
				...contactMessage,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((result) => {
				if (!result.ok)
					return Promise.resolve({
						status: 'fail',
						data: {
							message:
								'Error Occurred please try again ! * ትንሸ ችገር ተፈጥሯል ድጋሚ  እባኮ ይሞክሩ ! ',
						},
					});
				if (result.ok) return result.json();
			})
			.then((data) => {
				if (data.status == 'fail') {
					const preveData = data.data.preveData;
					const englishMessage = data.data.message.split('*')[0];
					const amharicMessage = data.data.message.split('*')[1];
					const erroMessage = `${amharicMessage} <br />${englishMessage}`;

					contactErrorMessage.innerHTML = erroMessage;
					contactErrorMessage.classList.add('contact_form_error_visible');

					// adding privious data
					e.target.elements.fullName.value = preveData.fullName;
					e.target.elements.email.value = preveData.email;
					e.target.elements.subject.value = preveData.subject;
					e.target.elements.message.value = preveData.message;
					setTimeout(() => {
						contactErrorMessage.classList.remove('contact_form_error_visible');
					}, 5000);
				}
				if (data.status == 'success') {
					contactSuccedMessage.classList.add('contact_form_message_visible');
					contactErrorMessage.classList.remove('contact_form_error_visible');
					setTimeout(() => {
						contactSuccedMessage.classList.remove(
							'contact_form_message_visible'
						);
					}, 5000);
				}
			});
	});
};
commenting();

// global to link touch
const buttonsClicked = function () {
	// read more btn
	{
		const heroBtn = document.querySelector('.hero_btn');
		const heroBtnOrder = document.querySelector('.order_now');
		const catagories = document.querySelector('.catagories');
		const products = document.querySelector('.products');

		heroBtn.addEventListener('click', function () {
			catagories.scrollIntoView({ behavior: 'smooth' });
		});
		heroBtnOrder.addEventListener('click', function () {
			products.scrollIntoView({ behavior: 'smooth' });
		});
	}

	const aboutBtnClick = function () {
		let about_1, about_2;
		if (langAmharic) {
			about_1 = `
					<div class="about_header section_title">about us</div>
					<p class="about_main_text">ስነ ድርጅቱ</p>
					<p class="about_sub_text">
						ናኔ ፈርኒቸርስ በ
						<span class="nane_name">  ይድነቃቸው አስፋው(ናኔ) </span>የተቋቋመ የእንጨት ዉጤቶችን
						የሚያመርት መቀመጫዉን በካፋ ዞን ጊምቦ ከተማ ያደረግ ሃላፊነቱ የተወሰነ የግል ደርጅት ነው።
					</p>
	
					<p class="about_main_text">እኛን ሚመርጡበት ምክንያት</p>
					<p class="about_sub_text">
						በዘርፉ ከ 15 ዓመት በላይ ልምድ ያለን ሲሆን ብቃት ባላቸዉ ባለሙያዎች በማታገዝ ለእናንተ ዘመናዊ፣ ውብ፣
						ማራኪ እና አንተማማኝ የእንጨት ዉጤቶቸን በሰዓቱ ለማቅረብ እንተጋልን።
					</p>
					<button  class="btn about_btn about_btn_more"
						>Read more <span class="arrow">&rightarrow;</span></button 
					>
				`;

			about_2 = `
			<div class="about_header section_title">about us</div>
			<p class="about_main_text">ምናመርታቸው እቃዎች</p></p>
	
			<p class="about_sub_text">
				 የትኛዉንም አይነት የእንጨት ዉጤቶችን እናመርታልን ለምሳሌ ያህን ሶፋዎን ፣ አልጋዎችን ፣ የምብ ጠረጴዛዎችን ፣ በር እና መስኮቶችን ፣ ቁምሳጠኖችን ፣ ብፌዎችን ፣ የንብ ቤቶችን ፣ ኪችን ክቢኔቶችን  ፣ የት/ት ቤት ወንበር እና ጠረጴዛዎችን  ሁሉንም እንደየምርጫቹ ።
			</p> 

			 <p class="about_main_text">ተጨማሪ አግልግሎቶች</p>

			<p class="about_sub_text">
				ከእንጨት ውጤቶች በተጨማሪ የራሳችን የእንጨት መሰንጠቂያ ስላነን ለማንኛውም አይነት የእንጨት ስራ የሚሆኑ ጥሬ
				እንጨቶችን እንሰነጥቃለን በፈልጉት ስፋት ጥሬ ምርቶች እናቀርባልን ።
			</p> 
			<button  class="btn about_btn about_btn_more"
				><span class="arrow"> &LeftArrow; </span> Read less</button 
			>
			`;
		}
		if (!langAmharic) {
			about_1 = `
					<div class="about_header section_title">about us</div>
						
			<p class="about_main_text">
			who we are  
			</p>
			<p class="about_sub_text">
				nane furnitures is  furniture manufacturing private limited company founded by  <span class="nane_name">yidnekachew asfaw(nane) </span> located at kaffa,gimbo.
			</p>
			<p class="about_main_text">
			why you choose us 
			</p>
			<p class="about_sub_text">
				we are group of talented   wooden workers with more than 15 years committing our effort  to provide you  modern, well designed, beautiful and durable furnitures  on time.
			</p> 
					<button  class="btn about_btn about_btn_more"
						>Read more <span class="arrow">&rightarrow;</span></button 
					>
				
				`;

			about_2 = `
			<div class="about_header section_title">about us</div>
			 <p class="about_main_text">our products </p>
                <p class="about_sub_text">
					we manufacture all woodden products like sofas, beds , tables, doors
					and windows, closets,honey bees houses, buffes,chicken cabinets,school
					charis and tables,tv stands all with your preference.
				</p>
				<p class="about_main_text">our service</p>
				<p class="about_sub_text">
					besides manufacturing furnitures we also produce and provide wood raw
					materials for other companies and interested privates at any size.
				</p> 
			
		
			<button  class="btn about_btn about_btn_more"
				><span class="arrow"> &LeftArrow; </span> Read less</button 
			>`;
		}
		const readMoreBtn = document.querySelector('.about_btn');

		const aboutMain = document.querySelector('.about');

		const aboutLeft = document.querySelector('.about_left');
		const aboutRight = document.querySelector('.about_right');

		const readMoreClicked = function () {
			if (!aboutStart) {
				// if called by language setter read btns

				if (!aboutLangChange) {
					const rightOne = `
				    <div class="about_images">
						<img
								class="about_image about_image-2"
								src="/image/static/quality.jpg"
							/>
						<img
								class="about_image about_image-3"
								src="/image/static/about_bed-1.jpg"
							/>
						<img
								class="about_image about_image-1"
								
								src="/image/static/about_sofa.png"
								<!-- src="/image/static/about_sofa.jpg" -->

							/>				
				</div>`;
					const rightTwo = `
				    <div class="about_images">
						<img
								class="about_image about_image-1"
								src="/image/static/about_all-1.jpg"
							/>
						<img
								class="about_image about_image-2"
								src="/image/static/about_wood.jpg"
							/>
					
						<img
								class="about_image about_image-3"
								
								src="/image/static/about_machine.jpg"

							/>				
				</div>`;
					aboutOne = !aboutOne;
					if (aboutOne) aboutRight.innerHTML = rightOne;
					if (!aboutOne) aboutRight.innerHTML = rightTwo;
				}
				if (aboutLangChange) {
					// if call is from language setter set language setter info to set
					aboutLangChange = false;
				}
				// dynamicalls setting about content
				if (aboutOne) aboutLeft.innerHTML = about_1;
				if (!aboutOne) aboutLeft.innerHTML = about_2;
				aboutMain.classList.add('fade_about');
			}
			if (aboutStart) {
				// for first call by me ,about one is set
				aboutLeft.innerHTML = about_1;
				aboutStart = false;
			}

			setTimeout(() => {
				document.querySelector('.about').classList.remove('fade_about');
			}, 2000);
			buttonsClicked();
		};

		if (aboutStart) {
			// calling for first time to set things up
			readMoreClicked();
		}
		if (aboutLangChange) {
			// ccalled by the langauge setter
			readMoreClicked();
		}
		// called by read btn
		readMoreBtn.addEventListener('click', readMoreClicked);
	};
	aboutBtnClick();
};
buttonsClicked();

const pagination = function () {
	const createProduct = function (product) {
		const productElement = document.createElement('div');
		productElement.classList.add('product');
		productElement.innerHTML = `
	<div class="product_image">
	<div class="discount">				
		5% discount
	</div>
	<img src="/image/products/test/${product.imageUrl}" alt=" table_full" />
</div>
<div class="product_text">
	<ul class="product_text_list">
		<li class="name">${product.productName}</li>
		<li class="productId">${product.id}</li>
		<li class="type">${product.type}</li>
		<li class="amount"> ዋጋ ፡<br />
			<p class="amount_value">${product.priceString}</p>
		</li>
		<li class="days">እቃው ሚወጣበት ቀን፡ 
			<p class="days_value">${product.deliveryString}</p>
		</li>
			
	</ul>
	<button class="buyBtn">buy now</button>
</div>`;
		return productElement;
	};
	const renderSearched = function (products) {
		const productContainer = document.querySelector('.products_main');
		const productElements = products.map((productData) =>
			createProduct(productData)
		);
		productElements.forEach((productElement) =>
			productContainer.append(productElement)
		);
	};
	const pageBtn = document.querySelector('.btn-page');

	const MoreProducts = function (e) {
		fetch('/allProducts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				pageNo: +pageBtn.getAttribute('pageData'),
				type: pageBtn.getAttribute('productData'),
			}),
		})
			.then((result) => {
				if (!result.ok)
					return Promise.resolve({ status: 'fail', message: 'request failed' });
				if (result.ok) return result.json();
			})
			.then((data) => {
				if (data.status == 'fail') return;
				if (data.status == 'success') {
					renderSearched(data.data.products, pagination);
					if (data.data.pagination.page) {
						pageBtn.setAttribute('pageData', data.data.pagination.page);
						pageBtn.setAttribute('productData', 'all');
						pageBtn.classList.remove('btn-page_invisible');
					}

					if (!data.data.pagination.page) {
						pageBtn.classList.add('btn-page_invisible');
					}
					buying();
				}
			});
	};

	pageBtn.addEventListener('click', MoreProducts);
};
pagination();

const searching = function () {
	const createProduct = function (product) {
		const productElement = document.createElement('div');
		productElement.classList.add('product');
		productElement.innerHTML = `
	<div class="product_image">
	<div class="discount">				
		5% discount
	</div>
	<img src="/image/products/test/${product.imageUrl}" alt=" table_full" />
</div>
<div class="product_text">
	<ul class="product_text_list">
		<li class="name">${product.productName}</li>
		<li class="productId">${product.id}</li>
		<li class="type">${product.type}</li>
		<li class="amount"> ዋጋ ፡<br />
			<p class="amount_value">${product.priceString}</p>
		</li>
		<li class="days">እቃው ሚወጣበት ቀን፡ 
			<p class="days_value">${product.deliveryString}</p>
		</li>
			
	</ul>
	<button class="buyBtn">buy now</button>
</div>`;
		return productElement;
	};
	const renderSearched = function (products, pagination) {
		const pageBtn = document.querySelector('.btn-page');
		const productContainer = document.querySelector('.products_main');
		const productElements = products.map((productData) =>
			createProduct(productData)
		);
		productContainer.innerHTML = '';
		productElements.forEach((productElement) =>
			productContainer.append(productElement)
		);
		if (pagination.page) {
			pageBtn.setAttribute('pageData', pagination.page);
			pageBtn.setAttribute('productData', pagination.type);
			pageBtn.classList.remove('btn-page_invisible');
		}
		if (!pagination.page) pageBtn.classList.add('btn-page_invisible');
	};
	const getSeachedData = function (searchedBy, searcher, e) {
		let searched;
		const searchError = document.querySelector('.search_error');
		e.preventDefault();
		if (searchedBy == 'catagory')
			searched = searcher.getAttribute('data-search');
		if (searchedBy == 'form') {
			searched = e.target.elements.search.value;
			e.target.elements.search.value = '';
		}

		if (!searched) return;
		fetch(`/products/${searched}`)
			.then((result) => {
				if (result.ok) return result.json();
				if (!result.ok) return Promise.resolve({ status: 'fail' });
			})
			.then((productsData) => {
				if (productsData.status === 'success') {
					renderSearched(
						productsData.data.products,
						productsData.data.pagination
					);
					// reintialing selecting other things cause of rerendering
					buying();
					commenting();
					pagination();
				}

				if (productsData.status === 'fail') {
					if (langAmharic) {
						if (searchedBy == 'form')
							searchError.textContent = ' ይቅርታ ከፍለጋዎ ጋር የተያያዘ ምርት አልተገኘም !';
						if (searchedBy == 'catagory')
							searchError.textContent =
								'ይቅርታ እስካሁን  በዚህ ምርት አይነት ዕቃ አለቀቅንም !  ';
					}
					if (!langAmharic) {
						if (searchedBy == 'form')
							searchError.textContent =
								'  No product is Associated with your search !';
						if (searchedBy == 'catagory')
							searchError.textContent =
								'  No product is added with this catagory yet !';
					}
					if (searchedBy == 'catagory') {
						const productContainer = document.querySelector('.products_main');
						productContainer.scrollIntoView({ behavior: 'smooth' });
						productContainer.classList.add('centered_section');
					}
					searchError.classList.add('visibleError');
					searchError.classList.add('visibleError');
					setTimeout(() => {
						searchError.classList.remove('visibleError');
					}, 3000);
				}
			});
	};

	const searchFunction = function () {
		const searchInput = document.querySelector('.search_input');
		const searchForm = document.querySelector('.product_search');
		const searchResults = [
			'sofa',
			'table',
			'chair',
			'bed',
			'closet',
			'dressing',
			'door',
			'cabnet',
		];

		const productContainer = document.querySelector('.products_main');
		const products = Array.from(document.querySelectorAll('.product'));
		let searchIndex = 0;
		// frontend serach
		searchInput.addEventListener('keydown', function (e) {
			let alikes;
			let searched = searchInput.value;
			alikes = searchResults.filter((item, index, array) => {
				if (searched == '') return false;
				return item.includes(searched);
			});

			if (alikes.length > 0) {
				const currentResut = [];
				alikes.forEach((alike) => currentResut.unshift(alike));

				const productsFiltered = products.filter((product) => {
					const productType = product.querySelector('.type').textContent;
					return productType == currentResut[0];
				});
				const productsUnfiltered = products.filter((product) => {
					const productType = product.querySelector('.type').textContent;
					return productType != currentResut[0];
				});

				productContainer.innerHTML = '';
				productsFiltered.forEach((product) => productContainer.append(product));
				productsUnfiltered.forEach((product) =>
					productContainer.append(product)
				);
			}
		});
		// backend search
		searchForm.addEventListener(
			'submit',
			getSeachedData.bind(null, 'form', 'formmm')
		);
	};
	searchFunction();

	const searchFromCatagory = () => {
		const searchError = document.querySelector('.search_error');
		const catagories = document.querySelectorAll('.catagory');
		if (catagories)
			catagories.forEach((catagory) =>
				catagory.addEventListener(
					'click',
					getSeachedData.bind(null, 'catagory', catagory)
				)
			);
	};
	searchFromCatagory();
};
searching();
