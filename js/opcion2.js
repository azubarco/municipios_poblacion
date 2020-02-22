// Otra forma de opción para las opciones de proyeccion del mapa 

        // var fill=['municipios_fill','municipios_fill2'];
        // var border=['municipios_border','municipios_border2']
        // var nombre_opcion=['0 a 15 años','15 a 64 años'];

        // for (var i=0;i<nombre_opcion.length;i++){
        //     var texto=nombre_opcion[i];

        //     var enlace=document.createElement('a');
        //     enlace.href='#';
        //     if (i==0){
        //         enlace.className='active';
        //     }
        //     enlace.textContent=texto;
        //     enlace.id = fill[i];
        //     enlace.info=border[i];
        //     console.info(enlace.info);

        //     enlace.onclick= function(e){
        //         var capafill_clicked=this.id;
        //         var capaborder_clicked=this.info;
        //         e.preventDefault();
        //         e.stopPropagation();

        //         var visualizar_fill = map.getLayoutProperty(capafill_clicked,'visibility');
        //         var visualizar_border=map.getLayoutProperty(capaborder_clicked,'visibility');

        //         if (visualizar_fill==='visible'){
        //             map.setLayoutProperty(capafill_clicked,'visibility','none');
        //             map.setLayoutProperty(capaborder_clicked,'visibility','none');
        //             this.className='';
        //         }else{
        //             this.className='active';
        //             map.setLayoutProperty(capafill_clicked,'visibility','visible');
        //             map.setLayoutProperty(capaborder_clicked,'visibility','visible');
        //             switch(capafill_clicked){
        //                 case 'municipios_fill': 
        //                     map.setLayoutProperty('municipios_fill2','visibility','none');
        //                     map.setLayoutProperty('municipios_border2','visibility','none');
        //                     break;
        //                 case 'municipios_fill2':
        //                     map.setLayoutProperty('municipios_fill','visibility','none');
        //                     map.setLayoutProperty('municipios_border','visibility','none');break;
        //             };
                    
        //         }
        //     };

        //     var capas=document.getElementById('menu');
        //     capas.appendChild(enlace);
        // };

        //Fin del codigo del menu de las opciones de proyeccion