var items = {};
var anim1speed = 400;
var anim2speed = 280;
var shownTime;
var margin = 1.1;
var theme;
var lastClick;

$(document).ready(function () {
	loadTheme();
	setTimeout(function () {
		$("*").css("transition-duration", '400ms');
		theme = localStorage.getItem("RefTheme");
	}, 250);

	setInterval(loadTheme, 10000);

	$.getJSON("Data/Items.json", function (data) {
		items = data;

		ks = Object.keys(items);
		for (let i = 0; i < ks.length; i++) {
			latest = $("<div class='item'>").appendTo("#main");
			$("<h3>").html(ks[i]).appendTo(latest);
			$("<pre>").html(items[ks[i]]).appendTo(latest);
		}

		dq = $("pre");
		for (let i = 0; i < dq.length; i++) {
			$(dq[i]).click(function () {
				res.innerHTML = this.innerHTML;
				navigator.clipboard.writeText(res.textContent);
				toast("Text copied to clipboard!", 3250);
			});
		}
	});

	$("#themeSwitcher").click(function () {
		let themanaam;
		let oldtheme = theme;
		if (!oldtheme || oldtheme == 'light') {
			themanaam = 'donker';
			theme = 'dark';
		}
		if (oldtheme == 'dark') {
			themanaam = 'licht';
			theme = 'light';
		}
		localStorage.setItem("RefTheme", theme);
		toast("Thema is nu " + themanaam, 3250);
		loadTheme();
	});
});

function loadTheme() {
	let currentTheme = theme;
	let c = currentTheme;
	if (c == 'light') {
		$("*").removeClass("dark");
		ic = "Images/icon.png";
		$("#favicon").attr("href", ic);
		$("#logo").attr("src", ic);
		$("#themeSwitcher").html("brightness_high");
		$("#tc").attr("content", "#0287c3");
	} else {
		$("*").addClass("dark");
		ic = "Images/icon_transparent.png";
		$("#favicon").attr("href", "Images/icon_dark.png");
		$("#logo").attr("src", ic);
		$("#themeSwitcher").html("brightness_low");
		$("#tc").attr("content", "#00171e");
	}
}

// function getCurrentTheme(){
// 	let d = new Date().getHours();
// 	if(d > 19 || d < 7) return "dark";
// 	return "light";
// }

function toast(text, t) {
	shownTime = t;
	lastClick = +new Date();
	$("#toastText").html(text);
	$("#toast").addClass("showing");
	setTimeout(function () {
		$("#toast").addClass("shown");
		setTimeout(function () {
			$("#toastText").addClass("shown");
		}, anim2speed);
	}, anim1speed);

	setTimeout(function () {
		if (checkTime(shownTime)) {
			$("#toastText").removeClass("shown");
			setTimeout(function () {
				if (checkTime(shownTime + anim2speed)) {
					$("#toast").removeClass("shown");
					setTimeout(function () {
						if (checkTime(shownTime + anim2speed + anim1speed)) {
							$("#toast").removeClass("showing");
						}
					}, anim1speed);
				}
			}, anim2speed);
		}
	}, shownTime);
}

function tDiff() {
	return Math.abs(+new Date() - lastClick);
}

function checkTime(t) {
	return (tDiff() < (t * margin)) && (tDiff() > (shownTime / margin));
}