/*!
 * Filename: placeholder.js
 * 
 * A simple MooTools based HTML5 placeholder polyfill.
 */


(function() {
    var Polyfill            = this.Polyfill || {},
        PlaceholderSupport  = this.PlaceholderSupport || {
            'input': 'placeholder' in document.createElement('input'),
            'textarea': 'placeholder' in document.createElement('textarea')
        }
    ;

    Polyfill.Placeholder = new Class({
        Implements: [Options],
        options: {
            className: 'js-placeholder'
        },

        initialize: function(element, index, options)
        {
            this.index          = index;
            this.element        = element;
            this.elementType    = this.element.get('tag');

            if (PlaceholderSupport[this.elementType] === false) {
                this.setOptions(options);
                this.createPlaceholder();
                this.attachEvents();
            }
        },

        attachEvents: function()
        {
            var self        = this,
                placeholder = this.element.getParent().getElements('label').pop()
            ;
            this.element.addEvents({
                focus: function()
                {
                    if (placeholder.getStyle('display') === 'block') {
                        placeholder.setStyle('display', 'none');
                    }
                },
                blur: function()
                {
                    if (self.element.get('value') === '') {
                        placeholder.setStyle('display', 'block');
                    }
                }
            });
        },

        createPlaceholder: function()
        {   
            var state = this.element.get('value') === '' ? 'block' : 'none';

            if (!this.element.get('id')) {
                this.element.set('id', 'js-placeholder-' + this.index);
            }
            var placeholder = new Element('label', {
                'for': this.element.get('id'),
                'class': this.options.className,
                'styles': { 'display': state },
                'html': this.element.get('placeholder')
            });
            this.element.getParent().adopt(placeholder);
        }
    });

    this.Polyfill = Polyfill;
})();