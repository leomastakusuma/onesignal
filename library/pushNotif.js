var self = module.exports = {
    config : function(params){
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic OTNmMzU0ZjQtN2Y0YS00NzVhLTgzZGQtMDg2MGNiMDg4M2Fk"
        };
      
        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
      
        var https = require('https');
        var req = https.request(options, function(res) {
            res.on('data', function(params) {
                console.log("Onesignal Success : ");  
                console.log(JSON.parse(params));            
            });
        });
      
        req.on('error', function(e) {
            console.log("Onesignal ERROR : " + e);
        });
      
        req.write(JSON.stringify(params));
        req.end();
    },
    pushTime : function(){
        const params = {
            'contents_id' : "Apakah kamu melupakan sesuatu ?, Yuk kembali tracking aktivitas keluargamu dengan fitur Family Guard",
            'contents_en' : "Apakah kamu melupakan sesuatu ?, Yuk kembali tracking aktivitas keluargamu dengan fitur Family Guard",
            'heading_id'  : "BUDDYGUARD",
            'heading_en'  : "BUDDYGUARD"
        }
        var message = {
            app_id: "d0016e5b-144b-4cf0-b21a-ca243d73ebcb",
            contents: {"id": params.contents_id ,"en":params.contents_en},
            headings: {"id": params.heading_id,"en":params.heading_en},
            content_available : 1,
            // ios_badgeType : "Increase",
            // ios_sound : 'notification2.m4r',
            // android_sound :'notif_sound',
            // ios_badgeCount : 1,
            // included_segments: ["Active Users"]   ,
            // include_player_id:["a1a63daf-45a3-4cd9-b48c-102e2d941867"],
           
            content_available : 1,
            // include_player_ids :["a1a63daf-45a3-4cd9-b48c-102e2d941867"],
            filters :[{
                "field": "tag", "key": "jack","relation": "=","value":"id"
            }]
        
        };
        self.config(message)    
    }
}
