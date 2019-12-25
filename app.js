let express = require('express')
const request = require('request');
// Initialize the app
const axios = require('axios');
 
let app = express();
// Setup server port
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.get('/', function(req, res) {
    res.render('index');
});
//GỦI MAIL
app.get('/send-mail', function(req, res) {
    // var mailchimpInstance   = 'us20';
    // var listUniqueId        = 'b6a82d89f0';
    // var idcampaign = 'fee2308e3f';
    // var mailchimpApiKey     = 'e89d0ca2e1728bc33d609ec5c485be21-us20-us6';
    //ee394fc74064b6b78beeea3b3851fea6-us4
    //==============tai khoan huynhvinh    API key :ee394fc74064b6b78beeea3b3851fea6-us4 
    //==============tai khoan luc de       API key : e89d0ca2e1728bc33d609ec5c485be21-us20
    //fee2308e3f
    //GỬI  MAIL HÀN LOẠT
    // Tạo list đã share ở postman API
    let campaignsID = '5ec4ac59ae'// tai khoan huynhvinh
    request.post({
        url: `https://us4.api.mailchimp.com/3.0/campaigns/${campaignsID}/actions/send`,
        headers: {  'Authorization': 'Basic ee394fc74064b6b78beeea3b3851fea6-us4'}
     },function(error, response, body){
        //const data = JSON.parse(body);
        console.log(response);
        return  res.json(response);
       // const DATA=data;
    })
});
//TẠO DANH SÁCH NGƯỜI NHẬN MAIL
app.post('/create-list', function(req, res) {
    //api huynhvinh
    axios.defaults.headers.common['Authorization'] = 'Basic ee394fc74064b6b78beeea3b3851fea6-us4';
//thông tin  lists
    let body = {
        "name": "HUYNHVINH",
        "contact": {
            "company": "kof",
            "address1": "tayninh",
            "city": "hcm",
            "state": "hcm",
            "zip": "700000",
            "country": "VN"
        },
        "permission_reminder": "aaa",
        "campaign_defaults": {
            "from_name": "Sender's Name",
            "from_email": "Sender's Email Address",
            "subject": "do you know me",
            "language": "vi_VN"
        },
        "email_type_option": false
    }
    const options = {
      method: 'POST',
      headers: { 'Authorization': 'Basic ee394fc74064b6b78beeea3b3851fea6-us4' },
      data: body,
      url: 'https://us4.api.mailchimp.com/3.0/lists',
    };
    axios(options).then(function(response){
        console.log(response)
    });
})
//THÊM NGƯỜI NHẬN MAIL
app.post('/add-members-list', function(req, res) {
    let list = req.body;
    console.log(list)
   
    // var mailchimpInstance   = 'us20';
    // var listUniqueId        = 'b6a82d89f0';
    // var idcampaign = 'fee2308e3f';
    // var mailchimpApiKey     = 'e89d0ca2e1728bc33d609ec5c485be21-us20-us6';
    //==============tai khoan huynhvinh    API key :ee394fc74064b6b78beeea3b3851fea6-us4 
    //==============tai khoan luc de       API key : e89d0ca2e1728bc33d609ec5c485be21-us20
    //fee2308e3f
    let listID = '1c9c8093da';// tai khoan huynhvinh
    axios.defaults.headers.common['Authorization'] = 'Basic ee394fc74064b6b78beeea3b3851fea6-us4';
    // thêm user vào 1 list
    //tài khoản free cho tạo 1 list  tham khảo thêm .
    let body = {"members":[{"email_address": "khanhney2.dev@gmail.com", "status": "subscribed"}], "update_existing": true}
    const options = {
      method: 'POST',
      headers: { 'Authorization': 'Basic ee394fc74064b6b78beeea3b3851fea6-us4' },
      data: body,
      url: 'https://us4.api.mailchimp.com/3.0/lists/1c9c8093da',
    };
    axios(options).then(function(response){
        console.log(response)
    });
});
app.listen(port, function () {
    console.log("Running  on port " + port);
  });


// app.post('/signup', function (req, res) {
//     request
//         .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
//         .set('Content-Type', 'application/json;charset=utf-8')
//         .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
//         .send({
//           'email_address': req.body.email,
//           'status': 'subscribed',
//           'merge_fields': {
//             'FNAME': req.body.firstName,
//             'LNAME': req.body.lastName
//           }
//         })
//             .end(function(err, response) {
//               if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
//                 res.send('Signed Up!');
//               } else {
//                 res.send('Sign Up Failed :(');
//               }
//           });
// });
// app.post(`/api/district/:id`,function(error, response, body){
//     var id           =  req.params['id'];
//     request('https://thongtindoanhnghiep.co/api/district/:${id}', function(error, response, body){
//         const data = JSON.parse(body);
//         console.log(data)
//         const DATA=data;
//         res.render('huyen', { huyen:DATA } )
//     });
// });
// app.get('/api/xa/:id', (req, res) => {
//     request('https://thongtindoanhnghiep.co/api/district/2/ward', function(error, response, body){
//         const data = JSON.parse(body);
//         console.log(data)
//         res.render('xa', { xa:data } )
//     });
// })
// app.get('/api/huyen/:id', (req, res) => {

//     var id          =  req.params['id'];

//     request(`https://thongtindoanhnghiep.co/api/city/${id}/district`, function(error, response, body){
//         const data = JSON.parse(body);
//         console.log(data)
  
//         res.render('huyen', { huyen:data } )
//     });
   
// })


// request('https://thongtindoanhnghiep.co/api/city'
//  request(`https://thongtindoanhnghiep.co/api/city/${id_tinh}/distric  