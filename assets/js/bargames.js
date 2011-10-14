


var games = {
  'Billiards' : {
    types : {
      '8-Ball' : {
        score: false,
        teams: 2,
        players: 2
      },
      '9-Ball' : {
        score: false,
        teams: Infinity,
        players: 1
      },
      'Cutthroat' : {
        score: false,
        teams: 3,
        players: 1
      }
    }
  },
  'Foosball' : {
    types: {
      'Foosball' : {
        score: 'high',
        teams: 2,
        players: 2
      }
    }
  },
  'Darts' : {
    types: {
      'Cricket' : {
        score: 'high',
        teams: Infinity,
        players: 1
      },
      '301' : {
        score: 'low',
        teams: Infinity,
        players: 1
      }
    }
  }
};


var players = [
  { name: 'Marcus Pohl', email: 'marcus@marcuspohl.com' },
  { name: 'Gavin Glazier', email: 'glaz_04@hotmail.com' },
  { name: 'Mike Frey', email: 'frey.mike@gmail.com' },
  { name: 'Jim Skuza', email: 'skuzme11@yahoo.com' },
  { name: 'Bryan Ahsenmacher', email: 'thewheelmaker@hotmail.com' }
];


var tmplCache = {};
function tmpl(id) {
  if (!(id in tmplCache)) {
    tmplCache[id] = _.template($('#'+id).html());
  }
  return tmplCache[id];
}



$(function(){

  var gameSelect      = $('#gameSelect'),
      gameTypeSelect  = $('#gameTypeSelect'),
      playerSelect    = $('#playerSelect'),
      template        = tmpl('gameSelectTemplate'),
      html            = template({ data:games });

  gameSelect.append(html).trigger('create');


  // transition to Type Select page
  gameSelect.find('a').live('click', function(ev) {
    var $this = $(this),
        temp = tmpl('gameTypeTemplate'),
        game = $this.data('game'),
        data = games[game].types,
        html = temp({ data:data, game:game });
    gameTypeSelect.find('p').remove();
    gameTypeSelect.append(html).trigger('create');
  });


  // transition to Player Select
  gameTypeSelect.find('a').live('click', function(ev) {
    var $this = $(this),
        temp = tmpl('playerSelectTemplate'),
        game = $this.data('game'),
        type = $this.data('type'),
        data = games[game].types[type],
        html = '';
    playerSelect.find('fieldset').remove();

    if (data.teams < Infinity) {
      for (var i = 0; i < data.teams; i++) {
        html += temp({ players:players, data:data });
      }
    }
    else {
      html = temp({ players:players, data:data });
    }

    playerSelect.append(html).trigger('create');
  });


});



