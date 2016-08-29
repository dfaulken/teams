$(document).ready(function(){
  function toggleLead(){
    $(this).toggleClass('lead');
  }

  function programmerDropped(event, ui){
    var teamName = $(this).parent().data('name');
    var programmer = ui.draggable;
    programmer.data('team-name', teamName);
  }

  function setProgrammerTeam(){
    var teamName = $(this).parents('.team').data('name');
    $(this).data('team-name', teamName);
  }

  $('.programmer').draggable().each(setProgrammerTeam);
  $('.programmer:not(.in-training)').dblclick(toggleLead);
  $('.team .container').droppable({ drop: programmerDropped });
});
