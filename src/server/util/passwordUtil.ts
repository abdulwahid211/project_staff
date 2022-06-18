import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const PasswordHash = async(newPassword: string) : Promise<string> => {
    const securePassword = await bcrypt.hash(newPassword, saltRounds); 
    return securePassword;
}