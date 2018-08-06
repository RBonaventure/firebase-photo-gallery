import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as page from './html';

admin.initializeApp(functions.config().firebase);
const db = admin.database();
const storage = admin.storage();

let html = page.index;

export const index = functions.https.onRequest((request, response) => {

	/**
	 * Get content from database
	 */
	db.ref().once('value').then(function(snapshot) {

		const content = snapshot.val();
		const posts = content.posts;

		/**
		 * Set content
		 */
		html = html.replace("{{ga_id}}"			, content.ga_id 				|| '');
		html = html.replace("{{tagmanager_id}}"	, content.ga_id 				|| '');
		html = html.replace("{{og:title}}"		, content.title 				|| '');
		html = html.replace("{{og:url}}"		, content.url 					|| '');
		html = html.replace("{{og:description}}", content.description 			|| '');
		html = html.replace("{{header}}"		, content.title 				|| '');
		html = html.replace("{{title}}"			, content.title 				|| '');
		html = html.replace("{{description}}"	, content.description 			|| '');
		html = html.replace("{{credit}}"		, content.credit 				|| '');
		html = html.replace("{{instagram}}"		, content.socialmedia.instagram || '');
		html = html.replace("{{facebook}}"		, content.socialmedia.facebook 	|| '');
		
		const template = '<a class="img-w" href={{href}}> <img src="{{src}}" alt="" /> </a>';
		let root = "";

		for(const key of Object.keys(posts).reverse()) {
			const post = posts[key];
		  
			// Will only happen for the first content
			html = html.replace("{{og:image}}", post.src);

			var current = template.replace('{{href}}', post.href)
								.replace('{{src}}', post.src)
								.replace('{{text}}', post.text);
			root += current;
		}
		
		response.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
		response.send(html.replace("{{root}}", root));
	}).catch(error => {
		console.log("error : " + error);
	});
    
});

export const storageOnFinalize = functions.storage.object().onFinalize((object, context) => {
	const path = object.contentType === 'application/octet-stream' ? "backup" : "media";
	const ref = db.ref(`cms/${path}/${object.generation}`);
	ref.update(object).then(function(snapshot) {});
});

export const storageOnDelete = functions.storage.object().onDelete((object, context) => {
	const path = object.contentType === 'application/octet-stream' ? "backup" : "media";
	const ref = db.ref(`cms/${path}/${object.generation}`);
	ref.remove().then(function(snapshot) {});
});