$('#six *').click(function() {
    $.sendConfirm({
      title: 'Please rate this dish',
      content: '<div id="addIpBox">' + '<div class="frm-item">' + '<div class="frm-label"><span class="requireIcon">*</span> Rate meal Lv(1-5):</div>' + '<input type="text" class="frm-input" name="ip" placeholder="input number 1-5">' + '<div class="msg-box j_msgIp hide"></div>' + '</div>' + '<div class="frm-item">' + '<div class="frm-label"><span class="requireIcon">*</span> Suggestion:</div>' + '<input type="text" class="frm-input" name="desc" placeholder="Max 25 words">' + '<div class="msg-box j_msgDesc hide"></div>' + '</div>' + '<div class="frm-item">' + '<div class="frm-label"><span class="requireIcon">*</span> Rate Service:</div>' + '<input type="text" class="frm-input" name="operator" placeholder="Max 30 words">' + '<div class="msg-box j_msgOperator hide"></div>' + '</div>' + '</div>',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel'
      },
      width: 260,
      onBeforeConfirm: function() {
        // onBeforeConfirm returns false, which will prevent the execution of onConfirm
        $.sendMsg('Successful, thank you for your suggestion', 3000, function() {
      console.log('sendMsg closed');
   
  });
        return false;
      },
      onConfirm: function() {
          $.sendMsg('Successful, thank you for your suggestion', 3000, function() {
      console.log('sendMsg closed');
   
  });
      },
      onCancel: function() {
          $.sendMsg('Sorry dear, this review was unsuccessful.', 3000, function() {
      console.log('sendMsg closed');
   
  });
      },
      onClose: function() {
          $.sendMsg('Sorry dear, this review was unsuccessful.', 3000, function() {
      console.log('sendMsg closed');
   
  });
      }
    });
  });
  $('#order1').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
      // type01
  
      console.log('sendMsg closed');
      var span = $('#first').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                  
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order2').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
    console.log('sendMsg closed');
    console.log('sendMsg closed');
      var span = $('#second').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                  
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
   
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order3').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#third').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                  
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
   
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order4').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#fourth').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,di sh TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                  
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
   
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order5').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#fifth').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                  
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
   
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order6').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
      // 第一种
  
      console.log('sendMsg closed');
      var span = $('#sixth').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                  
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order7').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
    console.log('sendMsg closed');
    console.log('sendMsg closed');
      var span = $('#seventh').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                 
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
   
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order8').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#eighth').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                 
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
   
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order9').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#ninth').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                  
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
   
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
  });
  $('#order10').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: 'Order transaction confirmation',
      msg: 'Are you sure you want to order this dish?',
      button: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('Order successful, add to carts', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#tenth').html(); 
      
      var picName=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishName=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishDisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishPrice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishNum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', 'Vincent', 30*1024*1024);
      var msg;
      addData(picName, dishName, dishDisc,dishPrice,dishNum);
      function addData(picName, dishName, dishDisc,dishPrice,dishNum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picName TEXT,dishName TEXT,dishDisc TEXT,dishPrice TEXT,dishNum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picName, dishName, dishDisc,dishPrice,dishNum], function(tx, rs) {
                  
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              }
      )
      })
  }
   
  });
      },
      onCancel: function() {
          
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
      },
      onClose: function() {
        
    $.sendMsg('Order Fail', 3000, function() {
      console.log('sendMsg closed');
  
  });
        console.log('Press to Close！');
      }
    });
});