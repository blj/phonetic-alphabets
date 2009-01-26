var Phonetics = Class.create({
	initialize: function(element) {	
		this.element = $(element);
		this.initEventHandlers();
	},
	spell: function() {
		if (!this.phonetics)
		{
			this.element.insert({after: "<span class='phonetics' />"});
			this.phonetics = this.element.next('span.phonetics');
			this.phonetics.update(Phonetics.phoneticize(this.element.innerHTML));
		}
		else{
			this.phonetics.remove();
			this.phonetics = undefined;
			}
	},
	initEventHandlers: function() {
		this.handler = this.handleHandlerClick.bind(this);
		this.element.observe('click', this.handler);
	},
	handleHandlerClick: function(e) {
		this.spell();
	}
});
Phonetics.lookup = {
	A: 'Alpha',
	B: 'Bravo',
	C: 'Charlie',
	D: 'Delta',
	E: 'Echo',
	F: 'Foxtrot',
	G: 'Golf',
	H: 'Hotel',
	I: 'India',
	J: 'Juliet',
	K: 'Kilo',
	L: 'Lima',
	M: 'Mike',
	N: 'November',
	O: 'Oscar',
	P: 'Papa',
	Q: 'Quebec',
	R: 'Romeo',
	S: 'Sierra',
	T: 'Tango',
	U: 'Uniform',
	V: 'Victor',
	W: 'Whiskey',
	X: 'X-ray',
	Y: 'Yankee',
	Z: 'Zulu'
};
Phonetics.phoneticize = function(name){
	if (name.length > 0 ){
		name = name.toUpperCase();
		var retTags = '';
		var numbers = $R('0','9');
		name.scan(/[A-Z]|\d|\-|\s/, function(characters){
			var key = characters[0];
			retTags += Phonetics.lookup[key] ? ' <span><strong>'+key+'</strong>&nbsp;for&nbsp;'+Phonetics.lookup[key] + '</span>' :
					   numbers.include(key)  ? ' <span><strong>'+key+'</strong>&nbsp;as&nbsp;number</span>' : 
					   '<br />' ;
		});
		return retTags;
	}
	else
		return "";
}
document.observe('dom:loaded', function() {
	$$('.spell').each(function(element){
		new Phonetics(element);
	});
});