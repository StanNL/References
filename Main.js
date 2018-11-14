var items = {}

$(document).ready(function () {
	getJSON("Items.json", function(data){
		items = data;
		
		ks = Object.keys(items);
		for (let i = 0; i < ks.length; i++) {
			$("<h3>").html(ks[i]).appendTo("#main");
			$("<pre>").html(items[ks[i]]).appendTo("#main");
		}
	
		dq = $("pre");
		for (let i = 0; i < dq.length; i++) {
			dq[i].addEventListener('click', function () {
				res.innerHTML = this.innerHTML;
				M.toast({
					html: "Code copied to clipboard!",
					duration: 2500
				});
				navigator.clipboard.writeText(res.textContent);
			});
		}
	})
});