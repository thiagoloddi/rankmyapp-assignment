import app from './server';
import mongodb from "./api/db";

const port = process.env.PORT || 8080;

mongodb(app)
	.then(() => {
		app.listen(port, err => {
			if(err) {
				console.log(err);
			} else {
				console.log(`Server online - Listening to port ${port}`);
			}
		});
})
	.catch(e => {
		console.log('MONGODB:', 'Failed to connect.');
		console.log(e);
});