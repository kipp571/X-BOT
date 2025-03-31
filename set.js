const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0JjZ210QVk0Vng3WTVPNDQ1bE9zRkJCV3VaSFFQdWt3V1JndVFXK1Axdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWFNISjR2L1RNWC8vSkw3VEZYVzFPaG95ZWk3dmp5QVY4WDB2M2I5RjB4Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPQ2tSS3A5QVhzY0RVc3FESS9DalBJdmVsZHc3RWpOZXUyVXd3QnIzYUVFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwVjRCMEwrbElwbWE5MWUvVHp3bTJORFUzdEFyYldlS3BDeW55TGZseUhNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktIeklaL2FoeEMycDY5UmFTUzAxY29NSEFpZFhYUnZqUnBiMnhRTHlBblk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhPejlGeXF0SDJFUnkrb2JsT01zUG11TERJdTI1TEpTMkJKY3ZsNDFLVDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQURyUTBvUjkrVlVzSnIwdE92amJkOUVOY2dEVXluMm1WYys2Rm5WMXhsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmZ6WTVGaFgzVGxTYjZ0bXRkWElrWnVkRDhKRVZTNGFuN3M1Yks2U09BTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im11d1pEVDJYbTdFR2h4Ry9TTXpNQ2U3TVp3eG1VTTg1aVRZZGdyY0VvMVZ5ZzA2N0JGMzdoM2d4cXAyZWdtYjRqVnNqVng3SXN3T3crRGFZRFcxcEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODEsImFkdlNlY3JldEtleSI6ImdvNzNpLzhocUpMd0NXRFlHemJMVW52bDBqTFVXSUplenlQaTM0dTN0SW89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0MTA0NDg2Mzg3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijc1REZDOUJCNTkxN0ZCNTZCQzRFM0U1OUUzMzY2NEEzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDMzOTgzMTB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDEwNDQ4NjM4N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQzIyMTg0RTVFRjk5MDMzNzY2MjE0NzIxRDJEQkIwMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQzMzk4MzEwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZelVJQk5yS1FreVlycE1RSjU3REdRIiwicGhvbmVJZCI6IjNlZDAyNGM1LWI3M2MtNGVjMS1iYTE3LWZkY2FmZWM5ODMzOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyemlnN2NpdnlXWEVvREZhUzZaVjd3dXArd3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2JheVIxMkk2V2lacXkvUm9CdzFzWmdwMjlvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZCSlZDMVNaIiwibWUiOnsiaWQiOiIyNTQxMDQ0ODYzODc6M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJLaXB0b28ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01yMGxlWUJFSmJMcUw4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjJyOXd5NUlHdjdWQXEwOGpWMGhDL1FvcmtPMnBJbGNJd0lmV2VZK0I3MTg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IktZam1aczA4d3ljK2txelZ2NUFubmNzZ09Xem1ZTStrRTdEOUhWdG1QUUFoOW55bjIwYzBZNnNUSUdWRFBQck9Ualc0d21oRTl0VHFmUmFMUCs2MEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYRm4wN1BJdmJ1NXRJd3JBU3NRYVNLaGlLZEJIR0k5NWQ0MS9GMW85NVB2a3dDYzBnOWhodFhVcDJJeFQxWHlzT245TmUzQUF4RHlUR3RUWDZ0OENBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwNDQ4NjM4NzozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRxL2NNdVNCcisxUUt0UEkxZElRdjBLSzVEdHFTSlhDTUNIMW5tUGdlOWYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDMzOTgzMDcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUEliIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Beltah254/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Beltah254",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254114141192",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    EMOJIS: process.env.EMOJIS || "👻,☺️,❤️,🦚",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "no",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by Beltah md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTOBIO: process.env.AUTOBIO || 'yes',       
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VAUSV0PFCCOSB5TX9C1F",
    EVENTS :process.env.EVENTS || "yes",
    CAPTION : process.env.CAPTION || "BELTAH-MD",
    BOT : process.env.BOT_NAME || '𝗕𝗘𝗟𝗧𝗔𝗛-𝗠𝗗',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
