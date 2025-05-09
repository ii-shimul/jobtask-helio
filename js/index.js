const product = {
	id: "helio-pet-device",
	title: "Helio Pet Device™",
	image: "./assets/product pic variations.jpeg",
	price: 249,
	compareAt: 369,
	color: "MidnightBlue",
	size: "L",
};
const minQty = 1;
const maxQty = 10;
const freeShipping = 1000;

window.onload = function () {
	// Cache DOM elements
	const cartButton = document.querySelector(".cart-icon");
	const addButton = document.querySelector(".add-to-cart");
	const minusButton = document.querySelectorAll(".qty-btn")[0];
	const plusButton = document.querySelectorAll(".qty-btn")[1];
	const qtyText = document.querySelector(".qty");
	const drawer = document.getElementById("cartDrawer");
	const overlay = document.getElementById("cartDrawerOverlay");
	const closeButton = document.getElementById("cartDrawerClose");
	const closeButton2 = document.getElementById("cartDrawerClose2");
	const continueButton = document.getElementById("cartDrawerContinue");
	const minusDrawerButton = document.getElementById("cartQtyMinus");
	const plusDrawerButton = document.getElementById("cartQtyPlus");
	const qtyDrawerText = document.getElementById("cartQty");
	const deleteDrawerButton = document.getElementById("cartDeleteBtn");
	const productImg = document.getElementById("cartProductImg");
	const productTitle = document.querySelector(".cart-product-title");
	const oldPrice = document.getElementById("cartOldPrice");
	const newPrice = document.getElementById("cartNewPrice");
	const productMeta = document.querySelectorAll(".cart-product-meta");
	const productTotal = document.getElementById("cartProductTotal");
	const estimatedTotal = document.getElementById("cartEstimatedTotal");
	const freeShippingText = document.getElementById("cartFreeShippingAmount");
	const freeShippingBar = document.getElementById("cartFreeShippingBar");
	const emptyState = document.getElementById("cartEmptyState");
	const productState = document.getElementById("cartProductState");

	let qty = minQty;
	let cart = null;
	let cartStorage = localStorage.getItem("cart");
	if (cartStorage) {
		cart = JSON.parse(cartStorage);
		if (cart && cart.qty) {
			qty = cart.qty;
			updateMainPrices(qty);
			qtyText.textContent = qty;
		}
	}
	updateDrawer(cart);

	minusButton.onclick = function () {
		if (qty > minQty) {
			qty = qty - 1;
			updateMainPrices(qty);
			qtyText.textContent = qty;
		}
	};
	plusButton.onclick = function () {
		if (qty < maxQty) {
			qty = qty + 1;
			updateMainPrices(qty);
			qtyText.textContent = qty;
		}
	};

	addButton.onclick = function () {
		cart = { id: product.id, qty: qty };
		localStorage.setItem("cart", JSON.stringify(cart));
		updateDrawer(cart);
		openDrawer();
	};

	cartButton.onclick = function (e) {
		if (e) e.preventDefault();
		openDrawer();
	};
	closeButton.onclick = closeDrawer;
	if (closeButton2) closeButton2.onclick = closeDrawer;
	if (continueButton) continueButton.onclick = closeDrawer;
	overlay.onclick = closeDrawer;

	minusDrawerButton.onclick = function () {
		if (cart && cart.qty > minQty) {
			cart.qty = cart.qty - 1;
			localStorage.setItem("cart", JSON.stringify(cart));
			updateDrawer(cart);
			updateMainPrices(cart.qty);
			qty = cart.qty;
			qtyText.textContent = cart.qty;
		}
	};
	plusDrawerButton.onclick = function () {
		if (cart && cart.qty < maxQty) {
			cart.qty = cart.qty + 1;
			localStorage.setItem("cart", JSON.stringify(cart));
			updateDrawer(cart);
			updateMainPrices(cart.qty);
			qty = cart.qty;
			qtyText.textContent = cart.qty;
		}
	};

	deleteDrawerButton.onclick = function () {
		localStorage.removeItem("cart");
		cart = null;
		updateDrawer(null);
		qty = minQty;
		updateMainPrices(qty);
		qtyText.textContent = qty;
	};

	function openDrawer() {
		drawer.classList.add("active");
		overlay.classList.add("active");
		updateDrawer(cart);
	}
	function closeDrawer() {
		drawer.classList.remove("active");
		overlay.classList.remove("active");
	}

	function updateMainPrices(q) {
		document.querySelector(".new-price").textContent =
			"$" + (product.price * q).toFixed(2);
		document.querySelector(".old-price").textContent =
			"$" + (product.compareAt * q).toFixed(2);
	}

	function updateDrawer(cartObj) {
		if (!cartObj || !cartObj.qty) {
			emptyState.style.display = "";
			productState.style.display = "none";
			return;
		}
		emptyState.style.display = "none";
		productState.style.display = "";
		productImg.src = product.image;
		productTitle.textContent = product.title;
		oldPrice.textContent = "$" + (product.compareAt * cartObj.qty).toFixed(2);
		newPrice.textContent = "$" + (product.price * cartObj.qty).toFixed(2);
		qtyDrawerText.textContent = cartObj.qty;
		productMeta[0].textContent = "Color: " + product.color;
		productMeta[1].textContent = "Size: " + product.size;
		productTotal.textContent = "$" + (product.price * cartObj.qty).toFixed(2);
		estimatedTotal.textContent = "$" + (product.price * cartObj.qty).toFixed(2);
		let subtotal = product.price * cartObj.qty;
		let diff = freeShipping - subtotal;
		if (diff <= 0) {
			freeShippingText.textContent = "You have free shipping!";
			freeShippingBar.style.width = "100%";
		} else {
			freeShippingText.textContent = "$" + diff.toFixed(0);
			let percent = Math.min(100, (subtotal / freeShipping) * 100);
			freeShippingBar.style.width = percent + "%";
		}
	}
};
