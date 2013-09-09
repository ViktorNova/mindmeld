Template.userVoice.rendered = function() {
    var uv=document.createElement('script');
  uv.type='text/javascript';
  uv.async=true;
  uv.src='//widget.uservoice.com/F1y4PGuCWDka3zEzhqFNeQ.js';
  var s=document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(uv,s);

  UserVoice = window.UserVoice || [];

  setTimeout(function() {
    UserVoice.push(['showTab', 'classic_widget', {
      mode: 'feedback',
      primary_color: '#978057',
      link_color: '#007dbf',
      forum_id: 221775,
      tab_label: 'Feedback',
      tab_color: '#978057',
      tab_position: 'middle-right',
      tab_inverted: false
    }]);
  }, 0);
}