import "./style.css";
import {useEffect} from 'react';


const SinglePlanet = ({planet}) => {
        return (
            <div className="singlePlanetContainer">
                <h3 className="planet-heading">{planet.englishName}</h3> 
                <div className="data-wrapper">
                    <span className="row"><span className="p">Alternative name:</span> {planet.alternativeName ? planet.alternativeName : '-'} </span>
                    <span className="row"><span className="p">Discovered by:</span> {planet.discoveredBy ? planet.discoveredBy : '-'}</span>
                    <span className="row"><span className="p">Discovery date:</span> {planet.discoveryDate ? planet.discoveryDate : '-'}</span>
                    <span className="row"><span className="p">Mass:</span> {planet.mass.massValue ? planet.mass.massValue : '-'}<sup>{planet.mass.massExponent}</sup> kg</span>
                    <span className="row"><span className="p">Density:</span> {planet.density ? planet.density : '-'} g/cm<sup>3</sup></span>
                    <span className="row"><span className="p">Equatorial radius:</span> {planet.equaRadius ? planet.equaRadius : '-'} km</span>
                    <span className="row"><span className="p">Flattening: </span>{planet.flattening ? planet.flattening: '-'} </span>
                    <span className="row"><span className="p">Sidereal rotation:</span> {planet.sideralRotation ? planet.sideralRotation : '-'} h</span>
                    <span className="row"><span className="p">Axial tilt:</span> {planet.axialTilt ? planet.axialTilt : '-'} </span>
                    <span className="row"><span className="p">Moons: </span>{planet.moons ? planet.moons.length : "-"} </span>
                </div> 
            </div>
        )
   
}

export default SinglePlanet