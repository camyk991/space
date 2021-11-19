import "./style.css";
import {useEffect} from 'react';


const SinglePlanet = ({planet}) => {

    
        return (
            <div className="singlePlanetContainer">
                <h3 className="planet-heading">{planet.englishName}</h3> 
                <div className="data-wrapper">
                    <span className="row">Alternative name: {planet.alternativeName ? planet.alternativeName : '-'} </span>
                    <span className="row">Discovered by: {planet.discoveredBy}</span>
                    <span className="row">Discovery date: {planet.discoveryDate}</span>
                    <span className="row">Mass: {planet.mass.massValue}<sup>{planet.mass.massExponent}</sup> kg</span>
                    <span className="row">Density: {planet.density} g/cm<sup>3</sup></span>
                    <span className="row">Equatorial radius: {planet.equaRadius} km</span>
                    <span className="row">Flattening: {planet.flattening} </span>
                    <span className="row">Sidereal rotation: {planet.sideralRotation} h</span>
                    <span className="row">Axial tilt: {planet.axialTilt} </span>
                    <span className="row">Moons: {planet.moons ? planet.moons.length : "-"} </span>
                </div>
            </div>
            
            

        )
   
}

export default SinglePlanet