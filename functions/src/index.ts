import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as page from './html';

admin.initializeApp(functions.config().firebase);
const db = admin.database();

let html = page.index;
	
export const index = functions.https.onRequest((request, response) => {

	/**
	 * Get content from database
	 */
	db.ref().once('value').then(function(snapshot) {

		const content = snapshot.val();
		const images = content.images;

		/**
		 * Set content
		 */
		html = html.replace("{{ga_id}}", content.ga_id);
		html = html.replace("{{tagmanager_id}}", content.ga_id);
		html = html.replace("{{header}}", content.title);
		html = html.replace("{{title}}", content.title);
		html = html.replace("{{description}}", content.description);
		html = html.replace("{{credit}}", content.credit);

		html = html.replace("{{instagram}}", content.socialmedia.instagram);
		html = html.replace("{{facebook}}", content.socialmedia.facebook);
		
		const template = '<a class="img-w" href={{href}}> <img src="{{src}}" alt="" /> </a>';
		let root = "";

		for(var i = 0 ; i < images.length ; i++) {
			var post = images[i];
			var current = template.replace('{{href}}', post.href)
								.replace('{{src}}', post.src)
								.replace('{{date}}', post.date);
			root = current + root;
		}
		
		response.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
		response.send(html.replace("{{root}}", root));
	}).catch(error => {
		console.log("error : " + error);
	});
    
});