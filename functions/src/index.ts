import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as themes from './html';

admin.initializeApp();
const db = admin.database();

const default_theme = themes.default_template;
const fullwidth_video_theme = themes.fullwidth_video_template;

export const index = functions.https.onRequest((request, response) => {

	/**
	 * Get content from database
	 */
	db.ref().once('value').then(function(snapshot) {

		const content = snapshot.val();
		const type = content.type;
		const posts = content.posts;
		
		const theme = type == 'fullwidth_video' ? fullwidth_video_theme : default_theme;
		
		let html = theme.html;
		const template = theme.root;

		/**
		 * Set content
		 */
		html = html.replace("{{video_url}}"		, content.video.url		 		|| '');
		html = html.replace("{{ga_id}}"			, content.analytics.ga_id 		|| '');
		html = html.replace("{{tagmanager_id}}"	, content.analytics.ga_id 		|| '');
		html = html.replace("{{og:title}}"		, content.title 				|| '');
		html = html.replace("{{og:url}}"		, content.url 					|| '');
		html = html.replace("{{og:description}}", content.description 			|| '');
		html = html.replace("{{header}}"		, content.title 				|| '');
		html = html.replace("{{title}}"			, content.title 				|| '');
		html = html.replace("{{description}}"	, content.description 			|| '');
		html = html.replace("{{credit}}"		, content.credit 				|| '');
		html = html.replace("{{instagram}}"		, content.socialmedia.instagram || '');
		html = html.replace("{{facebook}}"		, content.socialmedia.facebook 	|| '');
		
		let root = "";

		for(const key of Object.keys(posts).reverse()) {
			const post = posts[key];
		  
			// Will only happen for the first content
			html = html.replace("{{og:image}}", post.src);

			var current = template.replace('{{href}}', post.href)
								.replace('{{src}}', post.src)
								.replace('{{text}}', post.text)
								.replace('{{subtext}}', post.subtext);
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
	return ref.update(object);
});

export const storageOnDelete = functions.storage.object().onDelete((object, context) => {
	const path = object.contentType === 'application/octet-stream' ? "backup" : "media";
	const ref = db.ref(`cms/${path}/${object.generation}`);
	return ref.remove();
});