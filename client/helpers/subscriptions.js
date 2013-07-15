Meteor.subscribeWithPagination('userTeams', Meteor.userId(), 5);
Meteor.subscribeWithPagination('userProjects', Meteor.userId(), 5);
Meteor.subscribeWithPagination('userFeatures', Meteor.userId(), 5);
//Meteor.subscribeWithPagination('userIssues', Meteor.userId(), 5);

allIssuesNotStartedHandle = Meteor.subscribeWithPagination('allIssuesNotStarted', Meteor.userId(), 2);
// allIssuesInProgressHandle = Meteor.subscribeWithPagination('allIssuesByStatus', Meteor.userId(), 1, 5);
// allIssuesCompletedHandle = Meteor.subscribeWithPagination('allIssuesByStatus', Meteor.userId(), 2, 5);
// allIssuesCancelledHandle = Meteor.subscribeWithPagination('allIssuesByStatus', Meteor.userId(), 3, 5);

Deps.autorun(function() {
  Meteor.subscribe('teamMembers', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamNotifications', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMovements', Meteor.userId(), Session.get('currentTeamId'));
  // Meteor.subscribe('teamRankedIssues', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamTags', Meteor.userId(), Session.get('currentTeamId'));

});


// <!--           <table class="table table-striped">
//             <thead>
//               <tr>
//                 <th>Issues In Progress {{allIssuesInProgressCount}}</th>
//                 <th>Started</th>
//               </tr>
//             </thead>
//             {{#if allIssuesInProgressReady}}
//               {{#each allIssuesInProgress}}
//                 {{> issueInTable}}
//               {{/each}}
//               {{#unless allIssuesInProgressCount}}          
//                 <tr>
//                   <td colspan="2"><div class="text-center"><em>&#8211;No Issues In Progress&#8211;</em></div></td>
//                 </tr>
//               {{/unless}}
//               {{#unless allIssuesInProgressLoaded}}
//                 <tr>
//                   <td colspan="2"><div class="text-center"><a id="in-progress-load-more" href="">Load more</a></td>
//                 </tr>
//               {{/unless}}
//             {{else}}
//               <tr>
//                 <td colspan="2"><div class="text-center"><div class="spinner-space">{{> spinner}}</div></td></td>
//               </tr>
//             {{/if}}
//             </table>
//             <table class="table table-striped">
//             <thead>
//               <tr>
//                 <th>Issues Completed</th>
//                 <th>Completed</th>
//               </tr>
//             </thead>
//             {{#if allIssuesCompletedReady}}
//               {{#each allIssuesCompleted}}
//                 {{> issueInTable}}
//               {{/each}}
//               {{#unless allIssuesCompletedCount}}          
//                 <tr>
//                   <td colspan="2"><div class="text-center"><em>&#8211;No Issues Completed&#8211;</em></div></td>
//                 </tr>
//               {{/unless}}
//               {{#unless allIssuesCompletedLoaded}}
//                 <tr>
//                   <td colspan="2"><div class="text-center"><a id="completed-load-more" href="">Load more</a></td>
//                 </tr>
//               {{/unless}}
//             {{else}}
//               <tr>
//                 <td colspan="2"><div class="text-center"><div class="spinner-space">{{> spinner}}</div></td></td>
//               </tr>
//             {{/if}}
//           </table>
//           <table class="table table-striped">
//             <thead>
//               <tr>
//                 <th>Issues Cancelled</th>
//                 <th>Cancelled</th>
//               </tr>
//             </thead>
//             {{#if allIssuesCancelledReady}}
//               {{#each allIssuesCancelled}}
//                 {{> issueInTable}}
//               {{/each}}
//               {{#unless allIssuesCancelledCount}}          
//                 <tr>
//                   <td colspan="2"><div class="text-center"><em>&#8211;No Issues Cancelled&#8211;</em></div></td>
//                 </tr>
//               {{/unless}}
//               {{#unless allIssuesCancelledLoaded}}
//                 <tr>
//                   <td colspan="2"><div class="text-center"><a id="cancelled-load-more" href="">Load more</a></td>
//                 </tr>
//               {{/unless}}
//             {{else}}
//               <tr>
//                 <td colspan="2"><div class="text-center"><div class="spinner-space">{{> spinner}}</div></td></td>
//               </tr>
//             {{/if}}
//           </table>
//  -->
