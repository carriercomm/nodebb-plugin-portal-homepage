(function (module) {
	"use strict";
	var Plugin = {};

	function renderHomepage(req, res, next) {
		res.render('homepage-portal', {});
	}

	Plugin.init = function (params, callback) {
		var router = params.router,
			middleware = params.middleware,
			controllers = params.controllers;

			router.get('/', params.middleware.buildHeader, renderHomepage);
			router.get('/home', params.middleware.buildHeader, renderHomepage);
			router.get('/api/home', function (req, res, next) {
			res.json({});
		});

		router.get('/forum', params.middleware.buildHeader, params.controllers.home);
		router.get('/api/forum', params.controllers.home);

		callback();
	};

	Plugin.buildHeader = function (header, callback) {
		header.navigation.push({
			route: '/forum',
			class: '',
			text: 'Forum',
			iconClass: 'fa-comments',
			title: 'Forum',
			textClass: 'visible-xs-inline'
		});

		callback(false, header);
	};

	Plugin.getWidgetAreas = function (areas, callback) {
		areas = areas.concat([{
			'name': 'Portal HomeHeader',
			'template': 'homepage-portal.tpl',
			'location': 'ph-header'
		}, {
			'name': 'Portal HomeFooter',
			'template': 'homepage-portal.tpl',
			'location': 'ph-footer'
		}, {
			'name': 'Portal HomeSidebar',
			'template': 'homepage-portal.tpl',
			'location': 'sidebar'
		}, {
			'name': 'Portal HomeContent',
			'template': 'homepage-portal.tpl',
			'location': 'ph-content'
		}]);

		callback(null, areas);
	};

	Plugin.replaceRouter = function (config, callback) {
		config.custom_mapping['^/?$'] = 'homepage-portal';
		config.custom_mapping['^home?$'] = 'homepage-portal';
		config.custom_mapping['^forum?$'] = 'home';

		callback(null, config);
	};

	module.exports = Plugin;
}(module));
