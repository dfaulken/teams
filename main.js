$(document).ready(function(){

  function checkTeams(){
    $('.team').each(function(){
      var teamName = $(this).find('.name').text();
      var programmers = $('.programmer').filter(function(){
        return $(this).data('teamName') === teamName;
      }).map(function(){ 
        return $(this).attr('class').split(' ');
      });
      var warnings = $(this).find('.warnings');
      warnings.toggleClass('lead-missing', count(programmers, 'lead') < 1);
      warnings.toggleClass('lead-surplus', count(programmers, 'lead') > 1);
      warnings.toggleClass('trainee-missing', count(programmers, 'trainee') < 1);
      warnings.toggleClass('trainee-surplus', count(programmers, 'trainee') > 1);
    });
  }

  // I cannot fathom why this doesn't exist in underscore.
  function count(array, element){
    return _.filter(array, function(elem){
      return elem === element;
    }).length;
  }

  function programmerDropped(event, ui){
    var teamName = $(this).siblings('.name').text();
    var programmer = ui.draggable;
    programmer.data('team-name', teamName);
    checkTeams();
  }

  function setProgrammerTeam(){
    var teamName = $(this).parents('.team').find('.name').text();
    $(this).data('team-name', teamName);
  }

  function toggleLead(){
    $(this).toggleClass('lead');
    checkTeams();
  }

  $('.programmer:not(.fixed)').draggable();
  $('.programmer.fixed').draggable({ containment: 'parent' }).dblclick(function(){
    alert("This programmer's status and team association are fixed.");
  }).each(setProgrammerTeam);
  $('.programmer:not(.in-training,.fixed)').dblclick(toggleLead);
  $('.team .container').droppable({ drop: programmerDropped });
  checkTeams();
}).dblclick(function(e){
  if(e.target.localName === 'body') e.target.webkitRequestFullscreen();
});
