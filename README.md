assetsmanager-brunch
====================

Adds multiple assets folders support to brunch.

###Install the plugin :
```js
npm install --save assetsmanager-brunch
```

###Add assetsmanager to brunch config :
For exemple, if you want to copy everything from the folder ```commons/``` to the folder ```public/commons-assets```
```js
plugins: {
    assetsmanager: {
        files: ['commons/*'],
        dest: 'commons-assets'
    }
}
```
