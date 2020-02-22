function init(){
    //Añadismos el token y estilo creado en Mapbox
    mapboxgl.accessToken="pk.eyJ1IjoiYXp1YmFyY28iLCJhIjoiY2s0OHRtbDNsMGI5YTNrcHJueWV3N20zdCJ9.qpTrQEyiBNskROz38Ggc3Q";
    
    var map=new mapboxgl.Map({
        container:"map",
        // style:"mapbox://styles/azubarco/ck6fsmxoy03d51ip6g6zekhj4",
        // style:"mapbox://styles/azubarco/ck6v2rrh406ja1is77cq59xt8",
        style:"mapbox://styles/azubarco/ck6v33ul506rh1ikc7sb7q3ou",
        center:[1.975658,41.592900],
        zoom:7,
        attributionControl:false
    });

    //Agregamos algunos controles al mapa
    map.addControl(new mapboxgl.AttributionControl({compact: true}));
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.GeolocateControl({positionOptions:{enableHighAccuracy: true},trackUserLocation: true }));

    var hoveredMunicipioId = null;
    var popup = new mapboxgl.Popup({
        closeButton: false
    });

    map.on('load',function(){

        map.addSource("municipios",{
            type:"geojson",
            data:'data/Municipios_pob.geojson'
        });

        //15 años
        map.addLayer({
            id:"municipios_fill",
            type:"fill",
            source:"municipios",
            layout:{
                'visibility':'visible'
            },
            'paint': {
                'fill-color':  [
                    "interpolate", ["linear"], ["number", ["get", "Valor_15"]],
                    0, "#FFFFFF",
                    5.66, "#ffcccc",
                    9.68, "#ff9e8f",
                    11.81, "#fa725a",
                    13.46, "#ed432d",
                    15.17, "#db0000"
                ],
                'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.8
                ]
            }
        });

        map.addLayer({
            id:"municipios_border",
            type:"line",
            source:"municipios",
            layout:{
                'visibility':'visible'
            },
            'paint': {
                'line-color':  [
                    "interpolate", ["linear"], ["number", ["get", "Valor_15"]],
                    0, "#FFFFFF",
                    5, "#ffcccc",
                    9, "#ff9e8f",
                    11, "#fa725a",
                    13, "#ed432d",
                    15, "#db0000"
                ],
                'line-width': 1
            }
        });

        //15-64años
        map.addLayer({
            id:"municipios_fill2",
            type:"fill",
            source:"municipios",
            layout:{
                'visibility':'none'
            },
            'paint': {
                'fill-color':  [
                    "interpolate", ["linear"], ["number", ["get", "Valor_16_6"]],
                    0, "#FFFFFF",
                    41.67, "#ccccff",
                    52.76, "#a796fa",
                    57.56, "#7e63f2",
                    60.71, "#5136eb",
                    63.41, "#0000e0"
                ],
                'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.8
                ]
            }
        });

        map.addLayer({
            id:"municipios_border2",
            type:"line",
            source:"municipios",
            layout:{
                'visibility':'none'
            },
            'paint': {
                'line-color':  [
                    "interpolate", ["linear"], ["number", ["get", "Valor_16_6"]],
                    0, "#FFFFFF",
                    41.67, "#ccccff",
                    52.76, "#a796fa",
                    57.56, "#7e63f2",
                    60.71, "#5136eb",
                    63.41, "#0000e0"
                ],
                'line-width': 1
            }
        });

        //Mayor a 64años
        map.addLayer({
            id:"municipios_fill3",
            type:"fill",
            source:"municipios",
            layout:{
                'visibility':'none'
            },
            'paint': {
                'fill-color':  [
                    "interpolate", ["linear"], ["number", ["get", "Valor_may_"]],
                    0, "#FFFFFF",
                    12.55, "#ffff80",
                    22.5, "#fad155",
                    25.88, "#f2a72e",
                    29.67, "#ad5313",
                    34.81, "#6b0000"
                ],
                'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.8
                ]
            }
        });

        map.addLayer({
            id:"municipios_border3",
            type:"line",
            source:"municipios",
            layout:{
                'visibility':'none'
            },
            'paint': {
                'line-color':  [
                    "interpolate", ["linear"], ["number", ["get", "Valor_may_"]],
                    0, "#FFFFFF",
                    12.55, "#ffff80",
                    22.5, "#fad155",
                    25.88, "#f2a72e",
                    29.67, "#ad5313",
                    34.81, "#6b0000"
                ],
                'line-width': 1
            }
        });

        //para visualizar la leyenda
        var leyenda15 = document.getElementById('leyenda0_15');
        var leyenda15_64 = document.getElementById('leyenda15_64');
        var leyenda64 = document.getElementById('leyenda64');

        //opciones del mapa a visualizar
        var options= document.getElementById('menu_options');
        var inputs= options.getElementsByTagName('input');

        //Con esta funcion alterno la vista del mapa y de la leyenda
        function Mostrarmapa(option){
            var proy=option.target.id;
            //console.info(proy);
            switch(proy){
                case 'val15': 
                    map.setLayoutProperty('municipios_fill','visibility','visible');
                    map.setLayoutProperty('municipios_border','visibility','visible');
                    map.setLayoutProperty('municipios_fill2','visibility','none');
                    map.setLayoutProperty('municipios_border2','visibility','none');
                    map.setLayoutProperty('municipios_fill3','visibility','none');
                    map.setLayoutProperty('municipios_border3','visibility','none');
                    leyenda64.style.display='none';
                    leyenda15_64.style.display='none';
                    leyenda15.style.display='block';
                    break;
                case 'val15_64':
                    map.setLayoutProperty('municipios_fill','visibility','none');
                    map.setLayoutProperty('municipios_border','visibility','none');
                    map.setLayoutProperty('municipios_fill2','visibility','visible');
                    map.setLayoutProperty('municipios_border2','visibility','visible');
                    map.setLayoutProperty('municipios_fill3','visibility','none');
                    map.setLayoutProperty('municipios_border3','visibility','none');
                    leyenda64.style.display='none';
                    leyenda15_64.style.display='block';
                    leyenda15.style.display='none';
                    break;
                case 'val_64':
                    map.setLayoutProperty('municipios_fill2','visibility','none');
                    map.setLayoutProperty('municipios_border2','visibility','none');
                    map.setLayoutProperty('municipios_fill','visibility','none');
                    map.setLayoutProperty('municipios_border','visibility','none');
                    map.setLayoutProperty('municipios_fill3','visibility','visible');
                    map.setLayoutProperty('municipios_border3','visibility','visible');
                    leyenda64.style.display='block';
                    leyenda15_64.style.display='none';
                    leyenda15.style.display='none';
                    break; 
            };
            
        }

        for (var i=0;i<inputs.length;i++){
            inputs[i].onclick=Mostrarmapa;
        }
        
        //Movimiento de popup de edades 15 años
        map.on('mousemove', 'municipios_fill', function(e) {
            map.getCanvas().style.cursor = 'pointer';
            if (e.features.length > 0) {
                console.info(hoveredMunicipioId);
                if (hoveredMunicipioId) {
                    map.setFeatureState({ 
                        source: 'municipios', id: hoveredMunicipioId },
                        { hover: false }
                    );
                    console.info('mierda');
                }
                hoveredMunicipioId = e.features[0].id;
                console.info(hoveredMunicipioId);
                map.setFeatureState(
                    { source: 'municipios', id: hoveredMunicipioId },
                    { hover: true }
                );
            }
            popup
                .setLngLat(e.lngLat)
                .setHTML("<b>"+e.features[0].properties.Nombre+":</b><br>"+e.features[0].properties.Valor_15+"%")
                //.setText(e.features[0].properties.Valor_15)
                .addTo(map);
        });

        map.on('mouseleave', 'municipios_fill', function() {
            map.getCanvas().style.cursor = '';
            if (hoveredMunicipioId) {
                map.setFeatureState(
                    { source: 'municipios', id: hoveredMunicipioId },
                    { hover: false }
                );
            }
            hoveredMunicipioId = null;
            popup.remove();
        });

        //Movimiento de popup edades 15 a 64 años
        map.on('mousemove', 'municipios_fill2', function(e) {
            map.getCanvas().style.cursor = 'pointer';
            if (e.features.length > 0) {
                if (hoveredMunicipioId) {
                    map.setFeatureState({ 
                        source: 'municipios', id: hoveredMunicipioId },
                        { hover: false }
                    );
                }
                hoveredMunicipioId = e.features[0].id;
                map.setFeatureState(
                    { source: 'municipios', id: hoveredMunicipioId },
                    { hover: true }
                );
            }
            popup
                .setLngLat(e.lngLat)
                .setHTML("<b>"+e.features[0].properties.Nombre+":</b><br>"+e.features[0].properties.Valor_16_6+"%")
                //.setText(e.features[0].properties.Valor_15)
                .addTo(map);
        });

        map.on('mouseleave', 'municipios_fill2', function() {
            map.getCanvas().style.cursor = '';
            if (hoveredMunicipioId) {
                map.setFeatureState(
                    { source: 'municipios', id: hoveredMunicipioId },
                    { hover: false }
                );
            }
            hoveredMunicipioId = null;
            popup.remove();
        });

        //Movimiento de popup de edades de 64 años a mas
        map.on('mousemove', 'municipios_fill3', function(e) {
            map.getCanvas().style.cursor = 'pointer';
            if (e.features.length > 0) {
                if (hoveredMunicipioId) {
                    map.setFeatureState({ 
                        source: 'municipios', id: hoveredMunicipioId },
                        { hover: false }
                    );
                }
                hoveredMunicipioId = e.features[0].id;
                map.setFeatureState(
                    { source: 'municipios', id: hoveredMunicipioId },
                    { hover: true }
                );
            }
            popup
                .setLngLat(e.lngLat)
                .setHTML("<b>"+e.features[0].properties.Nombre+":</b><br>"+e.features[0].properties.Valor_may_+"%")
                //.setText(e.features[0].properties.Valor_15)
                .addTo(map);
        });

        map.on('mouseleave', 'municipios_fill3', function() {
            map.getCanvas().style.cursor = '';
            if (hoveredMunicipioId) {
                map.setFeatureState(
                    { source: 'municipios', id: hoveredMunicipioId },
                    { hover: false }
                );
            }
            hoveredMunicipioId = null;
            popup.remove();
        });
    });
    
}