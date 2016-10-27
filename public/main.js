(function () {
	'use strict';

	const Router = window.Router;
	const ChatView = window.ChatView;
	const MainView = window.MainView;
	const LoginView = window.LoginView;
	const RegistrationView = window.RegistrationView;


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
	//  .addRoute('/chat', ChatView)
	//	.addRoute('/session', LoginView)
		.addRoute('/user', RegistrationView)
		.addRoute('/', LoginView) //Welcome Page
		.start();
})();