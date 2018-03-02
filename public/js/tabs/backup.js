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