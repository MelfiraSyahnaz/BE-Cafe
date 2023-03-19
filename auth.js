// const jwt = require("jsonwebtoken"); //import library jwt
// const SECRET_KEY = "UKK_Cafe_Kasir"; //inisialisasi secret key untuk jwt
// auth = (req, res, next) => { //inisialisasi fungsi auth
//   let header = req.headers.authorization; //mengambil token dari header
//   let token = header && header.split(" ")[1];

//   // deklarasi jwt header
//   let jwtHeader = {
//     algorithm: "HS256",
//   };
//   if (token == null) { //jika token tidak ada
//     res.status(401).json({ message: "Unauthorized" }); //mengembalikan pesan unauthorized
//   } else { //jika token ada
//     jwt.verify(token, SECRET_KEY, jwtHeader, (error, user) => { //verifikasi token
//       if (error) { //jika token tidak valid
//         res.status(401).json({ //mengembalikan pesan invalid token
//           message: "Invalid token",
//         });
//       } else { //jika token valid
//         next(); //melanjutkan proses
//       }
//     });
//   }
// };

// module.exports = auth; //export fungsi auth

const jwt = require("jsonwebtoken")
const SECRET_KEY = "UKK_Cafe_Kasir"

auth = async (req, res, next) => {
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]

    let jwtHeader = {
        algorithm: "HS256"
    }
    if(token == null){
        res.status(401).json({ message: "Unauthorized"})
    }else{
        let decodedToken;
        try{
            decodedToken = await jwt.verify(token, SECRET_KEY)
        }catch(error){
            if (error instanceof jwt.TokenExpiredError){
                return res.status(401).json({
                    message: "token expired",
                    err: error
                })
            }
            return res.status(401).json({
                message: "invalid token",
                err: error
            })
        }
        req.userData = decodedToken
        next()
    }
}



module.exports = auth