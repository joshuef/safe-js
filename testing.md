var auth = {
  name: 'sample',
  id: 'test.sample',
  version: '0.0.1',
  vendor: 'krishna',
  permissions: ['LOW_LEVEL_API']
};

safeAuth.authorise(auth).then(r => console.log(r), e => console.log(e));

safeDNS.getDns(safeAuth.getAuthToken()).then(d => console.log(d));
