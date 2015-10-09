(function() {
  var scope;
  var h1;
  var h2;
  var button;

  scope = document.getElementById('app');

  h1 = metapod.h1('Tag', { className: 'title', style: { color: 'red' } });

  h2 = metapod.h2(
    'Created by ',
    metapod.a('Ignição Digital', {
      href: 'http://www.ignicaodigital.com.br',
      className: ['btn', 'btn-info']
    })
  );

  button = metapod.button(
    'Hover and Click me',
    {
      className: 'btn btn-default',
      events: {
        click() {
          alert('Clicked!');
        },
        mousemove(event) {
          this.style.left = event.x - 50 + 'px';
          this.style.top = event.y - 18 + 'px';
        }
      }
    }
  );

  scope.appendChild(metapod.div(h1, h2, button));

})();
