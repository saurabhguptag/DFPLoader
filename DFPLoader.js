var googletag 	= googletag || {};
googletag.cmd	= googletag.cmd || [];
var _dfp = null;
angular.module('DFPLoader',[])
.run(['$rootScope',function($rootScope) {
	
}])
.service('DFP',  ['$rootScope','$http',function($rootScope,$http) {
	_dfp = this;
	_dfp.slots = {};
	_dfp.config = {
		api : "",
		singleRequest : true,
		data : [],
		no_fill : function(){},
		on_fill : function(){}
	};
	_dfp.init = function(settings){
		_dfp.init_dfp_script();
		_dfp.load_dfp_settings();
		if(angular.isDefined(settings))
			_dfp.set_config(settings);
	};	
	_dfp.set_defination = function(ads_defination){
		angular.extend(_dfp.config.data,ads_defination);
		$rootScope.$broadcast("dfploader-ads-defined",_dfp.config);
		_dfp.process_defination();
	};	
	_dfp.set_config = function(settings){
		if(angular.isDefined(settings.api) && settings.api != ""){
			$http({url: settings.api}).then(function(response){
				_dfp.set_defination(response.data);
			});
		}
		if(angular.isDefined(settings.data)){
			_dfp.set_defination(settings.data);
		}
	};	
	_dfp.process_defination = function(){
		angular.forEach(_dfp.config.data,function(ad_unit){
			_dfp.define_ad_unit(ad_unit.id,ad_unit.size,ad_unit.target);
		});
	};	
	_dfp.init_dfp_script = function(){
		var gads = document.createElement('script');
		gads.async = true;
		gads.type = 'text/javascript';
		var useSSL = 'https:' == document.location.protocol;
		gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(gads, node);
	};	
	_dfp.load_dfp_settings = function(){
		googletag.cmd.push(function() {
			var page_url = (window.top.location)? window.top.location : "";
			googletag.pubads().set("page_url", page_url);
			if(_dfp.config.singleRequest){
				googletag.pubads().enableSingleRequest();
			}else{
				googletag.pubads().enableAsyncRendering();			
			}
			googletag.enableServices();
			googletag.pubads().collapseEmptyDivs(); 
			googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                var target = event.slot.getSlotElementId();
                var target_dom = document.getElementById(target);
                if( target_dom != null){
                    if(event.isEmpty){
                        if(target_dom.className.indexOf("dfp-unit-nofill") < 0)
							target_dom.className += " dfp-unit-nofill";
						if(typeof(_dfp.config.no_fill) == "function")
							_dfp.config.no_fill();
                    }else{
						if(target_dom.className.indexOf("dfp-unit-rendered") < 0)
							target_dom.className += " dfp-unit-rendered";
						if(typeof(_dfp.config.on_fill) == "function")
							_dfp.config.on_fill();
                    }
				}
			});
		});
	};	
	_dfp.define_ad_unit = function(id,size,target){
		googletag.cmd.push(function() {
			_dfp.slots[target] = googletag.defineSlot(id, size, target).addService(googletag.pubads());
			googletag.display(target);
		});
	};	
	_dfp.refresh = function(target){
		googletag.pubads().refresh([_dfp.slots[target]]);
	};		
}]);
