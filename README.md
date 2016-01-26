# DFPLoader
A Angular Module, Which helps integrating DFP on your site using a config file.
Config Based DFP ad code loading, Just define the ad units id, target and size and you are good to go.

#Defination
The config takes 
* api : (URL) : Defination of Adunits
* singleRequest : (boolean) : DFP Single Request
* data : (array) : Array of Adunits
* no_fill: (function) : Function to be invoked when ad throws no_fill
* on_fill: (function) : Function to be invoked when ad is rendered

Adunit Array should have object with "id", "size", "target"
* id : (string) : The DFP Adunit id, from your Ad network panel.
* size : (array) : The sizes of Adunit in case of multi ad unit it will be array of array
* target : (string) : The dom element Id which needs to be targeted.


#Usage

In case of calling through API call
```DFP.init({api : "config.json"}); ```

In case of defining Inline
```DFP.init({data: [{"id" : "/1234/travel/asia/food","size" : [[728,90],[970,90]],"target" : "ad_unit_728x90"},{"id" : "/1234/travel/asia/food","size" : [[320,250]],"target" : "ad_unit_320x50"}]}); ```


