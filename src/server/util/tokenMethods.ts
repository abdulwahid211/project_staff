import * as jwt from 'jsonwebtoken';

export function GenerateAccessToken(username: string) {
  return jwt.sign({username: username}, process.env.TOKEN_SECRET, {
    expiresIn: '180000s',
  });
}

export function GenerateShortAccessToken(username: string) {
  return jwt.sign({username: username}, process.env.TOKEN_SECRET, {
    expiresIn: '120s',
  });
}

export const AuthenticateToken = (req, requireAuth = true) => {
  const header = req.req.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    return decoded;
  }

  if (requireAuth) {
    throw new Error('Valid Token is required to access resource');
  }

  return null;
};
