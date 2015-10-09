import metapod from '../src/metapod.js';

describe('Test the generation of tag elements', () => {
  describe('Test the simple generation of tag elements', () => {
    var tagsWithTextNode = [
        'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b',
        'base', 'bdi', 'bdo', 'body', 'br', 'button', 'canvas', 'caption',
        'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del',
        'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed',
        'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3',
        'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'i', 'iframe',
        'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark',
        'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol',
        'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q',
        'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'small',
        'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table',
        'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title',
        'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'
      ],
      tagsWithoutTextNode = ['img', 'input', 'select'];

    tagsWithTextNode.forEach((tagName) => {
      it('Should to create a ' + tagName + ' tag', () => {
        var compareTag = document.createElement(tagName),
            buildedTag = metapod[tagName]('my nice text', {
              id: 'awesome-id'
            });

        compareTag.setAttribute('id', 'awesome-id');
        compareTag.appendChild(document.createTextNode('my nice text'));

        expect(buildedTag).toEqual(compareTag);
      });
    });

    tagsWithoutTextNode.forEach((tagName) => {
      it('Should to create a ' + tagName + ' tag', () => {
        var compareTag = document.createElement(tagName),
            buildedTag = metapod[tagName]({
                          id: 'awesome-id',
                          value: 'my value'
                        });

        compareTag.setAttribute('id', 'awesome-id');
        compareTag.setAttribute('value', 'my value');

        expect(buildedTag).toEqual(compareTag);
      });
    });
  });

  describe('Test the generation of tag elements within others', () => {
    var selectTag,
        ulTag,
        formTag;

    beforeEach(() => {
      var textareaTag = document.createElement('textarea'),
          inputTag    = document.createElement('input'),
          optionTag,
          liTag;

      selectTag = document.createElement('select');
      ulTag     = document.createElement('ul');
      formTag   = document.createElement('form');

      [1, 2, 3, 4].forEach((count) => {
        optionTag = document.createElement('option');

        optionTag.setAttribute('value', 'value_' + count);
        optionTag.appendChild(document.createTextNode(count));

        selectTag.appendChild(optionTag);
      });

      textareaTag.appendChild(document.createTextNode('test text'));
      inputTag.setAttribute('value', 'my value');
      formTag.appendChild(inputTag);
      formTag.appendChild(textareaTag);
      formTag.appendChild(selectTag);

      [1, 2, 3].forEach((count) => {
        liTag = document.createElement('li');
        liTag.appendChild(document.createTextNode(count));

        ulTag.appendChild(liTag);
      });

    });

    it('Should to create selection with multiples options', () => {
      var compareTag = selectTag,
          buildedTag = metapod.select(
                        metapod.option(1, { value: 'value_1' }),
                        metapod.option(2, { value: 'value_2' }),
                        metapod.option(3, { value: 'value_3' }),
                        metapod.option(4, { value: 'value_4' }),
                        { id: 'awesome-id' }
                      );

      compareTag.setAttribute('id', 'awesome-id');

      expect(buildedTag).toEqual(compareTag);
    });

    it('Should to create div with multiples tags', () => {
      var compareTag = document.createElement('div'),
          spanTag    = document.createElement('span'),
          buildedTag = metapod.div(
                        metapod.span('my text', { id: 'caule' }),
                        metapod.ul(
                          metapod.li(1),
                          metapod.li(2),
                          metapod.li(3)
                        ),
                        metapod.form(
                          metapod.input({ value: 'my value' }),
                          metapod.textarea('test text'),
                          metapod.select(
                            metapod.option(1, { value: 'value_1' }),
                            metapod.option(2, { value: 'value_2' }),
                            metapod.option(3, { value: 'value_3' }),
                            metapod.option(4, { value: 'value_4' })
                          )
                        ),
                        { id: 'awesome-id' }
                      );

      compareTag.setAttribute('id', 'awesome-id');
      spanTag.setAttribute('id', 'caule');
      spanTag.appendChild(document.createTextNode('my text'));
      compareTag.appendChild(spanTag);
      compareTag.appendChild(ulTag);
      compareTag.appendChild(formTag);

      expect(buildedTag).toEqual(compareTag);
    });

    it('should create a div with array of tags', () => {
      var numberTags = 3,
          arrayOfDivs = [],
          compareTag = document.createElement('div'),
          buildedTag;

      for (var i = 0; i < numberTags; i++) {
        arrayOfDivs.push(metapod.div());

        compareTag.appendChild(document.createElement('div'));
      }

      buildedTag = metapod.div(arrayOfDivs);

      expect(buildedTag).toEqual(compareTag);
    });

    it('should create a div with other div returned in function', () => {
      var buildedTag = metapod.div(() => { return metapod.div() }),
          compareTag = document.createElement('div');

      compareTag.appendChild(document.createElement('div'));

      expect(buildedTag).toEqual(compareTag);
    });
  });

  describe('Test appender properties', () => {
    describe('events', () => {
      var events;

      beforeEach(() => {
        events = {
          click: () => {},
          mouseover: () => {}
        };

        spyOn(events, 'click');
        spyOn(events, 'mouseover');
      });

      it('should add events in element', () => {
        var button = metapod.button({ events: events });

        button.click();

        expect(events.click).toHaveBeenCalled();
        // expect(events.mouseover).toHaveBeenCalled();
      });
    });

    describe('className', () => {
      var classes;

      beforeEach(() => {
        classes = {
          array: ['foo', 'bar', 'baz'],
          stringMulti: 'foo bar baz',
          stringSimple: 'foo-bar-baz'
        };
      });

      it('should add array classes', () => {
        var element = metapod.div({ className: classes.array });

        classes.array.forEach((className) => {
          expect(element.classList.contains(className)).toBe(true);
        });
      });

      it('should add string multi classes', () => {
        var element = metapod.div({ className: classes.stringMulti });

        classes.stringMulti.split(' ').forEach((className) => {
          expect(element.classList.contains(className)).toBe(true);
        });
      });

      it('should add string simple classes', () => {
        var element = metapod.div({ className: classes.stringSimple });

        expect(element.classList.contains(classes.stringSimple)).toBe(true);
      });
    });

    describe('styles', () => {
      var style;

      beforeEach(() => {
        style = {
          backgroundColor: 'black',
          color: 'red'
        };
      });

      it('should add style in element', () => {
        var element = metapod.div({ style: style });

        for (var prop in style) {
          expect(element.style[prop]).toEqual(style[prop]);
        }
      });
    });
  });
});
