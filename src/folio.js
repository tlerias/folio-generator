( function () {

  class DateDifference {

    constructor () {
      this._convertDays = function (date1, date2) {
        let t2 = date2.getTime();
        let t1 = date1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
      }
    }

    convertDays (date1, date2) {
      return this._convertDays(date1, date2);
    }

    convertWeeks (date1, date2) {
      let numberOfWeeks = this._convertDays(date1, date2) / 7;
      
      return Math.round(numberOfWeeks * 10) / 10;
    }

    convertMonths (date1, date2) {
      let date1Years = date1.getFullYear();
      let date2Years = date2.getFullYear();
      let date1Months = date1.getMonth();
      let date2Months = date2.getMonth();

      return (date2Months+12*date2Years)-(date1Months+12*date1Years);
    }

    convertYears (date1, date2) {
      let numberOfYears = this.convertWeeks(date1, date2) / 52;

      return Math.round(numberOfYears * 10) / 10;
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
      if (!elementContainer || (elementContainer.nodeName !== 'DIV' && elementContainer.tagName !== 'DIV' || !resumeSet || resumeSet && !resumeSet.length)) return;

      this.defaultOptions = {
        measurement: 'years'
      };

      this.init(options); // handles options

      this.getExperienceCalculations(resumeSet, options.measurement);

      console.log(this.skillExperience)
    }

    getExperienceCalculations (set, measurement = 'years') {
      // calculates how long each position was
      // also calculates how much experience for each skill

      const dateConverter = new DateDifference();
      const measureMapper = {
        years: 'convertYears',
        months: 'convertMonths',
        weeks: 'convertWeeks',
        days: 'convertDays'
      };

      let skills = {
        measurement: measurement
      };
      let dateConverterMethod = measureMapper[measurement];
      let experienceLength;

      set.forEach(function (position) {

        if (!position.startDate || !position.endDate) return;

        let startDateMs = position.startDate && new Date(position.startDate);
        let endDateMs = position.endDate && (position.endDate.toLowerCase() === 'present') ? new Date() : new Date(position.endDate);

        experienceLength = dateConverter[dateConverterMethod](startDateMs, endDateMs);

        position.skills.forEach(function (skill) {
          let skillName = skill.toLowerCase();

          if (!skills[skillName]) {
            skills[skillName] = experienceLength;
          } else {
            skills[skillName] += experienceLength;
          }
        });
      });

      this.skillExperience = skills;

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