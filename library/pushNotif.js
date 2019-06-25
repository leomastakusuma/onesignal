var self = module.exports = {
    config : function(params){
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic MGUwYTQ2MzYtNWQ5Zi00YTdjLTk5MTctYTM1ODBhYTQ1NmVk"
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
    sendNotification : function(params){
        var dataNya = params.data.payload;
        var type    = dataNya.type ? dataNya.type :null
        var notification_id = dataNya.notification_id  ? dataNya.notification_id : 'null' 
        var notification_message = dataNya.notification_message ? dataNya.notification_message : 'null'
        var family_id = dataNya.family_id  ? dataNya.family_id : 'null'
        var family_name =  dataNya.family_name ? dataNya.family_name : 'null'
        var tour_id =  dataNya.tour_id    ? dataNya.tour_id : 'null'
        var tour_name =  dataNya.tour_name   ? dataNya.tour_name : 'null'
        var siskamling_id = dataNya.siskamling_id   ? dataNya.siskamling_id : 'null'
        var siskamling_name =  dataNya.siskamling_name    ? dataNya.siskamling_name : 'null'
        var sender_id = dataNya.userid     ? dataNya.userid : 'null'
        var sender_name = dataNya.fullname   ? dataNya.fullname : 'null'
        var sender_profile_pict = dataNya.pic_profile  ? dataNya.pic_profile : 'null'
        var sender_place_name =  'null'
        var phoneNo     = dataNya.phone_no ?  dataNya.phone_no : 'null'
        var sender_loc_lat =  dataNya.latitude    ? dataNya.latitude : 'null'
        var sender_loc_lon =  dataNya.longitude ? dataNya.longitude : 'null'
        var userid         = dataNya.isYou
        var today = new Date()
        var create_date = self.js_yyyy_mm_dd_hh_mm_ss();

        var escape =[
            userid,type,notification_id,notification_message,family_id,family_name,
            tour_id,tour_name,siskamling_id,siskamling_name,sender_id,
            sender_name,sender_profile_pict,phoneNo,sender_place_name,sender_loc_lon,sender_loc_lat,create_date]
        
        var NGN =  params.NGN;
        NGN.forEach(function(element,index){
            var escape =[
                element,type,notification_id,notification_message,family_id,family_name,
                tour_id,tour_name,siskamling_id,siskamling_name,sender_id,
                sender_name,sender_profile_pict,phoneNo,sender_place_name,sender_loc_lat,sender_loc_lon,create_date]
                var sql = "INSERT INTO tbl_push (user_id,type,notification_id,notification_message,family_id,family_name,tour_id,tour_name,siskamling_id,siskamling_name,sender_id,sender_name,sender_profile_pict,phoneNo,sender_place_name,sender_loc_lat,sender_loc_lon,create_date)"+
                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                var query = db.query(sql,escape, function(error, results,fields){
                    var id = results.insertId
                    var payloadNya = {
                        id,type,notification_id,notification_message,family_id,family_name,
                        tour_id,tour_name,siskamling_id,siskamling_name,sender_id,
                        sender_name,sender_profile_pict,phoneNo,sender_place_name,sender_loc_lon,sender_loc_lat,create_date
                    }
                    var message = {
                        app_id: "bf72dcd6-ed45-44e3-b4c3-c7f4fdf43d5f",
                        contents: {"id": params.contents_id ,"en":params.contents_en},
                        headings: {"id": params.heading_id,"en":params.heading_en},
                        subtitle :{"id": params.subtitle_id,"en":params.subtitle_en},
                        content_available : 1,
                        ios_badgeType : "Increase",
                        ios_sound : 'notification2.m4r',
                        android_sound :'notif_sound',
                        ios_badgeCount : 1,
                        data:payloadNya,
                        include_player_ids :[params.push_id[index]]
                    };
                    self.config(message)    
                })

        })
        
        
    },
    js_yyyy_mm_dd_hh_mm_ss : function  () {
        now = new Date();
        year = "" + now.getFullYear();
        month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },

    pushTime : function(){
        const params = {
            'contents_id' : "Apakah kamu melupakan sesuatu ?, Yuk kembali tracking aktivitas keluargamu dengan fitur Family Guard",
            'contents_en' : "Apakah kamu melupakan sesuatu ?, Yuk kembali tracking aktivitas keluargamu dengan fitur Family Guard",
            'heading_id'  : "BUDDYGUARD",
            'heading_en'  : "BUDDYGUARD"
        }
        var message = {
            app_id: "bf72dcd6-ed45-44e3-b4c3-c7f4fdf43d5f",
            contents: {"id": params.contents_id ,"en":params.contents_en},
            headings: {"id": params.heading_id,"en":params.heading_en},
            content_available : 1,
            ios_badgeType : "Increase",
            ios_sound : 'notification2.m4r',
            android_sound :'notif_sound',
            ios_badgeCount : 1,
            included_segments: ["Active Users", "Inactive Users"]    
        };
        self.config(message)    
    }
}
