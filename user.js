const fs = require('fs')



const userRequestHandler =(req, res) => 
  {
    console.log(req.url,req.method);
  if(req.url === '/'){
    res.setHeader('Content-Type','text/html')
    res.write(`<html>
      <head></head>
      <body>
          <form action='/submit-details' method='POST'>
          <label>Name</label>
          <input type='text' placeholder="Enter you name" name='username'/>
          <br/>
          <h5>Gender:</h5>
          <label for='maleId'>Male</label>
          <input type="radio" name="gender" value="male" id="maleId"/>
          <label for='femaleId'>Female</label>
          <input type="radio" name="gender" value="Female" id="femaleId"/>
          <br/>
           <label for='mobileId'>Mobile No: </label>
          <input type="number" name="mobile"  id="mobileId"/>
          <br/>
          <input type="submit" value="Submit"/>
          </form>
      </body>
      </html>`)
      return res.end();
  }else if(req.url.toLowerCase() === '/submit-details' && req.method == 'POST'){
    const body=[]
    req.on('data',chunk=>{
      console.log(chunk);
      body.push(chunk)
    })
    req.on('end',()=>{
      const fullBody = Buffer.concat(body).toString()
      console.log(fullBody)
      const params = new URLSearchParams(fullBody)
      const bodyObject=Object.fromEntries(params) 
      fs.writeFileSync('user.txt',JSON.stringify(bodyObject));

    });
    
    res.statusCode=302;
    res.setHeader('Location','/')
    
  }
  res.setHeader('Content-Type','text/html')
  res.write(`
    <html>
    <head><title>Complete Coding</title></head>
    <body>
        <h1>Like Share Subscribe</h1>
    </body>
</html>`)
  res.end()

  

};

module.exports = userRequestHandler



