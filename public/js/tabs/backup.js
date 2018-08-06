$("#create-backup").click(function() {

    const now = new Date();
    const filename = `backup-${now.getTime()}.json`;

    firebase.database().ref().once('value').then(data => {
        const backupRef = firebase.storage().ref("backups").child(filename);
        const uploadTask = backupRef.putString(JSON.stringify(data.val()));
        
        uploadTask.on('state_changed', function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        });
        
        uploadTask.then(function(snapshot) {
            showSnackbar('La sauvegarde a été enregistrée.');
        }).catch(error => {
            console.log(error);
        }).catch(errorHandler);
    });
});

refreshBackup = () => {
    firebase.database().ref("/cms/backup").on('value', (snapshot) => {
    
        const backups = snapshot.val();
        const list = $("#backup-list");
        list.empty();
        
        for(const key of Object.keys(backups).reverse()) {
            const backup = backups[key];
            console.log(backup);
            
            var date = new Date(backup.timeCreated);
            
            var item = $('<div/>')
                .addClass('mdl-list__item')
                .appendTo(list);
            var primary = $('<span/>')
                .addClass('mdl-list__item-primary-content')
                .appendTo(item);
            var text = $('<span/>')
                .css('height', '64px')
                .css('margin', '10px')
                .html(date.toLocaleString())
                .appendTo(primary);
            var link = $('<i/>')
                .addClass('material-icons')
                .addClass('mdl-list__item-secondary-action')
                .html('open_in_new')
                .appendTo(item);
            link.click(function() {
                //var gcs = require('@google-cloud/storage')();
                
                var myFile = storage.file(backup.name);
                console.log(myFile);

                /* url: `${backup.mediaLink}&token=${backup.metadata.firebaseStorageDownloadTokens}`,
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: "https://firebasestorage.googleapis.com/v0/b/unjourunciel-dev.appspot.com/o/backups%2Fbackup-1520439636314.json?alt=media&token=fde177e5-25d6-4403-8e96-0009a0a51ffd",                    
                    success: function (data) {
                      console.log("Success: " + data);
                    },
                  });*/
            });
        }
    });

};