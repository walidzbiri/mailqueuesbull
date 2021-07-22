- docker run --name redis-container -p 3333:6379 -d redis
- Run node app.js
- Make a post http request to http://localhost:5000/send-mail with a url-from-encoded
Not a json
{
  from: 'Fred Foo <foo@example.com>',      
  to: '"bar@example.com, baz@example.com"',
  subject: 'Hello',
  text: 'How are u man ?',
  html: '<b> How are u man ? </b>'
}