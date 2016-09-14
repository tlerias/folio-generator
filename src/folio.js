( function () {

	/* 

	Folio Constructor
	@params
	@elementContainer: the element that this will replace
	@resumeSet: array of jobs
	@options options for the Folio


	*/
	class Folio {

		constructor (elementContainer, resumeSet = [], options = {}) {

		// Validation of element, the only required argument
    	if (!elementContainer || (elementContainer.nodeName !== 'DIV' && elementContainer.tagName !== 'DIV')) return;

    	this.skillExperience = _getSkillExperience(resumeSet);
		}

		getDateDifference () {
			_getDateDifference();
		}
	}

	function _getSkillExperience (set) {

		if (!set || !set.isArray) return;

		set.forEach(function (position) {

		});

	}

	function _getDateDifference (dates, measurement) {

	}

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = Folio;
	} else {
	  window.Folio = Folio;
	}

})();