$(document).ready(function(){

  function checkTeams(){
    $('.team').each(function(){
      var teamName = $(this).data('name');
      var programmers = $('.programmer').filter(function(){
        return $(this).data('teamName') == teamName;
      }).map(function(){ 
        return $(this).attr('class').split(' ');
      });
      $(this).toggleClass('lead-missing', count(programmers, 'lead') < 1);
      $(this).toggleClass('lead-surplus', count(programmers, 'lead') > 1);
      $(this).toggleClass('trainee-missing', count(programmers, 'trainee') < 1);
      $(this).toggleClass('trainee-surplus', count(programmers, 'trainee') > 1);
    });
  }

  // I cannot fathom why this doesn't exist in underscore.
  function count(array, element){
    return _.filter(array, function(elem){
      return elem === element;
    }).length;
  }

  function programmerDropped(event, ui){
    var teamName = $(this).parent().data('name');
    var programmer = ui.draggable;
    programmer.data('team-name', teamName);
    checkTeams();
  }

  function setProgrammerTeam(){
    var teamName = $(this).parents('.team').data('name');
    $(this).data('team-name', teamName);
  }

  function toggleLead(){
    $(this).toggleClass('lead');
    checkTeams();
  }

  $('.programmer').draggable().each(setProgrammerTeam);
  $('.programmer:not(.in-training)').dblclick(toggleLead);
  $('.team .container').droppable({ drop: programmerDropped });
  checkTeams();
});
