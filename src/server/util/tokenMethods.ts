import * as jwt from 'jsonwebtoken';

export function generateAccessToken(username:string) {
    return jwt.sign({ username: username }, process.env.TOKEN_SECRET, { expiresIn: '2h'});
  }

  export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }