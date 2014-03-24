assetsmanager-brunch
====================

Adds multiple assets folders / multiple destination support to brunch.

###Install the plugin :
```js
npm install --save assetsmanager-brunch
```

###Add assetsmanager to brunch config :
Add all assets files you want to copy. This example copy:

* `app/myFolder/include`and `app/css/img` to `myFolder` public directory
* `app/assets` to `myAssets` public directory


```js
plugins:
    assetsmanager:
        copyTo:
            'myFolder' : ['app/myFolder/include', 'app/css/img'],
            'myAssets': ['app/assets']
```
