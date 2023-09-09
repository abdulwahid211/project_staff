import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const PasswordHash = async (newPassword: string): Promise<string> => {
    const securePassword = await bcrypt.hash(newPassword, saltRounds);
    return securePassword;
}

export const ComparePassword = async (userPassword: string, hash: string): Promise<Boolean> => {
    const results = await bcrypt.compare(userPassword,hash);
    return results;
}