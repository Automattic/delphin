function home() {
	return '/';
}

function about() {
	return '/about';
}

function checkout() {
	return '/checkout';
}

function search() {
	return home();
}

function success() {
	return '/success';
}

export default {
	about,
	checkout,
	home,
	search,
	success
};
