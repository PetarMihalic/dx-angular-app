export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Dashboard',
    path: '/pages/dashboard',
    icon: 'smalliconslayout',
    items: [
      {
        text: 'Overview',
        path: '/overview'
      },
      {
        text: 'Contact center',
        path: '/contact_center'
      },
      {
        text: 'Tasks and calendar',
        path: '/tasks_and_calendar'
      }
    ]
  },
  {
    text: 'Tickets',
    path: '/pages/tickets',
    icon: 'textdocument',
    items: [
      {
        text: 'My tickets',
        path: '/my_tickets',
        count: 4
      },
      {
        text: 'My team',
        path: '/my_team',
        count: 25
      },
      {
        text: 'High priority',
        path: '/high',
        count: 3
      },
      {
        text: 'SLA reached',
        path: '/sla',
        count: 1
      },
      {
        text: 'Older than 5 days',
        path: '/older',
        count: 2
      }
    ]
  },
  {
    text: 'Accounts',
    path: '/pages/accounts',
    icon: 'group'
  },
  {
    text: 'Contacts',
    path: '/pages/contacts',
    icon: 'tel'
  }
];
