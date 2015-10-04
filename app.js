(function() {
  var scope;
  var h1;
  var h2;
  var button;

  scope = document.getElementById('app');

  h1 = tag.h1('Tag', { className: 'title', style: { color: 'red' } });

  h2 = tag.h2(
    'Created by ',
    tag.a('Ignição Digital', {
      href: 'http://www.ignicaodigital.com.br',
      className: ['btn', 'btn-info']
    })
  );

  button = tag.button(
    'Hover and Click me',
    {
      className: 'btn btn-default',
      events: {
        click(event) {
          alert('Clicked!')
        },
        mousemove(event) {
          this.style.left = event.x - 50 + 'px';
          this.style.top = event.y - 18 + 'px';
        }
      }
    }
  );

  scope.appendChild(tag.div(h1, h2, button));

})();