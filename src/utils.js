import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.resolve(__dirname,".env")});

import jwt from 'jsonwebtoken';

/**
 * @author alwaysbaguette
 * @description 랜점숫자를 만들어준다.
 * @param {*} list 
 * @param {*} range 
 */
const generateRandomNo = (list,range) =>{
    let randomNo = 0;
    let rangeValue = range || 10;
    if(list) {
        const length = list.length;
        randomNo = Math.floor(Math.random()*length);
    }
    else{
        randomNo = Math.floor(Math.random()*rangeValue);
    }
    return randomNo;
}

const sendMail = email => {
    const options = {
        auth:{
            api_user : process.env.SENDGRID_USERNAME,
            api_key : process.env.SENDGRID_PASSWORD
        }
    }

    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

const sendSecretMail = (adress, secret) => {
    const email ={
        from : "alwaysbaguette@gmail.com",
        to : adress,
        subject : "🔓Login Secret for Prismagram🔓",
        html : `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    }
    return sendMail(email);
}

const generateToken = id =>jwt.sign({id},process.env.JWT_SECRET);

export default {
    generateRandomNo,
    sendSecretMail,
    generateToken
}