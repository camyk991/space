import PlanetListItem from "../planetListItem";
import SinglePlanet from "../singlePlanet";
import React, {useState, useEffect} from 'react';
import {logout} from '../../firebase'
import './style.css';

const PlanetList = ({planets, chosen, setChosen}) => {

    const [menu, showMenu] = useState(false);
    const [searchBar, setSearchBar] = useState('');
    const [filtered, setFilters] = useState();
    // const [chosenPlanet, setChosenPlanet] = useState('');
    const [filteredSingle, setFilteredSingle] = useState();

    const smallPlanetImages = {
        "ceres": "https://www.pngkey.com/png/full/425-4254471_ceres-is-the-only-dwarf-planet-in-the.png" ,
        "eris": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Eris-transparent.png/1200px-Eris-transparent.png",
        "haumea": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Haumea_Rotation.gif",
        "makemake": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Makemake-transparent-red.png"
    }

    useEffect(() => {
        if (!searchBar)
            return;

        const result = planets.filter(el => {
            return el.englishName.toLowerCase().includes(searchBar.toLowerCase())
        })
    
        setFilters(result);
    }, [searchBar])

    useEffect(() => {
        // console.log(getChosenPlanet(chosenPlanet))
        setFilteredSingle(getChosenPlanet(chosen));
    }, [chosen])

    const renderPlanets = (data) => {
        try {
            let list = data.map(el => (
                 <PlanetListItem 
                    key={el.id} 
                    id={el.id}
                    name={el.englishName} 
                    setChosen={setChosen}              
                />
            ))

            return list
        } catch {
            console.log("loading..");
            // TODO: LOADER
        }
    }

    const getChosenPlanet = (body) => {
        if (!planets)
            return;

        return planets.filter((el) => el.id === body)[0]
    }

    async function handleLogout(){
  
        try{
            setChosen(null)
            await logout();
        }catch{
          alert("error!");
        }
    
      }

    return (
        <>
            <button className="logout" onClick={handleLogout}>Log out</button>
            {filteredSingle ? <SinglePlanet planet={filteredSingle} img={smallPlanetImages}/> : null}
            
            <div
            className={`search-menu ${menu ? `show` : ``}`}
            onMouseOver={() => showMenu(true)} 
            onMouseLeave={() => showMenu(false)}
            >
                <div className="searchbar-wrapper" onMouseEnter={() => showMenu(true)}
                    onMouseLeave={() => showMenu(false)}>
                    <span className="search-icon"></span>
                    <input type="text" onChange={(e) => setSearchBar(e.target.value)}/>
                </div>
                <div className="planet-list-wrapper">
                    {renderPlanets(searchBar ? filtered : planets)}
                </div>
            </div>    
        </>   
    )
}

export default PlanetList;