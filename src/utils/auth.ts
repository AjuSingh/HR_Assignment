import jwt from 'jsonwebtoken'


export function createToken(email: string) {
    try {
        const token = jwt.sign({ email }, process.env.JWT_SECRET!)
        return token;
    } catch (err) {
        console.log('Error creating while creating token', err);
    }
}


export function validateToken(token: string) {
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return true;
    } catch (err: any) {
        console.log('Error while verifying token: ' + err.message);
        return false;
    }
}


