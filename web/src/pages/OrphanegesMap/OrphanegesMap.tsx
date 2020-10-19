import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


import mapMarkerImg from '../../images/map-marker.svg';

import './styles.css'
import mapIcon from '../../utils/mapicon';
import api from '../../services/api';

interface Orphanege{
    id: number;
    latitude: number;
    longitude: number;
    name: string 
}

function OrphanegesMap(){
    const [orphaneges, setOrphaneges] = useState<Orphanege[]>([]);
    
    useEffect(()=>{
        api.get('orphaneges').then(response => {
            setOrphaneges(response.data);
        })
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha seu orfanto no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita {':)'}</p>
                </header>

                <footer>
                    <strong>Pau dos Ferros</strong>
                    <span>Rio Grande do Norte</span>
                </footer>
            </aside>

            <Map 
                center = {[-6.1154478,-38.2164202]}
                zoom={14.24}
                style={{width: "100%", height:"100%"}}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                
                {orphaneges.map( orphanege => {
                    return(
                    <Marker
                    key={orphanege.id}
                    icon = {mapIcon}
                    position = {[orphanege.latitude, orphanege.longitude]}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanege.name} 
                            <Link to={`/orphanages/${orphanege.id}`}>
                                <FiArrowRight size = {20} color = "#fff"/>
                            </Link>
                        </Popup>
                    </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanege">
                <FiPlus size={32} color="#FFF"/>    
            </Link> 
        </div>
    );
};

export default OrphanegesMap;