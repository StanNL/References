var items = {
	'jQuery': '&lt;script src=" https://code.jquery.com/jquery-3.3.1.min.js "&gt; &lt;/script&gt;',
	'Materialize': '&lt;link rel="stylesheet" href=" https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css "&gt; \n&lt;script src=" https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js "&gt; &lt;/script&gt;',
	'p5js': "&lt;script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js' &gt;&lt;/script&gt;"
}

$(document).ready(function () {
	ks = Object.keys(items);
	for(let i = 0; i < ks.length;i++){
		$("<h3>").html(ks[i]).appendTo("#main");
		$("<pre>").html(items[ks[i]]).appendTo("#main");
	}

	dq = $("pre");
	for (let i = 0; i < dq.length; i++) {
		dq[i].addEventListener('click', function () {
			res.innerHTML = this.innerHTML.replace(/ /g, '');

			navigator.clipboard.writeText(res.textContent);
		});
	}
});