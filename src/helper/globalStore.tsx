export default class GlobalStore {
	static ENV = __DEV__ ? 'dev' : 'prod';
	static accessToken = null;
	static tempAccessToken = null;
	static lang = 'vi';
	static session = new Date().getTime().toString();
	static logout = () => {};
	static baseURL = '103.142.139.7';
	static port = '7070';
	static devMode = true;
	static dev = __DEV__;
	static notificationToken = '';
	static token: any = '';
	static notiRef: any = null;
	//
}
