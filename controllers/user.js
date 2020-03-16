const User = require("../models/user");
const Mail = require("../models/mail");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
    process.env.SDMAILKEY
);const fs = require("fs");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: "User not found"});
        }
        req.profile = user;
        next();
    });
};

exports.userByIdGet = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: " User not found"});
        }
        req.user = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => {
    User.findOneAndUpdate({
        _id: req.profile._id
    }, {
        $set: req.body
    }, {
        new: true
    }, (err, user) => {
        if (err) {
            return res.status(400).json({error: "You are not allowed to perform this action"});
        }
        user.hashed_password = undefined;
        user.slat = undefined;
        res.json(user);
    });
};

exports.update2 = (req, res) => {
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $set: req.body
    }, {
        new: true
    }, (err, user) => {
        if (err) {
            return res.status(400).json({error: "You are not allowed to perform this action"});
        }
        user.hashed_password = undefined;
        user.slat = undefined;
        res.json(user);
    });
};

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    User.find().select("-hashed_password").select("-salt").sort([[sortBy, order]]).exec((err, users) => {
        if (err) {
            return res.status(400).json({error: "Users not found"});
        }
        res.json(users);
    });
};

exports.allUsers = (req, res) => {
    console.log(req.mail);
    User.find().select("-hashed_password").select("-salt").exec((err, users) => {
        if (err) {
            return res.status(400).json({error: "Users not found"});
        }

        for (let val of users) {
            let subject = req.mail.subject;
            let message = req.mail.message;
            var filePath = req.mail.file.path;
            var fileName = req.mail.file.name;
            var contentType = req.mail.file.contentType;

            pathToAttachment = `${filePath}`;
            attachment = fs.readFileSync(pathToAttachment).toString("base64");

            const emailData = {
                to: `${
                    val.email
                }`,
                from: "afasina@nasdng.com",
                subject: `${subject}`,
                html: `
            <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f9fafc" style="background-color:rgb(249,250,252)">

    <tbody><tr style="display:none!important;font-size:1px"><td></td><td></td></tr><tr>
        <td align="center" valign="top">
        
            <table border="0" cellpadding="0" cellspacing="0" width="590" class="m_-61096145151473185templateContainer" style="max-width:590px!important;width:590px">
        <tbody><tr>

        <td align="center" valign="top">

            <table class="m_-61096145151473185rnb-del-min-width" width="100%" cellpadding="0" border="0" cellspacing="0" style="min-width:590px" name="Layout_0" id="m_-61096145151473185Layout_0">
                <tbody><tr>
                    <td class="m_-61096145151473185rnb-del-min-width" valign="top" align="center" style="min-width:590px">
                        <table width="100%" cellpadding="0" border="0" height="38" cellspacing="0">
                            <tbody><tr>
                                <td valign="top" height="38">
                                    <img width="20" height="38" style="display:block;max-height:38px;max-width:20px" alt="" src="https://ci5.googleusercontent.com/proxy/glHDYRNEXduZXCYgax_OHhqgIci0KGFWhgQ8c88MBFMhHXKYqMPWT0co_h3dKY7mBYECh1iOfjVoU0X2kR_wNvRz05QBt9zzaWRvjwBuFcKMHwm9UDCStEdPfaLYXUN3MT7dVDna1nj4Wv0_UbSwnnpiRQ8BjP4ZzDvmoo9_P28X_anL-o2HTdAm_w2ODbC9xd2Rx_HqK-RkwuCQyd9m8F_cwQU9eaixZBPP7FSLzyH6VgqHmVGraKtyfIV_1hi3CYy2fEusl9ILkKfDJ_UhADjyfpMhqQTS6z8IWplqN_LQ045J6Al99W1zZC_SuOyWdmPOoWor2wZkX8XDTolKaVTDXuKkjIH2pTHSTd0d1Co5ddFCM6daxwjkTfD-YoY93GV2QryQtBRbHeYaasEMyl3IDXKDgtY3QwFqNqaJhv4=s0-d-e1-ft#http://47c9c.img.ag.d.sendibm3.com/im/2446240/15fd9f264001efa0668072cabf04073d203e1c628b776e87506daf3661b832d6.gif?e=eaBqR4IQly3LiiJqxvjRKi4DOi_3KGy-Ri1GxxQhUVX4fOUzZfljBENzhCF3Cg5qXKqk0OyY-XHexDM-jmkMtiSdZvbRRbtuPRLspvQvpOMxbiYKSbTVLS-jCX0lN1qDTM4LqKTKoFEjuNlmH2UDUCajsa8zqeYRBp9ZSbLd7ffaCGuXdEWYVXE" class="CToWUd">
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            </td>
    </tr><tr>

        <td align="center" valign="top">

            <div style="background-color:rgb(255,255,255);border-radius:0px">
                
                
                
                
                <table class="m_-61096145151473185rnb-del-min-width" width="100%" cellpadding="0" border="0" cellspacing="0" style="min-width:590px" name="Layout_6" id="m_-61096145151473185Layout_6">
                <tbody><tr>
                    <td class="m_-61096145151473185rnb-del-min-width" align="center" valign="top" style="min-width:590px">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="m_-61096145151473185rnb-container" bgcolor="#ffffff" style="background-color:rgb(255,255,255);border-radius:0px;padding-left:20px;padding-right:20px;border-collapse:separate">
                            <tbody><tr>
                                <td height="20" style="font-size:1px;line-height:0px">&nbsp;</td>
                            </tr>
                            <tr>
                                <td valign="top" align="left">
                                    <table width="100%" cellpadding="0" border="0" align="center" cellspacing="0">
                                        <tbody><tr>
                                            <td valign="top" align="center">
                                                <table cellpadding="0" border="0" align="left" cellspacing="0" class="m_-61096145151473185logo-img-center"> 
                                                    <tbody><tr>
                                                        <td valign="middle" align="center" style="line-height:1px">
                                                            <div style="border-top:0px None #000;border-right:0px None #000;border-bottom:0px None #000;border-left:0px None #000;display:inline-block" cellspacing="0" cellpadding="0" border="0"><div><a style="text-decoration:none" href="http://47c9c.r.ag.d.sendibm3.com/mk/cl/f/3Yldga7Mc95aruzbZjqaZ1qVfb5YXGb402yuKwjWcATAg9nub1rMK9xArYt1I4lfa2HlhWDg49-DIDaaXjgbCqfWeeZucOsC1OxlElWwEgwvzoDyb-lfPIcPrnfLzq4ZJtJLSPWUWBGxe1Gr9COg62LWEEY" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://47c9c.r.ag.d.sendibm3.com/mk/cl/f/3Yldga7Mc95aruzbZjqaZ1qVfb5YXGb402yuKwjWcATAg9nub1rMK9xArYt1I4lfa2HlhWDg49-DIDaaXjgbCqfWeeZucOsC1OxlElWwEgwvzoDyb-lfPIcPrnfLzq4ZJtJLSPWUWBGxe1Gr9COg62LWEEY&amp;source=gmail&amp;ust=1583929089887000&amp;usg=AFQjCNF-GoLXZyWZ49Ey0zTpRl-KPVSghA"><img width="141" vspace="0" hspace="0" border="0" alt="NASD Plc" style="float:left;max-width:141px" class="m_-61096145151473185rnb-logo-img CToWUd" src="https://nasdng.com/wp-content/uploads/2020/02/logo.png"></a></div>
                                                            </div></td>
                                                    </tr>
                                                </tbody></table>
                                                </td>
                                        </tr>
                                    </tbody></table></td>
                            </tr>
                            <tr>
                                <td height="20" style="font-size:1px;line-height:0px">&nbsp;</td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
                
                
            
        </div></td>
    </tr><tr>

        <td align="center" valign="top">

            <div style="background-color:rgb(255,255,255);border-radius:0px">
            
                
                
                
                <table class="m_-61096145151473185rnb-del-min-width" width="100%" cellpadding="0" border="0" cellspacing="0" style="min-width:100%" name="Layout_7">
                <tbody><tr>
                    <td class="m_-61096145151473185rnb-del-min-width" align="center" valign="top">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="m_-61096145151473185rnb-container" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding-left:20px;padding-right:20px;border-collapse:separate;border-radius:0px;border-bottom:0px none rgb(200,200,200)">

                                        <tbody><tr>
                                            <td height="20" style="font-size:1px;line-height:0px">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td valign="top" align="left">

                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                    <tbody><tr>
                                                        <th class="m_-61096145151473185rnb-force-col" style="text-align:left;font-weight:normal;padding-right:0px" valign="top">

                                                            <table border="0" valign="top" cellspacing="0" cellpadding="0" width="100%" align="left" class="m_-61096145151473185rnb-col-1">

                                                                <tbody><tr>
                                                                    <td class="m_-61096145151473185content-spacing" style="font-size:14px;font-family:Arial,Helvetica,sans-serif,sans-serif;color:#3c4858;line-height:21px">
                                                                    <div>


                                                                          <div>
                                                                     
                                                                       ${message}

                                                                    </div>
</td>
                                                                </tr>
                                                                </tbody></table>

                                                            </th></tr>
                                                </tbody></table></td>
                                        </tr>
                                        <tr>
                                            <td height="20" style="font-size:1px;line-height:0px">&nbsp;</td>
                                        </tr>
                                    </tbody></table>
                    </td>
                </tr>
            </tbody></table>
                
                

            </div></td>
    </tr><tr>

        <td align="center" valign="top">

            <div style="background-color:rgb(249,250,252)">
                
                <table class="m_-61096145151473185rnb-del-min-width m_-61096145151473185rnb-tmpl-width" width="100%" cellpadding="0" border="0" cellspacing="0" style="min-width:590px" name="Layout_5" id="m_-61096145151473185Layout_5">
                    <tbody><tr>
                        <td class="m_-61096145151473185rnb-del-min-width" align="center" valign="top" bgcolor="#f9fafc" style="min-width:590px;background-color:rgb(249,250,252)">
                            <table width="590" class="m_-61096145151473185rnb-container" cellpadding="0" border="0" align="center" cellspacing="0">
                                <tbody><tr>
                                    <td height="20" style="font-size:1px;line-height:0px">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td valign="top" style="font-size:14px;font-family:Arial,Helvetica,sans-serif;color:#888888" align="left">

                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tbody><tr>
                                                <th class="m_-61096145151473185rnb-force-col" style="padding-right:20px;padding-left:20px;font-weight:normal" valign="top">

                                                    <table border="0" valign="top" cellspacing="0" cellpadding="0" width="264" align="left" class="m_-61096145151473185rnb-col-2 m_-61096145151473185rnb-social-text-left" style="border-bottom:0">

                                                        <tbody><tr>
                                                            <td valign="top">
                                                                <table cellpadding="0" border="0" align="left" cellspacing="0" class="m_-61096145151473185rnb-btn-col-content">
                                                                    <tbody><tr>
                                                                        <td valign="middle" align="left" style="font-size:14px;font-family:Arial,Helvetica,sans-serif;color:#888888;line-height:16px" class="m_-61096145151473185rnb-text-center">
                                                                            <div><div><strong>NASD PLC</strong>,</div>

<div>9th Floor, UBA House,
57 Marina, Lagos State,
Nigeria<br>
<a href="marketoperations@nasdng.com" style="text-decoration:underline;color:rgb(102,102,102)" target="_blank">marketoperations@nasdng.com</a></div>
</div>
                                                                        </td></tr>
                                                                </tbody></table>
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </th><th class="m_-61096145151473185rnb-force-col m_-61096145151473185rnb-social-width" valign="top" style="padding-right:15px">

                                                    <table border="0" valign="top" cellspacing="0" cellpadding="0" width="246" align="right" class="m_-61096145151473185rnb-last-col-2">

                                                        <tbody><tr>
                                                            <td valign="top">
                                                                <table cellpadding="0" border="0" cellspacing="0" class="m_-61096145151473185rnb-social-align" style="float:right" align="right">
                                                                    <tbody><tr>
                                                                        <td valign="middle" class="m_-61096145151473185rnb-text-center" width="205" align="right">
                                                                            <div class="m_-61096145151473185rnb-social-center">
                                                                            <table align="left" style="float:left;display:inline-block" border="0" cellpadding="0" cellspacing="0">
                                                                            <tbody><tr>
                                                                                    <td style="padding:0px 5px 5px 0px" align="left">
                                                                            <span style="color:#ffffff;font-weight:normal">
                                                                                <a href="https://www.facebook.com/NASDsocial/" class="CToWUd"></a></span>
                                                                            </td></tr></tbody></table>
                                                                            </div><div class="m_-61096145151473185rnb-social-center">
                                                                            <table align="left" style="float:left;display:inline-block" border="0" cellpadding="0" cellspacing="0">
                                                                            <tbody><tr>
                                                                                    <td style="padding:0px 5px 5px 0px" align="left">
                                                                            <span style="color:#ffffff;font-weight:normal">
                                                                                <a href="https://twitter.com/NASDNG" class="CToWUd"></a></span>
                                                                            </td></tr></tbody></table>
                                                                            </div><div class="m_-61096145151473185rnb-social-center">
                                                                            <table align="left" style="float:left;display:inline-block" border="0" cellpadding="0" cellspacing="0">
                                                                            <tbody><tr>
                                                                                    <td style="padding:0px 5px 5px 0px" align="left">
                                                                            <span style="color:#ffffff;font-weight:normal">
                                                                                <a href="https://www.linkedin.com/in/nasd-otc-securities-exchange-8a6632a6/" class="CToWUd"></a></span>
                                                                            </td></tr></tbody></table>
                                                                            </div><div class="m_-61096145151473185rnb-social-center">
                                                                            <table align="left" style="float:left;display:inline-block" border="0" cellpadding="0" cellspacing="0">
                                                                            <tbody><tr>
                                                                                    <td style="padding:0px 5px 5px 0px" align="left">
                                                                            <span style="color:#ffffff;font-weight:normal">
                                                                                <a href="#" class="CToWUd"></a></span>
                                                                            </td></tr></tbody></table>
                                                                            </div><div class="m_-61096145151473185rnb-social-center">
                                                                            <table align="left" style="float:left;display:inline-block" border="0" cellpadding="0" cellspacing="0">
                                                                            <tbody><tr>
                                                                                    <td style="padding:0px 5px 5px 0px" align="left">
                                                                            <span style="color:#ffffff;font-weight:normal">
                                                                                <a href="#" class="CToWUd"></a></span>
                                                                            </td></tr></tbody></table>
                                                                            </div></td>
                                                                    </tr>
                                                                </tbody></table>
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </th></tr>
                                        </tbody></table></td>
                                </tr>
                                <tr>
                                    <td height="20" style="font-size:1px;line-height:0px">&nbsp;</td>
                                </tr>
                            </tbody></table>

                        </td>
                    </tr></tbody></table>
                
            </div></td>
    </tr><tr>

        <td align="center" valign="top">

            <table class="m_-61096145151473185rnb-del-min-width" width="100%" cellpadding="0" border="0" cellspacing="0" style="min-width:590px" name="Layout_" id="m_-61096145151473185Layout_">
                <tbody><tr>
                    <td class="m_-61096145151473185rnb-del-min-width" valign="top" align="center" style="min-width:590px">
                        <table width="100%" cellpadding="0" border="0" height="30" cellspacing="0">
                            <tbody><tr>
                                <td valign="top" height="30">
                                    <img width="20" height="30" style="display:block;max-height:30px;max-width:20px" alt="" src="https://ci5.googleusercontent.com/proxy/7aT_0VAGwDB_e4jyoyA_wDzQvfWBuDKl-NEQ7ZAKkNe9yMIN-O_M5Tb0aajcDJAwjUsVa5k01lOfQcrwnxLqmuZAufMc3fjL9rQ1U8_1R48I7Ie6oGXtmB1IzqXinmPcNSkFA_GHyvMCfeJaf7UA952ZH6_1OtopvILjKYjbuE-20FN6SsBqECRUxO9qaO85mGYAVlyXNVgPxKCfId83yj34bHZV-a-_mnPMZglq4BBY8Py8Im1Rp2jLIK4pk4RJJlcbaKauDcJlCx82c85jeudlZHY9PC1471yn21dPgkQZVN30Nieo1BUrPjOCR7pzI0ghTRUzZ9dKFAB95po10zKAzQA3aHbwtdGd6DN51hUyOM6LZo6_MENXzv0PcfGR7blQxZlRKCtiKbhtOwQPfj6ebydmnkgOJRROWw_RK44=s0-d-e1-ft#http://47c9c.img.ag.d.sendibm3.com/im/2446240/15fd9f264001efa0668072cabf04073d203e1c628b776e87506daf3661b832d6.gif?e=Q7xPnfsFpnWFbGTrXnxrrGB5cYosg6uuHdVnCA2ytk9Ltc6O28KvnwmifBu1qR-00NU3a1Us5oI1tgS-SHcswiABv8EdGCcCh0h0ZW_4uK9YSBd6I7IJnIiUyiEfeNNxWk66Zh_usapN9JGk35Td31dOZZU5I9gTLVtCAmHzonhkJJx2KidjG-Q" class="CToWUd">
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            </td>
    </tr><tr>

        <td align="center" valign="top">

            <div style="background-color:rgb(249,250,252)">
                
                <table class="m_-61096145151473185rnb-del-min-width m_-61096145151473185rnb-tmpl-width" width="100%" cellpadding="0" border="0" cellspacing="0" style="min-width:590px" name="Layout_3" id="m_-61096145151473185Layout_3">
                    <tbody><tr>
                        <td class="m_-61096145151473185rnb-del-min-width" align="center" valign="top" bgcolor="#f9fafc" style="min-width:590px;background-color:#f9fafc;text-align:center">
                            <table width="590" class="m_-61096145151473185rnb-container" cellpadding="0" border="0" align="center" cellspacing="0" bgcolor="#f9fafc" style="padding-right:20px;padding-left:20px;background-color:rgb(249,250,252)">
                                <tbody><tr>
                                    <td height="10" style="font-size:1px;line-height:0px">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="font-size:14px;color:#888888;font-weight:normal;text-align:center;font-family:Arial,Helvetica,sans-serif"><div>This email was sent to <a href="${
                    val.email
                }" target="_blank">${
                    val.email
                }</a>
<div>You received this email because you are registered with NASD Plc</div>

<div>&nbsp;</div>
</div>
</div>
                                       
                                    </td></tr>
                                <tr>
                                    <td height="10" style="font-size:1px;line-height:0px">&nbsp;</td>
                                </tr>
                               <tr>
                                    <td height="10" style="font-size:1px;line-height:0px">&nbsp;</td>
                                </tr></tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                
            </div></td>
    </tr><tr>

        <td align="center" valign="top">

            <div style="background-color:rgb(249,250,252)">
                
                <table class="m_-61096145151473185rnb-del-min-width m_-61096145151473185rnb-tmpl-width" width="100%" cellpadding="0" border="0" cellspacing="0" style="min-width:590px" name="Layout_4" id="m_-61096145151473185Layout_4">
                    <tbody>
                    
                                <tr>
                                    <td style="font-size:14px;color:#888888;font-weight:normal;text-align:center;font-family:Arial,Helvetica,sans-serif">
                                        <div>© 2020 NASD Plc</div>
                                    </td></tr>
                                <tr>
                                    <td height="20" style="font-size:1px;line-height:0px">&nbsp;</td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                
            </div></td>
    </tr></tbody></table>
            
                        </td>
        </tr>
        </tbody></table>
        `,
                attachments: [
                    {
                        filename: fileName,
                        content: attachment,
                        type: contentType,
                        disposition: "attachment"
                    }
                ]
            };
            sgMail
            .send(emailData)
            .then(sent => console.log('SENT 2 >>>'))
            .catch(err => console.log('ERR 2 >>>', err));
        }
        res.json(users);
    });
};

exports.remove = (req, res) => {
    let user = req.user;
    user.remove((err, dletedUser) => {
        if (err) {
            return res.status(400).json({error: errorHandler(err)});
        }
        res.json({message: "User deleted succesfully"});
    });
};

