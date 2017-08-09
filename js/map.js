$(function(){
     var openMapLayer=new ol.layer.Tile({
      source:new ol.source.XYZ({
        url:'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
      })
    })
    

      new ol.Map({
        controls:ol.control.defaults({
          attributionOptions:({
            collapsible:false
          })
        }),
        logo:{src:'./img/bus.png',href: 'http://www.openstreetmap.org/'},
   
        layers:[
          openMapLayer
        ],

        view:new ol.View({
          center:[114, 22.50],
          projection:'EPSG:4326',
          zoom:10
        }),
        target: 'map'
      })
})