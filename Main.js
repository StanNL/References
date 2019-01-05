var items = {};
var anim1speed = 400;
var anim2speed = 280;
var shownTime = 3250;
var margin = 1.1;
var lastClick;

$(document).ready(function () {
	$.getJSON("Items.json", function (data) {
		items = data;

		ks = Object.keys(items);
		for (let i = 0; i < ks.length; i++) {
			latest = $("<div class='item'>").appendTo("#main");
			$("<h3>").html(ks[i]).appendTo(latest);
			$("<pre>").html(items[ks[i]]).appendTo(latest);
		}

		dq = $("pre");
		for (let i = 0; i < dq.length; i++) {
			dq[i].addEventListener('click', function () {
				lastClick = +new Date();
				res.innerHTML = this.innerHTML;
				navigator.clipboard.writeText(res.textContent);
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
			});
		}
	})
});

function tDiff() {
	return Math.abs(+new Date() - lastClick);
}

function checkTime(t) {
	return (tDiff() < (t * margin)) && (tDiff() > (shownTime / margin));
}