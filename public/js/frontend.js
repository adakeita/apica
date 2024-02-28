document.getElementById("vending-machine").addEventListener("click", function (e) {
	if (e.target.classList.contains("product")) {
		const endpoint = e.target.getAttribute("data-endpoint");
		console.log(`Navigating to ${endpoint}`);
	}
});
