// Cache DOM elements
let selectedProduct = null;
const displayMessage = document.getElementById("displayMessage");
const displayButtons = document.getElementById("displayButtons");
const displayContent = document.querySelector(".display-content");
const productsWrapper = document.querySelector(".products-wrapper");

// Handle product selection
productsWrapper.addEventListener("click", (e) => {
	if (!e.target.classList.contains("product")) return;

	if (selectedProduct) selectedProduct.classList.remove("selected");
	selectedProduct = e.target;
	selectedProduct.classList.add("selected");

	displayMessage.textContent = `${selectedProduct.getAttribute(
		"data-endpoint"
	)}. Confirm selection.`;
	displayButtons.style.display = "block";

	// Fade effect
	displayContent.style.opacity = "0.5";
	setTimeout(() => (displayContent.style.opacity = "1"), 500);
});

// Confirm selection
document.getElementById("okButton").addEventListener("click", () => {
	if (!selectedProduct) return;

	animateProduct(selectedProduct);
});

// Abort button
document.getElementById("abortButton").addEventListener("click", resetSelection);

// calculate translateY for product animation
function calculateTranslateYForProduct(product) {
	const dispenserRect = document.querySelector(".dispenser").getBoundingClientRect();
	const productRect = product.getBoundingClientRect();
	return dispenserRect.bottom - productRect.bottom - 1;
}

// Function to animate and reset product
function animateProduct(product) {
	const dial = document.querySelector(".turn-dial");

	dial.style.transition = "transform 0.5s ease-out";
	dial.style.transform = "rotate(45deg)";

	const translateY = calculateTranslateYForProduct(product);
	product.classList.add("falling"); // Trigger animation

	// Apply falling animation (bounce not working yet)
	product.style.cssText = `
        transition: transform 1s, opacity 1s;
        transform: translateY(${translateY}px);
        z-index: 100;
        opacity: 1;
        animation: none;
    `;

	setTimeout(() => {
		product.style.animation = `fall 1s forwards, bounce 1s 1s forwards`;
	}, 600);

	// Reset after animation completes, including resetting the dial
	setTimeout(() => {
		console.log(`Action for ${product.getAttribute("data-endpoint")}`);
		resetSelection();

		window.location.href = `/pages${product.getAttribute("data-endpoint")}.html`;

		// Reset the dial to its original position
		dial.style.transition = "";
		dial.style.transform = "rotate(0deg)";
	}, 1500);
}

// Reset selection and clear styles
function resetSelection() {
	if (selectedProduct) {
		selectedProduct.classList.remove("selected", "falling");
		selectedProduct.style.cssText = "";
	}
	displayMessage.textContent = "Select endpoint.";
	displayButtons.style.display = "none";
	selectedProduct = null;
}
