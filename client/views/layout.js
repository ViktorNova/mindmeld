Template.layout.rendered = function() {
    new GoogleAnalytics('UA-43791015-1');

    var uv=document.createElement('script');
    uv.type='text/javascript';
    uv.async=true;
    uv.src='//widget.uservoice.com/F1y4PGuCWDka3zEzhqFNeQ.js';
    var s=document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(uv,s);

    UserVoice = window.UserVoice || [];
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
}
 
GoogleAnalytics = function(code) {
    var _gaq = window._gaq || [];
    _gaq.push(['_setAccount', code]);
    _gaq.push(['_trackPageview']);
    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
};