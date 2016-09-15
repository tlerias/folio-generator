( function () {

	class DateDifference {

    convertDays (date1, date2) {
      let t2 = date2.getTime();
      let t1 = date1.getTime();

      return parseInt((t2-t1)/(24*3600*1000));
  }

    convertWeeks (date1, date2) {
      let t2 = date2.getTime();
      let t1 = date1.getTime();

      return parseInt((t2-t1)/(24*3600*1000*7));
  }

    convertMonths (date1, date2) {
      let date1Years = date1.getFullYear();
      let date2Years = date2.getFullYear();
      let date1Months = date1.getMonth();
      let date2Months = date2.getMonth();

      return (date2Months+12*date2Years)-(date1Months+12*date1Years);
  }

    convertYears (date1, date2) {
      return date2.getFullYear() - date1.getFullYear();
    }
  }

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

    	this.defaultOptions = {
    		measurement: 'years'
    	};

    	this.init(options); // handles options

    	this.skillExperience = _getSkillExperience(resumeSet, options.measurement);		
    	console.log(this.skillExperience)
    }

    extend (defaults = {}, options = {}) {
	    const extended = {};
	    let prop;

	    for (prop in defaults) {
	      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
	        extended[prop] = defaults[prop];
	      }
	    }

	    for (prop in options) {
	      if (Object.prototype.hasOwnProperty.call(options, prop)) {
	        extended[prop] = options[prop];
	      }
	    }

	    return extended;
	  }

    init (options = {}) {
    	if (typeof options === 'object') {
	      this.options = this.extend(this.defaultOptions, options);
	    } else {
	      this.options = this.defaultOptions;
	    }
    }

		getDateDifference () {
			_getDateDifference();
		}
	}

	function _getSkillExperience (set) {

		if (!set || !Array.isArray(set)) return;

		let skills = {};
		let experienceLength;
		const dateConverter = new DateDifference();

		set.forEach(function (position) {

			if (!position.startDate || !position.endDate) return;

			let startDateMs = position.startDate && new Date(position.startDate);
			let endDateMs = position.endDate && new Date(position.endDate);

			experienceLength = dateConverter.convertYears(startDateMs, endDateMs);

			console.log(experienceLength);

			position.skills.forEach(function (skill) {
				let skillName = skill.toLowerCase();

				if (!skills[skillName]) {
					skills[skillName] = experienceLength;
				} else {
					skills[skillName] += experienceLength;
				}
			});
		});

		return skills;

	}

	function _getDateDifference (laterDate, earlierDate, measurement) {
		if (!laterDate || !earlierDate) return;
		DateDifference

	}

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = Folio;
	} else {
	  window.Folio = Folio;
	}

})();