import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.orange.fr',
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL_USER,
        pass: process.env.AUTH_EMAIL_PASSWORD
    }
}, {
    from: 'OK Check Car <evgenyvakhrushev@orange.fr>',
});

// const transporter = nodemailer.createTransport({
//     host: 'smtp.mail.yahoo.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'evgvakh@yahoo.com',
//         pass: 'MarkUp2022!'
//     }
// }, {
//     from: 'OK Check Car <evgvakh@yahoo.com>',
// });

const mailer = (message, res) => {
    try {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                res.send(err)
            }
            res.send(info)
        })
    } catch (err) {
        res.json(err)
    }
    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
}

export const sendMail = (req, res) => {
    try {
        const message = {
            to: req.body.email,
            subject: "Your CheckCar's been created succesfully",
            html: `
            <h2>Thanks for creating your CheckCar</h2>
            <p>Your check's been created for the plate number <strong>${req.body.plate}</strong>. </br> 
            Please make sure that this plate number is correct, otherwise create a new CheckCar following the link: </p>       
            <p>Starting now you have a full access to your created document using the following link: and following credentials: </p>
            <ul>
                <li>Login: ${req.body.email}</li>
                </br>
                <li>Password: ${req.body.password}</li>
            <ul/>

            <p>Please note that you have 45 minutes to add the pictures. After this time you will not be allowed to add any photo.</p>    
            `
        }
        
        mailer(message, res)
    } catch (err) {
        res.send(err);
    }
}


