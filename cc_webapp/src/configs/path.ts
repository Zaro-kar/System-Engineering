export const paths = {
   app: {
      home: {
         path: '/home',
         getHref: () => '/home',
      },
      sessionClosed: {
         path: '/session-closed',
         getHref: () => '/session-closed',
      },
      presentation: {
         path: '/presentation/:session_id',
         getHref: (session_id: string, edit: boolean = false) =>
            `/presentation/${session_id}?edit=${edit}`,
      },
      voting: {
         path: '/voting/:session_id',
         getHref: (session_id: string) => `/voting/${session_id}`,
      },
   },
};
